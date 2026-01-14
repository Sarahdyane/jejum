/**
 * Helper para gerenciar UTM parameters com UTMify
 */

// URL base do checkout
export const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v4/sAxm8xS5o2d9po6HDheO";

// Função HARDCODED para ir ao checkout com UTMs da URL atual
// Sempre pega window.location.search e concatena no link do checkout
export const goToCheckout = (): void => {
  const checkoutUrl = CHECKOUT_URL;
  const currentParams = window.location.search;
  
  // Remove o "?" inicial se existir
  const paramsString = currentParams.startsWith('?') ? currentParams.substring(1) : currentParams;
  
  // Se não houver parâmetros, vai direto pro checkout
  if (!paramsString) {
    window.location.href = checkoutUrl;
    return;
  }
  
  // Concatena os parâmetros: se checkout já tem ?, usa &, senão usa ?
  const finalLink = checkoutUrl + (checkoutUrl.includes('?') ? '&' : '?') + paramsString;
  
  window.location.href = finalLink;
};

// Função de inicialização (mantida para compatibilidade)
export const initUtmCapture = (): void => {
  // Não precisa fazer nada - a lógica agora é hardcoded no goToCheckout
  // que sempre pega window.location.search no momento do clique
};
