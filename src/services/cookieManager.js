//save the user Token in cookie
export const setCookie = (accessToken) => {
  const isCookie = getCookie();
  if (isCookie) {
    clearCookie();
  }
  document.cookie = `token=${accessToken}`;
  return document.cookie;
};

//get the user token from cookie
export const getCookie = () => {
  const cookieStored = document.cookie;
  const token = cookieStored.split('=')[1];
  return token || null;
};

//clear cookie
export const clearCookie = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
