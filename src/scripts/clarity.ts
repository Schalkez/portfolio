declare global {
  interface Window {
    __clarityInited?: boolean;
  }
}

export async function initClarity() {
  if (typeof window === "undefined") return;
  if (!import.meta.env.PROD) return;

  const id = import.meta.env.PUBLIC_CLARITY_ID;
  if (!id || window.__clarityInited) return;

  const { default: Clarity } = await import("@microsoft/clarity");
  Clarity.init(id);
  window.__clarityInited = true;
}

export default initClarity;
