<template>
  <div>
    <form @submit.prevent="auth" v-if="!getAuth" class="container mt-4 mb-4">
      <div class="app-auth-form">
        <h1 class="app-auth-heading">Авторизация</h1>
        <div class="app-form-group-input">
          <label for="app-login">Почта</label>
          <input id="app-login" type="text" v-model="login">
        </div>
        <div class="app-form-group-input">
          <label for="app-password">Пароль</label>
          <input id="app-password" type="password" v-model="password">
        </div>
        <button type="submit" class="app-login-btn">Войти</button>
        <div class="app-link-btns">
          <router-link to="/registration" class="app-link-btn">Зарегистрироваться</router-link>
          <router-link to="/refresh" class="app-link-btn">Забыли пароль?</router-link>
        </div>
      </div>
    </form> 
    <ConfirmWindow v-if="!isConfirmed" />
  </div>
</template>

<script>
import ConfirmWindow from "@/components/ConfirmWindow.vue";

export default {
  data() {
    return {
      login: '',
      password: ''
    }
  },
  components: {
    ConfirmWindow
  },
  methods: {
    auth() {
      this.$store.dispatch('fetchUser', {
        username: this.login,
        password: this.password,
        fingerprint: this.$uuid()
      }).then(() => this.$router.go())
    }
  },
  computed: {
    getAuth() {
      return this.$store.getters.auth
    },
    isConfirmed() {
      return this.$store.getters.getConfirmed
    }
  },
}
</script>

<style scoped>
.app-auth-form {
  padding: 36px;
  border: 3px solid blueviolet;
  border-radius: 12px;
}
.app-auth-form h1 {
  color: blueviolet;
  text-align: center;
  font-weight: bold;
}
.app-form-group-input {
  margin-bottom: 15px;
}
.app-form-group-input label {
  font-size: 24px;
  display: block;
  padding: 0;
  margin: 0;
  color: blueviolet;
  cursor: pointer;
  font-weight: bold;
}
.app-form-group-input input {
  width: 100%;
  display: block;
  padding: 8px;
  border: none;
  border-bottom: 1px solid blueviolet;
  margin-top: 4px;
  cursor: initial;
}
.app-form-group-input input:focus {
  outline: none;
  border-bottom: 5px solid blueviolet;
  margin-top: 1px;
  background: rgba(138, 43, 226, 0.06);
}
.app-login-btn {
  display: block;
  margin: auto;
  border-radius: 12px;
  background: blueviolet;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding: 8px 36px;
  border: none;
}
.app-login-btn:hover {
  background: white;
  color: blueviolet;
  padding: 5px 33px;
  border: 3px solid blueviolet;
}
.app-login-btn:active {
  background: blueviolet;
  color: white;
}
.app-link-btns {
  display: flex;
  justify-content: space-between;
}
.app-link-btn {
  text-align: center;
  background: none;
  color: blueviolet;
  font-weight: bold;
  padding: 6px;
  border: none;
  border-bottom: 3px solid blueviolet;
  border-radius: 6px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.app-link-btn:hover {
  background: rgba(0,0,0,0.1);
}
</style>