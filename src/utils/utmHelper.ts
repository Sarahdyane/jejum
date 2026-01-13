/**
 * Helper para gerenciar UTM parameters com UTMify
 */

const APP_UTM_STORAGE_KEY = "__nutria_utms__";

// Além dos utm_* padrões, algumas chaves comuns em tracking BR/UTMify
const EXTRA_TRACKING_KEYS = [
  "fbclid",
  "gclid",
  "ttclid",
  "xcod",
  "sck",
  "src",
  "subid",
  "subid1",
  "subid2",
  "subid3",
  "subid4",
  "subid5",
  "utmify",
];

const isTrackingKey = (key: string): boolean => {
  // pega utm_* e também qualquer coisa que contenha "utm" (ex: utmify)
  if (key.startsWith("utm_")) return true;
  if (key.includes("utm")) return true;
  return EXTRA_TRACKING_KEYS.includes(key);
};

const safeJsonParse = (value: string | null): unknown => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const parseQueryString = (value: string): Record<string, string> => {
  const out: Record<string, string> = {};
  const cleaned = value.trim().replace(/^\?/, "");
  if (!cleaned) return out;

  const usp = new URLSearchParams(cleaned);
  for (const [k, v] of usp.entries()) {
    if (!k || !v) continue;
    if (!isTrackingKey(k)) continue;
    out[k] = v;
  }
  return out;
};

const pickTrackingParams = (input: unknown): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!input) return out;

  // string pode vir como querystring
  if (typeof input === "string") {
    return parseQueryString(input);
  }

  if (typeof input !== "object") return out;

  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (v === null || v === undefined) continue;

    // alguns formatos salvam tudo em um campo string (ex: "parameters")
    if (typeof v === "string" && (k === "parameters" || k === "params" || k === "query")) {
      Object.assign(out, parseQueryString(v));
      continue;
    }

    if (isTrackingKey(k)) {
      out[k] = String(v);
    }
  }

  return out;
};

const deepExtractTrackingParams = (input: unknown, depth = 0): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!input) return out;

  // primeiro nível
  Object.assign(out, pickTrackingParams(input));

  // extrai até 2 níveis para pegar formatos do tipo { utms: {...} }
  if (depth >= 2) return out;

  if (typeof input === "object") {
    for (const v of Object.values(input as Record<string, unknown>)) {
      if (!v) continue;
      if (typeof v === "object" || typeof v === "string") {
        Object.assign(out, deepExtractTrackingParams(v, depth + 1));
      }
    }
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

  // 1) Nosso cache (quando existir, é o mais confiável no SPA)
  Object.assign(out, deepExtractTrackingParams(safeJsonParse(storage.getItem(APP_UTM_STORAGE_KEY))));

  // 2) Formato comum do UTMify
  const s1 = storage.getItem("__utmify_session_utms__");
  Object.assign(out, deepExtractTrackingParams(safeJsonParse(s1) ?? s1));

  // 3) Formato alternativo do UTMify
  const s2 = storage.getItem("__utmify__");
  Object.assign(out, deepExtractTrackingParams(safeJsonParse(s2) ?? s2));

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
  // captura imediata
  getUtmParams();

  // recaptura depois que scripts async (UTMify) terminarem de popular storage/cookies
  window.setTimeout(() => getUtmParams(), 300);
  window.setTimeout(() => getUtmParams(), 1200);
  window.setTimeout(() => getUtmParams(), 3000);
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
