<template>
  <div class="container mb-4 mt-4 app-edit-form">
    <h1>Редактировать профиля</h1>
    <div class="app-form-group">
      <label for="">ФИО</label>
      <input v-model="fullname" value="fullname" type="text" name="fullname" id="fullname">
      <button @click="updateFullname" :disabled="getFullname == fullname">Отправить</button>
    </div>
    <hr>
    <div class="app-form-group">
      <label for="">Почта</label>
      <input v-model="username" value="username" type="text" name="username" id="username">
      <button @click="updateUsername" :disabled="getUser.username == username">Отправить</button>
    </div>
    <hr>
    <div class="app-form-group">
      <label for="">Пароль</label>
      <input v-model="oldPassword" autocomplete="new-password" placeholder="Текущий пароль" type="password" name="oldPassword" id="oldPassword">
      <input v-model="newPassword" placeholder="Новый пароль" type="password" name="newPassword" id="newPassword">
      <input v-model="confirmPassword" placeholder="Подтвердите новый пароль" type="password" name="confirmPassword" id="confirmPassword">
      <button @click="updatePassword" :disabled="oldPassword && newPassword != confirmPassword">Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser
    },
    getFullname() {
      return `${this.getUser?.surname} ${this.getUser?.name} ${this.getUser?.lastname}`
    }
  },
  methods: {
    updateFullname() {
      this.$client
      .post('')
      .then(res => this.$store.commit('updateUser', res.data))
      .catch(err => console.log(err.response.data))
    },
    updateUsername() {
      this.$client
      .post('')
      .then(res => this.$store.commit('updateUser', res.data))
      .catch(err => console.log(err.response.data))
    },
    updatePassword() {
      this.$client
      .post('')
      .then(res => this.$store.commit('updateUser', res.data))
      .catch(err => console.log(err.response.data))
    },
  },
  created() {
    this.fullname = this.getFullname
    this.username = this.getUser?.username
  }
}
</script>

<style scoped>
.app-edit-form {
  color: blueviolet;
  border: 3px solid blueviolet;
  border-radius: 12px;
  background: white;
}
.app-form-group {
  margin: 24px 12px;
}
.app-form-group label {
  display: block;
  font-size: 24px;
  font-weight: bold;
}
.app-form-group input {
  width: 100%;
  display: block;
  outline: 3px solid blueviolet;
  border-radius: 8px;
  font-size: 18px;
  padding: 6px;
  margin: 12px 0;
}
.app-form-group button {
  background: blueviolet;
  color: #fff;
  border: 3px solid rgba(0,0,0,0);
  font-size: 18px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.app-form-group button:hover {
  background: #fff;
  color: blueviolet;
  border: 3px solid blueviolet;
}
.app-form-group button:active {
  background: blueviolet;
  color: #fff;
  border: 3px solid rgba(0,0,0,0);
}
.app-form-group button:disabled {
  color: #fff !important;
  background: gray !important;
  border: 3px solid grey !important;
  cursor: default;
}
</style>