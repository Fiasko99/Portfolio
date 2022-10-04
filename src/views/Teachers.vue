<template>
  <div class="container mt-4 mb-4 app-teachers">
    <button class="add-new-user" @click="showFormAddTeacher = !showFormAddTeacher">Добавить нового пользователя</button>
    <form v-if="showFormAddTeacher" @submit.prevent="createTeacher" class="app-form-add-teacher">
      <div class="app-add-teacher-form">
        <label for="usernameTeacher">Почта</label>
        <input v-model="username" autocomplete="new-username" type="text" name="usernameTeacher" id="usernameTeacher">
      </div>
      <div class="app-add-teacher-form">
        <label for="passwordTeacher">Пароль</label>
        <input v-model="password" autocomplete="new-password" type="password" name="passwordTeacher" id="passwordTeacher">
      </div>
      <div class="app-add-teacher-form">
        <label for="surnameTeacher">Фамилия</label>
        <input v-model="name" type="text" name="surnameTeacher" id="surnameTeacher">
      </div>
      <div class="app-add-teacher-form">
        <label for="nameTeacher">Имя</label>
        <input v-model="surname" type="text" name="nameTeacher" id="nameTeacher">
      </div>
      <div class="app-add-teacher-form">
        <label for="lastnameTeacher">Отчество</label>
        <input v-model="lastname" type="text" name="lastnameTeacher" id="lastnameTeacher">
      </div>
      <div class="app-add-teacher-radio-form">
        <p>Роль</p>
        <div class="radio-buttons-role">
          <div class="radio-button-role">
            <label for="roleAdmin">Администратор</label>
            <input v-model="role" type="radio" value="super-admin" name="roleTeacher" id="roleAdmin">
          </div>
          <div class="radio-button-role">
            <label for="roleTeacher">Учитель</label>
            <input v-model="role" type="radio" value="teacher" name="roleTeacher" id="roleTeacher">
          </div>
        </div>
      </div>
      <button type="submit" :disabled="isFieldInpust ? false : true">Сохранить</button>
    </form>
    <hr>
    <div class="pages mt-4">
      <button @click="prevPage" class="prev-page">
        Предыдущая
      </button>
      <input 
        v-model="pageNumber" 
        @input="checkValue" 
        type="number">
      <button @click="nextPage" class="next-page">
        Следующая
      </button>
    </div>
    <div v-if="teachers || admins" class="users-form mt-4 mb-4">
      <div class="app-search-user">
        <div class="search-options">
          <div class="search-option">
            <input v-model="searchOption" type="radio" value="surnameSearch" name="surnameSearch" id="surnameSearch">
            <label @change="checkValue" for="surnameSearch">Фамилия</label>
          </div>
          <div class="search-option">
            <input v-model="searchOption" type="radio" value="nameSearch" name="nameSearch" id="nameSearch">
            <label @change="checkValue" for="nameSearch">Имя</label>
          </div>
          <div class="search-option">
            <input v-model="searchOption" type="radio" value="lastnameSearch" name="lastnameSearch" id="lastnameSearch">
            <label @change="checkValue" for="lastnameSearch">Отчество</label>
          </div>
          <div class="search-option">
            <input v-model="searchOption" type="radio" value="usernameSearch" name="usernameSearch" id="usernameSearch">
            <label @change="checkValue" for="usernameSearch">Почта</label>
          </div>
        </div>
        <input @input="checkValue" placeholder="Поиск" v-model="searchValue" type="text">
      </div>
      <div v-for="user in paginatedData" :key="user.id" class="user-form mt-2 mb-2">
        <div class="app-user-body">
          ID: {{user.id}} |
          {{user.username}} | {{`${user.surname} ${user.name} ${user.lastname}`}} | {{user.role == 'teacher' ? 'Учитель' : 'Администратор'}}
        </div>
        <div class="app-user-footer">
          <button><router-link :to="`/admin/to/user/${user.id}`">Перейти к пользователю</router-link></button>
          <button @click="deleteUserById(user.id)">Удалить</button>
        </div>
      </div>
    </div>
    <h3 v-else style="text-align: center;">В системе нет пользователей данной категории</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teachers: [],
      admins: [],
      username: '',
      password: '',
      name: '',
      surname: '',
      lastname: '',
      role: 'teacher',
      showFormAddTeacher: false,
      size: 10,
      pageNumber: 0,
      searchValue: '',
      searchOption: 'usernameSearch'
    }
  },
  methods: {
    updateTeachers() {
      this.$client.http
      .get('/users/teacher')
      .then(res => this.teachers = res.data)
      .catch(err => {
        this.teachers = []
      })
    },
    updateAdmins() {
      this.$client.http
      .get('/users/super-admin')
      .then(res => this.admins = res.data)
      .catch(err => {
        this.admins = []
      })
    },
    updateUsers() {
        this.updateTeachers()
        this.updateAdmins()
    },
    createTeacher() {
      const newUser = {
        username: this.username,
        password: this.password,
        name: this.name,
        surname: this.surname,
        lastname: this.lastname,
        role: this.role
      }
      this.$client.http
      .post('/users/', newUser)
      .then(() => {
        this.updateUsers()
        this.username = ''
        this.password = ''
        this.name = ''
        this.surname = ''
        this.lastname = ''
      })
      .catch(err => console.log(err.response?.data))
    },
    deleteUserById(id) {
      this.$client.http
      .delete(`/users/${id}`)
      .then(() => this.updateUsers())
      .catch(err => console.log(err.response?.data))
    },
    checkValue() {
      if (parseInt(this.pageNumber) > this.pageCount - 1)
        this.pageNumber = this.pageCount - 1 >= 0 ? this.pageCount - 1 : 0
      else if (parseInt(this.pageNumber) < 0) 
        this.pageNumber = 0
    },
    nextPage(){
        if (this.pageNumber + 1 < this.pageCount)
          this.pageNumber++;
    },
    prevPage(){
      if (this.pageNumber - 1 >= 0)
        this.pageNumber--;
    }
  },
  computed: {
    getUsers() {
      return this.admins ? this.teachers.concat(this.admins) : []
    },
    isFieldInpust() {
      return this.username && this.password && this.name && this.surname && this.lastname && this.role
    },
    getSearchingUser() {
      return this.getUsers.filter(user => user[this.searchOption.replace('Search', '')].includes(this.searchValue))
    },
    pageCount(){
      return Math.ceil(this.getSearchingUser.length/this.size);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
            end = start + this.size;
      return this.getSearchingUser.slice(start, end);
    },
  },
  created() {
    this.updateUsers()
  }
}
</script>

