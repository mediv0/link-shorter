export const state = () => ({
    // check if route is login with phone or emeail recovery
    senderInputValue: "",
    rememberUser: false,
    isAuth: false,
});

export const mutations = {
    setIsAuth(state, auth) {
        state.isAuth = auth;
    },
};

export const actions = {
    async isUserAuthenticated({ commit }) {
        let isAuth;
        try {
            isAuth = await this.$axios.get("/api/auth/isAuth");
        } catch (e) {
            isAuth = false;
        }
        commit("setIsAuth", isAuth);
    },
};

export const getters = {
    isAuth(state) {
        return state.isAuth;
    },
};
