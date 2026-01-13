/**
 * Helper para gerenciar UTM parameters com UTMify
 */

const APP_UTM_STORAGE_KEY = "__nutria_utms__";

const EXTRA_TRACKING_KEYS = [
  "fbclid",
  "gclid",
  "ttclid",
  // Chaves comuns em setups BR / UTMify
  "xcod",
  "sck",
  "src",
  "subid",
  "subid1",
  "subid2",
  "subid3",
  "subid4",
  "subid5",
];

const isTrackingKey = (key: string): boolean =>
  key.startsWith("utm_") || EXTRA_TRACKING_KEYS.includes(key);

const safeJsonParse = (value: string | null): unknown => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const pickTrackingParams = (input: unknown): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!input || typeof input !== "object") return out;

  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!isTrackingKey(k)) continue;
    if (v === null || v === undefined) continue;
    out[k] = String(v);
  }

  return out;
};

const getFromSearchParams = (): Record<string, string> => {
  const out: Record<string, string> = {};
  const urlParams = new URLSearchParams(window.location.search);

  for (const [k, v] of urlParams.entries()) {
    if (!isTrackingKey(k)) continue;
    if (!v) continue;
    out[k] = v;
  }

  return out;
};

const getFromCookies = (): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!document.cookie) return out;

  const parts = document.cookie.split(";");
  for (const part of parts) {
    const [rawKey, ...rawValue] = part.split("=");
    const key = decodeURIComponent((rawKey || "").trim());
    if (!key || !isTrackingKey(key)) continue;

    const value = decodeURIComponent(rawValue.join("=").trim());
    if (value) out[key] = value;
  }

  return out;
};

const getFromStorage = (storage: Storage): Record<string, string> => {
  const out: Record<string, string> = {};

  // 1) Nosso cache (sempre que existir, é o mais confiável no SPA)
  Object.assign(out, pickTrackingParams(safeJsonParse(storage.getItem(APP_UTM_STORAGE_KEY))));

  // 2) Formato comum do UTMify
  Object.assign(out, pickTrackingParams(safeJsonParse(storage.getItem("__utmify_session_utms__"))));

  // 3) Formato alternativo do UTMify
  const utmify = safeJsonParse(storage.getItem("__utmify__")) as any;
  if (utmify && typeof utmify === "object") {
    Object.assign(out, pickTrackingParams(utmify.utms ?? utmify));
  }

  return out;
};

// Função para obter os UTM parameters da URL / storage / cookies, e manter cache no SPA
export const getUtmParams = (): Record<string, string> => {
  const params: Record<string, string> = {
    // storage/cookies primeiro...
    ...(() => {
      try {
        return getFromStorage(localStorage);
      } catch {
        return {};
      }
    })(),
    ...(() => {
      try {
        return getFromStorage(sessionStorage);
      } catch {
        return {};
      }
    })(),
    ...getFromCookies(),
    // ...URL por último para sobrescrever qualquer coisa
    ...getFromSearchParams(),
  };

  // Atualiza cache próprio para não perder UTMs ao navegar dentro do app
  if (Object.keys(params).length > 0) {
    try {
      localStorage.setItem(APP_UTM_STORAGE_KEY, JSON.stringify(params));
    } catch {
      // ignore
    }
  }

  return params;
};

// Chamar o mais cedo possível no boot do app
export const initUtmCapture = (): void => {
  getUtmParams();
};

// Função para adicionar UTMs a uma URL
export const appendUtmToUrl = (baseUrl: string): string => {
  const utmParams = getUtmParams();

  if (Object.keys(utmParams).length === 0) {
    return baseUrl;
  }

  const url = new URL(baseUrl, window.location.origin);

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
export const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v4/sAxm8xS5o2d9po6HDheO";

// Função específica para ir ao checkout com UTMs
export const goToCheckout = (): void => {
  navigateWithUtm(CHECKOUT_URL);
};