<style scoped>
.pages {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pages input {
  border: none;
  border-top: 1px solid blueviolet;
  border-bottom: 1px solid blueviolet;
  width: 100%;
  padding-top: 2px;
  padding-bottom: 1px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: blueviolet;
}
.pages input:focus {
  outline: none;
}
.pages input::-webkit-outer-spin-button,
.pages input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
}
.pages button {
  border: 3px solid rgba(0, 0, 0, 0);
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 4px 12px;
  background: blueviolet;
}
.pages button:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.pages button:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.pages button:hover {
  border: 3px solid blueviolet;
  background: #fff;
  color: blueviolet;
}
.pages button:active {
  border: 3px solid rgba(0, 0, 0, 0);
  background: blueviolet;
  color: #fff;
}
.app-teachers {
  color: blueviolet;
}
.app-add-teacher-form {
  margin: 12px;
  display: flex;
  justify-content: center;
}
.app-form-add-teacher button, .add-new-user {
  padding: 6px 12px;
  font-weight: bold;
  border-radius: 8px;
  font-size: 18px;
  border: 3px solid rgba(0,0,0,0);
  background: blueviolet;
  color: #fff;
}
.app-form-add-teacher button:hover {
  border: 3px solid blueviolet;
  background: #fff;
  color: blueviolet;
}
.app-form-add-teacher button:active {
  border: 3px solid rgba(0,0,0,0);
  background: blueviolet;
  color: #fff;
}
.app-form-add-teacher button:disabled {
  border: 3px solid grey !important;
  background: gray !important;
  color: #fff;
}
.app-add-teacher-form label {
  width: 100px;
  align-items: center;
  font-size: 18px;
}
.app-add-teacher-form input {
  width: 100%;
  outline: 3px solid blueviolet;
  border-radius: 8px;
  font-size: 18px;
  padding: 6px 12px;
  font-weight: bold;
  color: blueviolet;
}
.app-add-teacher-radio-form {
  margin: 12px;
  display: flex;
}
.app-add-teacher-radio-form p {
  width: 100px;
}
.app-add-teacher-radio-form .radio-buttons-role {
  width: 100;
  display: flex;
}
.radio-button-role {
  margin-right: 15px;
}
.radio-button-role label {
  margin-right: 3px;
}
.users-form {
  padding: 12px;
  border: 3px solid blueviolet;
  color: blueviolet;
  border-radius: 12px;
}
.user-form {
  border: 2px solid blueviolet;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 12px;
}
.app-user-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 12px 0;
}
.app-user-footer button {
  padding: 6px 12px;
  font-weight: bold;
  font-size: 12px;
  border: none;
  border-left: 1px solid rgba(0,0,0,0);
  border-right: 1px solid rgba(0,0,0,0);
  background: blueviolet;
  color: #fff;
  margin: 0 12px;
  border-radius: 4px;
}
.app-user-footer button:hover {
  border-left: 1px solid blueviolet;
  border-right: 1px solid blueviolet;
  background: #fff;
  color: blueviolet;
}
.app-user-footer button:active {
  border-left: 1px solid rgba(0,0,0,0);
  border-right: 1px solid rgba(0,0,0,0);
  background: blueviolet;
  color: #fff;
}
.app-user-footer button a {
  color: inherit;
  text-decoration: none;
}
.search-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid blueviolet;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: blueviolet;
  font-size: 18px;
  padding: 6px 15px;
  align-items: center;
  background: rgba(138, 43, 226, 0.1);
}
.search-option input[type=radio] {
  display: none;
}
.search-option label {
	display: inline-block;
	cursor: pointer;
	position: relative;
	padding-left: 25px;
  margin: 0;
  margin-right: 5px;
	line-height: 18px;
	user-select: none;
}
.search-option label:before {
	content: "";
	display: inline-block;
	width: 18px;
	height: 18px;
	position: absolute;
	left: 0;
  border: 3px solid blueviolet;
  border-radius: 5px;
	background: #fff;
}
.search-option input[type=radio]:checked + label:before {
	background: rgba(166, 128, 201, 0.6);
}
.search-option input[type=radio]:checked + label {
  font-weight: bolder;
}
.search-option label:hover:before {
	filter: brightness(120%);
}
.app-search-user {
  margin-bottom: 24px;
}
.app-search-user input[type=text] {
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  border: 2px solid blueviolet;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 100%;
  color: blueviolet;
}
</style>