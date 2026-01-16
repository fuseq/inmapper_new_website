import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  sourceLanguage: string;
  translate: (text: string) => Promise<string>;
  translateBatch: (texts: string[]) => Promise<string[]>;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// Cache translations in memory and localStorage
const CACHE_KEY = 'inmapper_translations';

const getCache = (): Record<string, Record<string, string>> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveCache = (cache: Record<string, Record<string, string>>) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Storage full or unavailable
  }
};

let translationCache = getCache();

// DeepL supported languages
const DEEPL_LANGUAGES: Record<string, string> = {
  'en': 'EN',
  'de': 'DE',
  'fr': 'FR',
  'es': 'ES',
  'it': 'IT',
  'pt': 'PT',
  'ru': 'RU',
  'zh': 'ZH',
  'ja': 'JA',
  'ko': 'KO',
  'nl': 'NL',
  'pl': 'PL',
  'tr': 'TR',
  'ar': 'AR',
  'bg': 'BG',
  'cs': 'CS',
  'da': 'DA',
  'el': 'EL',
  'et': 'ET',
  'fi': 'FI',
  'hu': 'HU',
  'id': 'ID',
  'lv': 'LV',
  'lt': 'LT',
  'nb': 'NB',
  'ro': 'RO',
  'sk': 'SK',
  'sl': 'SL',
  'sv': 'SV',
  'uk': 'UK',
};

// Get browser language
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  return DEEPL_LANGUAGES[langCode] ? langCode : 'en';
};

interface TranslationProviderProps {
  children: ReactNode;
  sourceLanguage?: string;
}

// Batch translation queue
interface QueueItem {
  text: string;
  resolve: (value: string) => void;
  reject: (error: Error) => void;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  sourceLanguage = 'tr'
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(sourceLanguage);
  const queueRef = useRef<QueueItem[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const processingRef = useRef<boolean>(false);

  useEffect(() => {
    const detectedLang = getBrowserLanguage();
    setCurrentLanguage(detectedLang);
  }, []);

  // Process batch queue
  const processQueue = useCallback(async () => {
    if (processingRef.current || queueRef.current.length === 0) return;
    
    processingRef.current = true;
    const batch = queueRef.current.splice(0, 50); // Process up to 50 at a time
    
    const textsToTranslate: string[] = [];
    const indexMap: number[] = [];
    
    // Check cache first
    batch.forEach((item, index) => {
      const cached = translationCache[currentLanguage]?.[item.text];
      if (cached) {
        item.resolve(cached);
      } else {
        textsToTranslate.push(item.text);
        indexMap.push(index);
      }
    });

    if (textsToTranslate.length > 0) {
      try {
        const response = await fetch('/.netlify/functions/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            texts: textsToTranslate,
            targetLang: currentLanguage,
            sourceLang: sourceLanguage,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Cache and resolve
          if (!translationCache[currentLanguage]) {
            translationCache[currentLanguage] = {};
          }
          
          data.translations.forEach((translatedText: string, i: number) => {
            const originalIndex = indexMap[i];
            const originalText = textsToTranslate[i];
            
            translationCache[currentLanguage][originalText] = translatedText;
            batch[originalIndex].resolve(translatedText);
          });
          
          saveCache(translationCache);
        } else {
          // On error, resolve with original text
          indexMap.forEach((originalIndex, i) => {
            batch[originalIndex].resolve(textsToTranslate[i]);
          });
        }
      } catch (error) {
        // On error, resolve with original text
        indexMap.forEach((originalIndex, i) => {
          batch[originalIndex].resolve(textsToTranslate[i]);
        });
      }
    }

    processingRef.current = false;
    
    // Process remaining items
    if (queueRef.current.length > 0) {
      processQueue();
    }
  }, [currentLanguage, sourceLanguage]);

  const translate = useCallback(async (text: string): Promise<string> => {
    // If same language, return original
    if (currentLanguage === sourceLanguage) {
      return text;
    }

    // Check cache
    if (translationCache[currentLanguage]?.[text]) {
      return translationCache[currentLanguage][text];
    }

    // Add to queue
    return new Promise((resolve, reject) => {
      queueRef.current.push({ text, resolve, reject });
      
      // Debounce batch processing
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        processQueue();
      }, 100); // Wait 100ms to collect more items
    });
  }, [currentLanguage, sourceLanguage, processQueue]);

  const translateBatch = useCallback(async (texts: string[]): Promise<string[]> => {
    if (currentLanguage === sourceLanguage) {
      return texts;
    }

    const promises = texts.map(text => translate(text));
    return Promise.all(promises);
  }, [currentLanguage, sourceLanguage, translate]);

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      sourceLanguage,
      translate, 
      translateBatch 
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// T Component - Translatable Text
interface TProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any;
}

export const T: React.FC<TProps> = ({ children, as: Component = 'span', className, ...props }) => {
  const { translate, currentLanguage, sourceLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>(children);

  useEffect(() => {
    let isMounted = true;

    const performTranslation = async () => {
      if (currentLanguage === sourceLanguage) {
        setTranslatedText(children);
        return;
      }

      try {
        const result = await translate(children);
        if (isMounted) {
          setTranslatedText(result);
        }
      } catch {
        if (isMounted) {
          setTranslatedText(children);
        }
      }
    };

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, sourceLanguage, translate]);

  if (Component === 'span' && !className && Object.keys(props).length === 0) {
    return <>{translatedText}</>;
  }

  return (
    <Component className={className} {...props}>
      {translatedText}
    </Component>
  );
};

export default TranslationContext;

