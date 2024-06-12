export const parseCookieString = (cookieString: string) =>
  cookieString?.split("; ").reduce<Record<string, string>>((map, current) => {
    const [key, value] = current.split("=");
    map[key] = value;

    return map;
  }, {});

export const setCookie = (key: string, value: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const deleteCookie = (key: string) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
