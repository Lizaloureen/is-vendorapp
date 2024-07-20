export const getUser = () => {
  let userData =
    localStorage.getItem("isVendorTokenData") !== ""
      ? JSON.parse(localStorage.getItem("isVendorTokenData"))
      : null;

  if (userData !== null) {
    return userData;
  } else {
    window.location.href = "/login";
  }
};

export const getToken = () => {
  let token =
    localStorage.getItem("isVendorToken") !== ""
      ? localStorage.getItem("isVendorToken")
      : null;

  if (token !== null) {
    return token;
  } else {
    window.location.href = "/login";
  }
};
