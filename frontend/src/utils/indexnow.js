/**
 * IndexNow API Integration
 * Automatically notify search engines about content changes
 * https://www.indexnow.org/
 */

const INDEXNOW_API_KEY = 'your-indexnow-api-key-here'; // Generate at indexnow.org
const SITE_URL = 'https://your-domain.com';

const SEARCH_ENGINES = {
  bing: 'https://www.bing.com/indexnow',
  yandex: 'https://yandex.com/indexnow',
  // Google doesn't support IndexNow yet but uses this data through Bing
};

/**
 * Notify search engines about URL changes
 * @param {string|string[]} urls - Single URL or array of URLs to submit
 * @param {string} action - 'update' or 'delete' (optional, defaults to update)
 */
export const notifySearchEngines = async (urls, action = 'update') => {
  if (!INDEXNOW_API_KEY || INDEXNOW_API_KEY === 'your-indexnow-api-key-here') {
    console.warn('IndexNow API key not configured');
    return;
  }

  const urlList = Array.isArray(urls) ? urls : [urls];
  
  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_API_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_API_KEY}.txt`,
    urlList: urlList
  };

  try {
    // Submit to Bing (also covers Google through partnership)
    const response = await fetch(SEARCH_ENGINES.bing, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ IndexNow submission successful');
      return true;
    } else {
      console.error('❌ IndexNow submission failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow error:', error);
    return false;
  }
};

/**
 * Submit single page update
 */
export const submitPageUpdate = (url) => {
  return notifySearchEngines(url, 'update');
};

/**
 * Submit multiple pages at once
 */
export const submitBulkUpdate = (urls) => {
  return notifySearchEngines(urls, 'update');
};

/**
 * Setup Instructions:
 * 
 * 1. Get API Key:
 *    - Visit https://www.indexnow.org/
 *    - Generate a unique API key
 *    - Update INDEXNOW_API_KEY above
 * 
 * 2. Create Key File:
 *    - Create a text file named: {your-api-key}.txt
 *    - Place it in /public/ folder
 *    - File should contain only the API key
 * 
 * 3. Update Domain:
 *    - Replace SITE_URL with your actual domain
 * 
 * 4. Usage:
 *    import { submitPageUpdate } from './utils/indexnow';
 *    submitPageUpdate('https://your-domain.com/');
 * 
 * Note: For static sites, you typically only need to submit once
 * when the site is initially published or significantly updated.
 */

export default {
  notifySearchEngines,
  submitPageUpdate,
  submitBulkUpdate
};
