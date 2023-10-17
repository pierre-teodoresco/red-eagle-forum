// store/store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        user: null,
        isAuthenticated: false,
    },
    mutations: {
        login(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    actions: {
        login({ commit }, user) {
            commit('login', user);
        },
        logout({ commit }) {
            commit('logout');
        },
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
    },
    plugins: [createPersistedState()],
});
