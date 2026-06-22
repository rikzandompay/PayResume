// Analytics helper — tracks events via Google Analytics 4
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const track = (event: string, props?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, props);
  }
};
