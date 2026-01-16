import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  translate: (text: string) => Promise<string>;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// Cache translations to avoid repeated API calls
const translationCache: Record<string, Record<string, string>> = {};

// Supported languages by Lingva Translate
const SUPPORTED_LANGUAGES = [
  'en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'nl', 'pl', 'sv', 'da', 'no', 'fi'
];

// Get browser language
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Return language code if supported, otherwise default to English
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : 'en';
};

interface TranslationProviderProps {
  children: ReactNode;
  sourceLanguage?: string;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  sourceLanguage = 'tr' // Default source language is Turkish
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('tr');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const detectedLang = getBrowserLanguage();
    setCurrentLanguage(detectedLang);
    
    // Initialize cache for the language
    if (!translationCache[detectedLang]) {
      translationCache[detectedLang] = {};
    }
  }, []);

  const translate = useCallback(async (text: string): Promise<string> => {
    // If target language is same as source, return original text
    if (currentLanguage === sourceLanguage) {
      return text;
    }

    // Check cache first
    if (translationCache[currentLanguage]?.[text]) {
      return translationCache[currentLanguage][text];
    }

    try {
      // Use Lingva Translate API (free, no API key required)
      const response = await fetch(
        `https://lingva.ml/api/v1/${sourceLanguage}/${currentLanguage}/${encodeURIComponent(text)}`
      );

      if (!response.ok) {
        // Fallback to alternative Lingva instance
        const fallbackResponse = await fetch(
          `https://lingva.pussthecat.org/api/v1/${sourceLanguage}/${currentLanguage}/${encodeURIComponent(text)}`
        );
        
        if (!fallbackResponse.ok) {
          console.warn('Translation failed, using original text');
          return text;
        }
        
        const fallbackData = await fallbackResponse.json();
        const translatedText = fallbackData.translation || text;
        
        // Cache the translation
        if (!translationCache[currentLanguage]) {
          translationCache[currentLanguage] = {};
        }
        translationCache[currentLanguage][text] = translatedText;
        
        return translatedText;
      }

      const data = await response.json();
      const translatedText = data.translation || text;

      // Cache the translation
      if (!translationCache[currentLanguage]) {
        translationCache[currentLanguage] = {};
      }
      translationCache[currentLanguage][text] = translatedText;

      return translatedText;
    } catch (error) {
      console.warn('Translation error:', error);
      return text; // Return original text on error
    }
  }, [currentLanguage, sourceLanguage]);

  return (
    <TranslationContext.Provider value={{ currentLanguage, translate, isLoading }}>
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

// T Component - Translatable Text Component
interface TProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any;
}

export const T: React.FC<TProps> = ({ children, as: Component = 'span', className, ...props }) => {
  const { translate, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>(children);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const performTranslation = async () => {
      // If Turkish (source language), show original
      if (currentLanguage === 'tr') {
        setTranslatedText(children);
        return;
      }

      setIsTranslating(true);
      try {
        const result = await translate(children);
        if (isMounted) {
          setTranslatedText(result);
        }
      } catch (error) {
        if (isMounted) {
          setTranslatedText(children);
        }
      } finally {
        if (isMounted) {
          setIsTranslating(false);
        }
      }
    };

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

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

