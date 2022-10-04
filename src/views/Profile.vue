<template>
  <div v-if="getUser" class="container mt-4">
    <div class="profile-info">
      <img 
        src="https://previews.123rf.com/images/artemstepanov/artemstepanov1606/artemstepanov160600961/57880103-vector-female-face-avatar-template-pictogram-button-round-trendy-flat-icon-with-women-for-business-i.jpg" 
        width="50%"
        alt="">
      <h2>{{ getFullname }}</h2>
      <h4>{{ getUsername }}</h4>
      <p>Статсус профиля: {{ getConfirmed ? 'подтврежден' : 'не подтвержден' }}</p>
      <div class="profile-buttons">
        <button>
          <router-link :to="`/edit/${getRole}`">Изменить профиль</router-link>
        </button>
      </div>
    </div>
    <div v-if="getRole == 'super-admin'">
    </div>
    <div v-else-if="getRole == 'teacher'">
    </div>
    <div v-else-if="getRole == 'student'">
      <div class="profile-buttons">
        <button 
          @click="showPortfolioUpload = !showPortfolioUpload"
          >Загрузить портфолио</button>
      </div>
      <div v-if="showPortfolioUpload" class="upload-portfolio">
        <form @submit.prevent="submitPortfolio" class="form-upload">
          <input 
            type="text" 
            v-model="portfolioName"
            name="portfolioName" 
            id="portfolioName" 
            placeholder="Наименование сертификата">
          <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
          <button :disabled="!getAccessUpload" type="submit">Загрузить</button>
        </form>
      </div>
      {{portfolios ? "Портфолио" : 'У вас нет загруженных портфолио'}}
      <div class="portfolios mt-4 mb-4">
        <div v-for="item in portfolios" :key="item.id" class="portfolio">
          <a target="_blank" :href="`${getAPIURI}${item.static_path}`">
            <img 
              width="100%" 
              :src="`${getAPIURI}${item.static_path}`" 
              alt="certificate">
          </a>
          <div class="portfolio-body">
            <h4>Название {{item['portfolio_name']}}</h4>
            <span>Дата загрузки: {{`
              ${item['created_at']}
            `}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portfolios: null,
      showPortfolioUpload: false,
      file: '',
      portfolioName: '',
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser
    },
    getFullname() {
      return `
        ${this.getUser?.surname} 
        ${this.getUser?.name} 
        ${this.getUser?.lastname}
      `
    },
    getUsername() {
      return this.$store.getters.getUsername
    },
    getConfirmed() {
      return this.$store.getters.getConfirmed
    },
    getRole() {
      return this.$store.getters.getRole
    },
    getAPIURI() {
      return process.env.VUE_APP_SERVER_URI.replace('/api', '')
    },
    getAccessUpload() {
      return this.file && this.portfolioName
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    submitPortfolio() {
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('portfolio_name', this.portfolioName)
      const options = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.$client.http
      .post(`/users/${this.getUser.id}/portfolios`, formData, options)
      .then(() => {
        this.$refs.file.value = "" 
        this.updateStudentPortfolio()
      })
      .catch(err => console.log(err.response?.data));
    },
    updateStudentPortfolio() {
      this.$client.http
      .get(`/profile/me/portfolios`)
      .then(res => this.portfolios = res.data)
      .catch(err => console.log(err.response.data))
    }
  },
  created() {
    if (this.getUser?.role == 'student')
      this.updateStudentPortfolio()
  },
}
</script>

<style>
.profile-info {
  color: blueviolet;
  text-align: center;
  border: 3px solid blueviolet;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
}
.profile-info img {
  border-radius: 36px;
}
.profile-buttons {
  display: flex;
  justify-content: space-around;
  margin: 18px;
}
.profile-buttons button {
  font-size: 18px;
  font-weight: bold;
  padding: 6px 12px;
  border: 3px solid rgba(0,0,0,0);
  background: blueviolet;
  color: #fff;
  border-radius: 8px;
}
.profile-buttons button:hover {
  border: 3px solid blueviolet;
  color: blueviolet;
  background: #fff;
}
.profile-buttons button:active {
  border: 3px solid blueviolet;
  color: blueviolet;
  background: #fff;
}
.profile-buttons button a {
  color: inherit;
  text-decoration: none;
}
.form-upload {
  display: flex;
  justify-content: center;
}
.form-upload input[type=file] {
  width: 50%;
  border: none;
  outline: none;
  border-bottom: 3px solid blueviolet;
  border-top: 3px solid blueviolet;
  padding: 6px 12px;
  font-size: 18px;
  background: #fff;
  cursor: pointer;
}
.form-upload input[type=text] {
  width: 30%;
  border: 3px solid blueviolet;
  outline: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 6px 12px;
  font-size: 18px;
  background: #fff;
}
.form-upload button {
  font-size: 18px;
  font-weight: bold;
  padding: 6px 12px;
  border: 3px solid rgba(0,0,0,0);
  background: blueviolet;
  color: #fff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.form-upload button:hover {
  border: 3px solid blueviolet;
  color: blueviolet;
  background: #fff;
}
.form-upload button:active {
  border: 3px solid blueviolet;
  color: blueviolet;
  background: #fff;
}
.form-upload button:disabled {
  background: gray !important;
  color: #fff;
  border: 3px solid gray;
}
.portfolios {
  border-top: 3px solid blueviolet;
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  justify-content: space-around;
  padding: 12px;
  flex-wrap: wrap;
}
.portfolios .portfolio {
  margin: 12px 0;
  width: 30%;
  border: 3px solid #8a2be270;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
}
.portfolio .portfolio-body {
  color: blueviolet;
  padding: 12px;
}
</style>