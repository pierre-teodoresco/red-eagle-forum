// store/store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        loginUser({ commit }, user) {
            this.state.user = user;
        },
    },
    getters: {
        getUser: (state) => state.user,
    },
});
