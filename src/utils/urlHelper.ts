export function getUrlParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}
export function getUrlParamArray(name: string): string[] {
  return getUrlParam(name)?.split(",") || [];
}

export function setQueryParams(params: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams(window.location.search);
  for (const key in params) {
    if (params[key].toString().length !== 0) {
      searchParams.set(key, params[key].toString());
    } else {
      searchParams.delete(key);
    }
  }

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl);
}
