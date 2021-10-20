import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import cookie from "cookie";

export default ({ store, req }) => {
  createPersistedState({
    paths: ["store","nav"],
    storage: {
      getItem: (key) => {
        try{
          if (process.server) {
            const parsedCookies = cookie.parse(req.headers.cookie);
            return parsedCookies[key];
          } else {
            return Cookies.get(key);
          }
        }catch(e){
          console.log(e)
        }
        
      },
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store);
};