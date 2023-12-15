//keys
export const COOKIES_AUTH_CREDENTIALS = 'auth_credentials';

//utils
export const setCookie = (name: string, value: string, seconds: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + seconds * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
