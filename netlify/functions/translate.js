// Netlify Function - DeepL Translation Proxy
export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get DeepL API key from environment
  const apiKey = process.env.DEEPL_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'DeepL API key not configured' }),
    };
  }

  try {
    const { texts, targetLang, sourceLang } = JSON.parse(event.body);

    if (!texts || !targetLang) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      };
    }

    // DeepL API endpoint (free tier uses api-free.deepl.com)
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: Array.isArray(texts) ? texts : [texts],
        target_lang: targetLang.toUpperCase(),
        source_lang: sourceLang ? sourceLang.toUpperCase() : undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepL API error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Translation failed', details: errorText }),
      };
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        translations: data.translations.map(t => t.text),
      }),
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

