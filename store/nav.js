
export default {
  namespaced: true,
  state: () => ({
    drawer : false,
    loginAuth : false
  }),

  getters: {
    getDrawer : state => state.drawer,
    getLoginAuth : state => state.loginAuth
  },
  mutations: {
    setDrawer(state, payload){
      state.drawer = payload
    },
    setLoginAuth(state, payload){
      state.loginAuth = payload
    }
  },
  actions:{
      ChangeDrawer({state,commit},payload){
          const { drawer } = payload;
          commit('DRAWER',{
              drawer : drawer
          })
      }
  }
}
