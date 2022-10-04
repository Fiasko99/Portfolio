<template>
  <div class="container student-profile mt-4">
    <div class="avatar text-center">
      <img width="100%" :src="url" alt="avatar">
    </div>
    <div class="info m-4">
      <h3 class="text-left" v-if="getUsername">{{getFullname}}</h3>
      <h4 class="text-left">{{getUsername}}</h4>
    </div>
    <hr style="width: 100%;">
    <div v-if="portfolios" class="student-portfolio mb-4">
      <h3 class="w-100 mb-4 text-center">Сертификаты учащегося</h3>
      <div v-for="item in portfolios" :key="item.id" class="portfolio-item">
        <a target="_blank" :href="`${getAPIURI}${item.static_path}`">
          <img width="100%" :src="`${getAPIURI}${item.static_path}`" alt="certificate">
        </a>
        <div class="item-body">
          <h4>{{item.file_name}}</h4>
          <span>{{item.created_at}}</span>
        </div>
      </div>
    </div>
    <h3 v-else>У пользователя нет сертификатов</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      url: 'https://previews.123rf.com/images/artemstepanov/artemstepanov1606/artemstepanov160600961/57880103-vector-female-face-avatar-template-pictogram-button-round-trendy-flat-icon-with-women-for-business-i.jpg',
      portfolios: null,
    }
  },
  computed: {
    getFullname() {
      return `${this.user?.surname} ${this.user?.name} ${this.user?.lastname}`
    },
    getUsername() {
      return this.user?.username
    },
    getAPIURI() {
      return process.env.VUE_APP_SERVER_URI.replace('/api', '')
    }
  },
  methods: {
    updateUser() {
      this.$client.http
      .get(`/users/${this.$route.params.id}`)
      .then(res => this.user = res.data)
      .catch(err => console.log(err.response.data))
    },
    getPortfolio() {
      this.$client.http
      .get(`/users/${this.$route.params.id}/portfolios`)
      .then(res => this.portfolios = res.data)
      .catch(err => console.log(err.response.data))
    }
  },
  async created() {
    this.updateUser()
    this.getPortfolio()
  }
}
</script>

<style>
.student-profile {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: blueviolet;
}
.avatar {
  width: 50%;
}
.avatar img {
  border-radius: 36px;
}
.info {
  width: 50%;
  color: blueviolet;
}
.student-portfolio {
  width: 100%;
  border: 3px solid blueviolet;
  border-radius: 16px;
  display: flex;
  justify-content: space-around;
  padding: 12px;
  flex-wrap: wrap;
  color: blueviolet;
}
.portfolio-item {
  margin: 12px 0;
  width: 30%;
  border: 3px solid #8a2be270;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
}
.item-body {
  color: blueviolet;
  padding: 12px;
}
</style>