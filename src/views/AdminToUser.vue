<template>
  <div class="container mt-4 mb-4 app-admin-to-user">
    <div class="app-user-form-group">
      <h3>Почта: {{user.username}}</h3>
      <input v-model="user.username" type="text">
      <button @click="updateData('username')">Изменить</button>
    </div>
    <div class="app-user-form-group">
      <h3>Роль: {{user.role == "teacher" ? "Учитель" : "Администратор"}}</h3>
      <div class="radio-form-group first">
        <input v-model="user.role" id="teacher" value="teacher" type="radio">
        <label for="teacher">Учитель</label>
      </div>
      <div class="radio-form-group">
        <input v-model="user.role" id="super-admin" value="super-admin" type="radio">
        <label for="super-admin">Администратор</label>
      </div>
      <button @click="updateData('role')">Изменить</button>
    </div>
    <div class="app-user-form-group">
      <h3>Пароль</h3>
      <input v-model="newPassword" placeholder="Введите новый пароль" type="text">
      <button @click="updateData('password')">Изменить</button>
    </div>
    <div class="app-user-form-group">
      <h3>Фамилия: {{user.surname}}</h3>
      <input v-model="user.surname" type="text">
      <button @click="updateData('fullname')">Изменить</button>
    </div>
    <div class="app-user-form-group">
      <h3>Имя: {{user.name}}</h3>
      <input v-model="user.name" type="text">
      <button @click="updateData('fullname')">Изменить</button>
    </div>
    <div class="app-user-form-group">
      <h3>Отчество: {{user.lastname}}</h3>
      <input v-model="user.lastname" type="text">
      <button @click="updateData('fullname')">Изменить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      newPassword: '',
    }
  },
  methods: {
    updateData(name) {
      const objData = {
        fullname: {
          surname: this.user.surname,
          name: this.user.name,
          lastname: this.user.lastname
        },
        role: {
          role: this.user.role
        },
        username: {
          username: this.user.username
        }
      } 
      this.$client.http
      .put(`/users/${this.$route.params.id}/${name}`, objData[name])
      .then(res => this.user = res.data)
      .catch(err => console.log(err.response?.data))
    },
    updateUser() {
      this.$client.http
      .get(`/users/${this.$route.params.id}`)
      .then(res => this.user = res.data)
    }
  },
  created() {
    this.updateUser()
  }
}
</script>

<style scoped>
.app-admin-to-user {
  border: 3px solid blueviolet;
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  color: blueviolet;
}
.app-user-form-group {
  margin-bottom: 12px;
}
.app-admin-to-user input[type=text] {
  padding: 6px 12px;
  border: 3px solid blueviolet;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  font-size: 18px;
  width: 75%;
  font-weight: bold;
  color: blueviolet;
  outline: none;
}
.app-admin-to-user button {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 18px;
  padding: 6px 12px;
  width: 25%;
  font-weight: bold;
  background: blueviolet;
  border: 3px solid #0000;
  color: #fff;
}
.app-admin-to-user button:hover {
  background: #fff;
  border: 3px solid blueviolet;
  color: blueviolet;
}
.app-admin-to-user button:active {
  background: blueviolet;
  border: 3px solid #0000;
  color: #fff;
}
.radio-form-group {
  display: inline-block;
  padding: 6px 12px;
  border: 3px solid blueviolet;
  border-right: none;
  border-left: none;
  width: calc(75% / 2);
}
.radio-form-group input[type=radio] {
  display: none;
}
.radio-form-group label {
  display: inline-block;
  font-size: 18px;
  position: relative;
  line-height: 18px;
  user-select: none;
  padding-left: 25px;
  margin-top: 4px;
  cursor: pointer;
}
.radio-form-group + button {
  padding-bottom: 9px;
}
.radio-form-group label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  background: #fff;
  border: 3px solid blueviolet;
  border-radius: 5px;
}
.radio-form-group input[type=radio]:checked + label:before {
  background: rgba(138, 43, 226, 0.6);
}
.radio-form-group input[type=radio]:checked + label {
  font-weight: bold;
}
.radio-form-group label:hover:before {
	filter: brightness(120%);
}
.app-user-form-group .first {
  border-left: 3px solid blueviolet;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>