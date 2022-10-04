<template>
  <div class="container mt-4" v-if="users.length > 0">
    <div class="search">
      <div class="app-filters">
        <button
          :class="{'active-filter': turnFilter}" 
          @click="turnFilter = true">Фильтрация по предметам</button>
        <button
          :class="{'active-filter': !turnFilter}" 
          @click="turnFilter = false">Фильтрация по ученикам</button>
      </div>
      <div v-if="!turnFilter" class="search-student">
        <div class="radio-buttons">
          <div class="radio-button">
            <input 
              @change="checkValue"
              type="radio" 
              value="surname" 
              name="surname" 
              id="surname" 
              v-model="searchOption">
            <label for="surname">Фамилия</label>
          </div>
          <div class="radio-button">
            <input 
              @change="checkValue"
              type="radio" 
              value="name" 
              name="name" 
              id="name" 
              v-model="searchOption">
            <label for="name">Имя</label>
          </div>
          <div class="radio-button">
            <input 
              @change="checkValue"
              type="radio" 
              value="lastname" 
              name="lastname" 
              id="lastname" 
              v-model="searchOption">
            <label for="lastname">Отчество</label>
          </div>
          <div class="radio-button">
            <input 
              value="username" 
              @change="checkValue"
              type="radio" 
              name="username" 
              id="username" 
              v-model="searchOption">
            <label for="username">Почта</label>
          </div>
        </div>
        <input 
          @input="checkValue"
          v-model="searchValue" 
          placeholder="Поиск"  
          type="text">
      </div>
    </div>
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
    <div class="app-cards">
      <div v-for="(user, idx) in paginatedData" :key="user.id" class="app-card">
        <div class="app-card-title">
          <span>{{ idx + 1 }}</span>
          <img :src="url" width="64px" alt="">
          <div class="app-card-subtitle">
            <h3>{{user.surname}} {{user.name}} {{user.lastname}}</h3>
            <p>{{user.username}}</p>
          </div>
        </div>
        <div class="app-card-footer">
          <button>
            <router-link 
              :to="'/user/' + user.id">
              Перейти к профилю
            </router-link>
          </button>
          <button>
            <a 
              target="_blank" 
              :href="'mailto:' + 
              user.username + 
              '?subject=Subject&body=message%20goes%20here'">
              Связаться с учащимся
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mt-4">
    <h1 class="text-center">В системе нет пользователей</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: new Array(),
      url: 'https://previews.123rf.com/images/artemstepanov/artemstepanov1606/artemstepanov160600961/57880103-vector-female-face-avatar-template-pictogram-button-round-trendy-flat-icon-with-women-for-business-i.jpg',
      searchOption: 'username',
      size: 10,
      pageNumber: 0,
      searchValue: '',
      turnFilter: false
    }
  },
  computed: {
    pageCount(){
      return Math.ceil(this.getSearchingUser.length/this.size);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
            end = start + this.size;
      return this.getSearchingUser.slice(start, end);
    },
    getSearchingUser() {
      return this.users.filter(user => user[this.searchOption].includes(this.searchValue))
    }
  },
  methods:{
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
    },
    updateStudents() {
      this.$client.http
      .get('/users/student')
      .then(res => {
        this.users = res.data
      })
      .catch(err => console.log(err.response?.data))
    }
  },
  mounted() {
    this.updateStudents()
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
.app-card {
  position: relative;
  border: 1px solid blueviolet;
  background: #fff;
  padding: 5px 8px;
  border-radius: 12px;
  margin: 12px auto;
  display: flex;
  justify-content: space-between;
  color: blueviolet;
  flex-wrap: wrap;
}
.app-card span {
  position: absolute;
  top: 0;
  right: 5px;
}
.app-card-title {
    display: flex;
    align-items: center;
}
.app-card-title img {
  border-radius: 35%;
}
.app-card-footer {
  display: flex;
  align-items: center;
  margin: 12px;
}
.app-card-footer button {
  border: 3px solid rgba(0, 0, 0, 0);
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 4px 12px;
  background: blueviolet;
}
.app-card-footer button:hover {
  border: 3px solid blueviolet;
  background: #fff;
  color: blueviolet;
}
.app-card-footer button:active {
  border: 3px solid rgba(0, 0, 0, 0);
  background: blueviolet;
  color: #fff;
}
.app-card-footer button:first-child {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-right: 1px solid #fff;
}
.app-card-footer button:last-child {
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  border-left: 1px solid #fff;
}
.app-card-footer button a {
  color: inherit;
  text-decoration: none;
}
.search input {
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  border: 2px solid blueviolet;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 100%;
  color: blueviolet;
}
.search input:focus {
  outline: none;
}
.search input::placeholder {
  color: rgb(138, 43, 226, 0.6);
  font-size: 18px;
  font-weight: bold;
}
.app-filters {
  display: flex;
}
.app-filters button {
  display: block;
  width: 100%;
  border: 3px solid rgba(0, 0, 0, 0);
  font-size: 18px;
  font-weight: bold;
  color: blueviolet;
  border: 3px solid blueviolet;
  padding: 4px 12px;
}
.app-filters button:hover {
  border: 3px solid blueviolet;
  background: #fff;
  color: blueviolet;
}
.app-filters button:active {
  border: 3px solid rgba(0, 0, 0, 0);
  background: blueviolet;
  color: #fff;
}
.app-filters button:first-child {
  border-top-left-radius: 8px;
}
.app-filters button:last-child {
  border-top-right-radius: 8px;
}
.active-filter {
  background: blueviolet;
  color: #fff !important;
}
.active-filter:hover {
  color: blueviolet !important;
}
.radio-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid blueviolet;
  color: blueviolet;
  font-size: 18px;
  padding: 6px 15px;
  align-items: center;
  background: rgba(138, 43, 226, 0.1);
}
.radio-button input[type=radio] {
	display: none;
}
.radio-button label {
	display: inline-block;
	cursor: pointer;
	position: relative;
	padding-left: 25px;
  margin: 0;
  margin-right: 5px;
	line-height: 18px;
	user-select: none;
}
.radio-button label:before {
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
.radio-button input[type=radio]:checked + label:before {
	background: rgb(138, 43, 226, 0.6);
}
.radio-button input[type=radio]:checked +label {
  font-weight: bolder;
}
.radio-button label:hover:before {
	filter: brightness(120%);
}
</style>