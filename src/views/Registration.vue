<template>
  <div>
    <form @submit.prevent="registration" v-if="!getAuth" class="container mt-4 mb-4">
      <div class="app-registration-form">
        <h1 class="app-auth-heading">Регистрация</h1>
        <div class="app-form-group-input">
          <label for="app-username">Почта</label>
          <input id="app-username" type="text" v-model="username">
        </div>
        <div class="app-form-group-input">
          <label for="app-password">Пароль</label>
          <input id="app-password" type="password" v-model="password">
        </div>
        <div class="app-form-group-input">
          <label for="app-surname">Фамилия</label>
          <input id="app-surname" type="text" v-model="surname">
        </div>
        <div class="app-form-group-input">
          <label for="app-name">Имя</label>
          <input id="app-name" type="text" v-model="name">
        </div>
        <div class="app-form-group-input">
          <label for="app-lastname">Отчество</label>
          <input id="app-lastname" type="text" v-model="lastname">
        </div>
        <button type="submit" class="app-registration-btn">Зарегистрироваться</button>
        <router-link to="/auth" class="app-link-btn">Вернуться к авторизации</router-link>
      </div>
    </form> 
    <ConfirmWindow v-if="confirmWindow" :userData="{email: username, userId: user.id}" />
  </div>
</template>

<script>
import ConfirmWindow from '@/components/ConfirmWindow.vue'

export default {
  data() {
    return {
      username: '',
      password: '',
      surname: '',
      name: '',
      lastname: '',
      confirmWindow: false,
      user: null,
    }
  },
  methods: {
    registration() {
      const regData = {
        username: this.username,
        surname: this.surname,
        name: this.name,
        lastname: this.lastname,
        password: this.password,
      }
      this.$client.http
      .post('/auth/registration', regData)
      .then(res => {
        this.user = res.data
        this.confirmWindow = true
      })
      .catch(err => err.response.data)
    }
  },
  computed: {
    getAuth() {
      return this.$store.getters.auth
    }
  },
  components: {
    ConfirmWindow
  },
}
</script>

<style scoped>
.app-registration-form {
  padding: 36px;
  border: 3px solid blueviolet;
  border-radius: 12px;
}
.app-registration-form h1 {
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
.app-registration-btn {
  display: block;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 12px;
  background: blueviolet;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding: 8px 36px;
  border: none;
}
.app-registration-btn:hover {
  background: white;
  color: blueviolet;
  padding: 5px 33px;
  border: 3px solid blueviolet;
}
.app-registration-btn:active {
  background: blueviolet;
  color: white;
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