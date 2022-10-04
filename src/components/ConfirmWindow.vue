<template>
  <main class="app-popup-form">
    <div class="space-around-popup">
      <div class="app-popup-confirm">
        <h2 
          style="text-align: right; cursor: pointer;" 
          v-if="!userData"
          @click="closeWindow">X</h2>
        <header>Подтверждение аккаунта</header>
        <h3>Введите код</h3>
        <main>
          <input 
            @paste="$event.preventDefault()" 
            @keypress="checkKey($event)" 
            @input="checkRange($event, 'firstNumber')" 
            placeholder="0" 
            v-model="inputs.firstNumber" 
            type="number">
          <input 
            @paste="$event.preventDefault()" 
            @keypress="checkKey($event)" 
            @input="checkRange($event, 'secondNumber')" 
            placeholder="0" 
            v-model="inputs.secondNumber" 
            type="number">
          <input 
            @paste="$event.preventDefault()" 
            @keypress="checkKey($event)" 
            @input="checkRange($event, 'thirdNumber')" 
            placeholder="0" 
            v-model="inputs.thirdNumber" 
            type="number">
          <input 
            @paste="$event.preventDefault()" 
            @keypress="checkKey($event)" 
            @input="checkRange($event, 'fourthNumber')" 
            placeholder="0" 
            v-model="inputs.fourthNumber" 
            type="number">
          <input 
            @paste="$event.preventDefault()" 
            @keypress="checkKey($event)" 
            @input="checkRange($event, 'fifthNumber')" 
            placeholder="0" 
            v-model="inputs.fifthNumber" 
            type="number">
          <input 
            @paste="$event.preventDefault()" 
            @keypress="checkKey($event)" 
            @input="checkRange($event, 'sixthNumber')" 
            placeholder="0" 
            v-model="inputs.sixthNumber" 
            type="number">
        </main>
        <footer>
          <button 
            :disabled="notRepeatGettingCode" 
            :class="{'disable': notRepeatGettingCode}" 
            @click="repeatGetCode">Не получили код?</button>
          <button @click="sendCode">Подтвердить</button>
        </footer>
        <span>Для повторной отправки подождите {{ 
            parseInt(waitTime / 60) + ':' + waitTime % 60
           }}</span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        firstNumber: '',
        secondNumber: '',
        thirdNumber: '',
        fourthNumber: '',
        fifthNumber: '',
        sixthNumber: '',
      },
      waitTime: 0.1 * 60,
      notRepeatGettingCode: true,
      interval: ''
    }
  },
  props: {
    userData: {
      type: Object,
      default: null,
    }
  },
  computed: {
    getUserId() {
      return this.$store.getters.getUserId
    },
  },
  methods: {
    checkRange(event, valName) {
      if (this.inputs[valName].length > 1) {
        this.inputs[valName] = this.inputs[valName].slice(1, 2)
      }
      event.target.nextSibling ?
       event.target.nextSibling.focus() : 
       event.target.parentElement.children[0].focus()
    },
    checkKey(event) {
      if (event.which < 48 || event.which > 57) {
          event.preventDefault();
      }
    },
    repeatGetCode() {
      this.waitTime = 5 * 60
      this.interval = this.startInterval()
      this.notRepeatGettingCode = true
      this.userData ? 
        this.$client.http
        .post(`/auth/registration/${this.userData?.email}`, {
          user_id: this.userData ? this.userData.userId : this.getUserId
        })
        .catch(err => console.log(err.response.data)) :
        this.$client.http
        .post('/profile/me/verification')
        .catch(err => console.log(err.response.data))
    },
    sendCode() {
      const code = Object.values(this.inputs).join('')
      this.$client.http
        .post(`/auth/registration/${parseInt(code)}`, {
          user_id: this.userData ? this.userData.userId : this.getUserId
        })
        .then(res => {
          localStorage.setItem('jwt', res.data.access_token)
          this.$router.go()
        })
        .catch(err => console.log(err.response.data))
    },
    startInterval() {
      return setInterval(() => {
        this.waitTime = this.waitTime - 1
        if (this.waitTime == 0) {
          this.notRepeatGettingCode = false
          clearInterval(this.interval)
        }
      }, 1000)
    },
    closeWindow() {
      this.$store.dispatch('deleteUser')
    },
  },
  mounted() {
    this.interval = this.startInterval()
  }
}
</script>

<style>
.app-popup-form {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.space-around-popup {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
.app-popup-confirm {
  color: blueviolet;
  width: 70%;
  max-width: 800px;
  padding: 24px;
  border: 3px solid blueviolet;
  border-radius: 12px;
  background: #fff;
}
.app-popup-confirm header {
  font-size: 36px;
  font-weight: bolder;
  text-align: center;
}
.app-popup-confirm h3 {
  margin-top: 24px;
  text-align: center;
}
.app-popup-confirm main {
  margin: 12px 0;
  display: flex;
  justify-content: space-evenly;
} 
.app-popup-confirm main input {
  font-size: 24px;
  width: 32px;
  height: 32px;
  text-align: center;
  background: rgba(138, 43, 226, 0.2);
  border: none;
  border-bottom: 3px solid blueviolet;
}
.app-popup-confirm main input:focus {
  outline: 3px solid blueviolet;
  border-radius: 3px;
}
.app-popup-confirm main input::-webkit-outer-spin-button,
.app-popup-confirm main input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
}
.app-popup-confirm footer {
  display: flex;
  margin-top: 36px;
  justify-content: space-around;
}
.app-popup-confirm footer button {
  border: 3px solid blueviolet;
  color: #fff;
  background: blueviolet;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 18px;
  font-weight: bold;
}
.app-popup-confirm footer button:hover {
  color: blueviolet;
  background: #fff;
}
.app-popup-confirm footer button:active {
  color: #fff;
  background: blueviolet;
}
.disable {
  background: gray !important;
  color: #fff !important;
  border: 3px solid rgba(0, 0, 0, 0) !important;
}
.disable:hover {
  background: gray !important;
  color: #fff !important;
  border: 3px solid rgba(0, 0, 0, 0) !important;
}
</style>