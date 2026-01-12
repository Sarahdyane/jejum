/**
 * Helper para gerenciar UTM parameters com UTMify
 */

// Função para obter os UTM parameters da URL atual ou do localStorage (onde UTMify armazena)
export const getUtmParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  
  // Primeiro, tenta pegar da URL atual
  const urlParams = new URLSearchParams(window.location.search);
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'fbclid', 'gclid', 'ttclid'];
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  
  // Se não encontrou na URL, tenta pegar do localStorage (onde UTMify pode armazenar)
  if (Object.keys(params).length === 0) {
    try {
      const storedUtms = localStorage.getItem('__utmify_session_utms__');
      if (storedUtms) {
        const parsed = JSON.parse(storedUtms);
        Object.assign(params, parsed);
      }
    } catch (e) {
      // Ignora erros de parsing
    }
    
    // Também tenta o formato alternativo do UTMify
    try {
      const storedData = localStorage.getItem('__utmify__');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (parsed.utms) {
          Object.assign(params, parsed.utms);
        }
      }
    } catch (e) {
      // Ignora erros de parsing
    }
  }
  
  return params;
};

// Função para adicionar UTMs a uma URL
export const appendUtmToUrl = (baseUrl: string): string => {
  const utmParams = getUtmParams();
  
  if (Object.keys(utmParams).length === 0) {
    return baseUrl;
  }
  
  const url = new URL(baseUrl);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
};

// Função para navegar para uma URL com UTMs
export const navigateWithUtm = (baseUrl: string): void => {
  const finalUrl = appendUtmToUrl(baseUrl);
  window.location.href = finalUrl;
};

// URL base do checkout
export const CHECKOUT_URL = 'https://www.ggcheckout.com/checkout/v2/sAxm8xS5o2d9po6HDheO';

// Função específica para ir ao checkout com UTMs
export const goToCheckout = (): void => {
  navigateWithUtm(CHECKOUT_URL);
};
