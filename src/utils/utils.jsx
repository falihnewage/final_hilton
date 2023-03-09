import Cookies from "js-cookie";

// SETTTING TOKEN
export const setToken = (token) => {
    // console.log(token,'token');
    Cookies.set("token", token, { sameSite: 'Strict' });
  };
  export const getToken = () => {
    const token = Cookies.get("token");
    return token;
  };
  export const removeToken = () => {
    Cookies.remove("token");
  };
// SETTTING TOKEN

// SETTING SESSION
export const setSession = (session) => {
    // console.log(token,'token');
    Cookies.set("session_id", session, { sameSite: 'Strict' });
  };
  export const getSession = () => {
    const session = Cookies.get("session_id");
    return session;
  };
  export const removeSession = () => {
    Cookies.remove("session_id");
  };

// SETTING SESSION
  
// SETTING ID
export const setUid = (id) => {
    // console.log(token,'token');
    Cookies.set("hilton_user_id", id, { sameSite: 'Strict' });
  };
  export const getUid = () => {
    const Uid = Cookies.get("hilton_user_id");
    return Uid;
  };
  export const removeUid = () => {
    Cookies.remove("hilton_user_id");
  };


// SETTING ID


