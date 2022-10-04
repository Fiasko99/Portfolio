<template>
  <form v-if="!postQuery && !getAuth" @submit.prevent="refresh" class="container mt-4 mb-4">
    <div class="app-refresh-form">
      <h1 class="app-auth-heading">Воссталновление доступа</h1>
      <div class="app-form-group-input">
        <label for="app-login">Почта</label>
        <input id="app-login" type="text" v-model="login">
      </div>
      <button type="submit" class="app-refresh-btn">Получить код восстановления</button>
      <router-link to="/auth" class="app-link-btn">Вернуться к авторизации</router-link>
    </div>
  </form> 
  <form v-else-if="postQuery && !getAuth" @submit.prevent="confirmRefresh" class="container">
    <div class="app-refresh-form">
      <h1 class="app-auth-heading">Подтверждение восстановления</h1>
      <div class="app-form-group-input">
        <label for="app-refresh-code">Код восстановления</label>
        <input id="app-refresh-code" type="text" v-model="refreshCode">
      </div>
      <button type="submit" class="app-refresh-btn">Подтвердить</button>
      <button @click="toBack" class="prev-page-btn">Вернуться</button>
    </div>
  </form> 
</template>

<script>
export default {
  data() {
    return {
      login: '',
      refreshCode: '',
      postQuery: false,
    }
  },
  methods: {
    refresh() {
      this.postQuery = true
    },
    confirmRefresh() {
      alret('Success refresh')
      this.$router.push('/auth')
    },
    toBack() {
      this.postQuery = false
    }
  },
  computed: {
    getAuth() {
      return this.$store.getters.auth
    }
  },
}
</script>

<style>
.app-refresh-form {
  padding: 36px;
  border: 3px solid blueviolet;
  border-radius: 12px;
}
.app-refresh-form h1 {
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
.app-refresh-btn {
  display: block;
  margin: auto;
  border-radius: 12px;
  background: blueviolet;
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  padding: 8px 36px;
  border: none;
}
.app-refresh-btn:hover {
  background: white;
  color: blueviolet;
  padding: 5px 33px;
  border: 3px solid blueviolet;
}
.app-refresh-btn:active {
  background: blueviolet;
  color: white;
}
.app-link-btn, .prev-page-btn {
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
.app-link-btn:hover, .prev-page-btn:hover {
  background: rgba(0,0,0,0.1);
}
</style>