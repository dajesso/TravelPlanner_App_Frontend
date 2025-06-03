export const getToken = () =>
  document.cookie
    .split("; ")
    .find(row => row.startsWith("sessionToken="))
    ?.split("=")[1];