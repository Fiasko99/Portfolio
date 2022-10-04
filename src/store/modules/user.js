import httpClient from "../../HttpClient";
const client = httpClient

export default {
  state: {
    user: null,
    auth: false,
    isConfirmed: true,
  },
  mutations: {
    updateJWT(state, data) {
      if (data?.access_token) {
        localStorage.setItem("jwt", data.access_token);
        client.setAuthHeader(data.access_token)
      } else {
        data?.message
      }
    },
    updateUser(state, userData) {
      if (userData?.id) {
        state.user = userData;
        state.auth = true;
        state.isConfirmed = state.user["is_confirmed"];
      } else {
        userData?.message
      }
    },
    clearUser(state) {
      state.auth = false;
      state.user = null
      state.isConfirmed = true;
      localStorage.removeItem("jwt")
    },
  },
  actions: {
    async fetchUser(ctx, authData) {
      const { data } = await client.http
      .post("/auth/login", authData, {
        withCredentials: true,
      })
      .catch((err) => err.response);
      await ctx.commit("updateJWT", data);
      if (data?.access_token) {
        const { data } = await client.http
        .get("/profile/me/")
        .catch((err) => err.response);
        await ctx.commit("updateUser", data);
      }
    },
    async deleteUser(ctx) {
      const options = {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": this._vm.$getCookie("csrf_refresh_token"),
        },
      };
      await client.http
      .post("/auth/logout", "", options)
      .catch((err) => console.log(err.response?.data))
      await ctx.commit("clearUser")
    },
    async checkJWT(ctx) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        client.setAuthHeader(jwt)
        const { data } = await client.http
        .get("/profile/me/")
        .catch((err) => err.response.data);
        await ctx.commit("updateUser", data);
      }
    },
  },
  getters: {
    getUser(state) {
      return state?.user;
    },
    getUserId(state) {
      return state?.user.id
    },
    getRole(state) {
      return state.user?.role
    },
    getUsername(state) {
      return state.user?.username
    },
    getAuth(state) {
      return state.auth;
    },
    getConfirmed(state) {
      return state.isConfirmed;
    },
  },
};
