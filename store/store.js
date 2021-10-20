
export default {
  namespaced: true,
  state: () => ({
    index: -1
  }),

  getters: {
    getIndex: state => state.index
  },
  mutations: {
    setIndex (state) {
      state.index = state.index+1
    }
  },
  actions: {
    
  }

}
