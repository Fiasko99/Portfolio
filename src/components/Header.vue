<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/" class="app-text-color">Портфолио</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav> 
          <b-nav-item to='/'>Главная</b-nav-item>
          <b-nav-item v-if="isAuth && getRole == 'teacher'" to='/search'>Выбрать участника</b-nav-item>
          <b-nav-item v-if="isAuth && getRole == 'super-admin'" to='/teachers'>Получить учителей</b-nav-item>
          <b-nav-item v-if="!isAuth" to="/auth">Авторизация</b-nav-item>
        </b-navbar-nav>
        <b-nav-item-dropdown v-if="isAuth" right>
          <template #button-content>
            <em>Пользователь</em>
          </template>
          <b-dropdown-item to="/profile">Профиль</b-dropdown-item>
          <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.getAuth
    },
    getUser() {
      return this.$store.getters.getUser
    },
    getRole() {
      return this.$store.getters.getRole
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('deleteUser')
      .then(() => this.$router.go())
    }
  }
}
</script>

<style>

</style>