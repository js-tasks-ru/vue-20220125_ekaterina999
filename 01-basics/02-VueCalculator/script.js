import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  data() {
    return {
      firstNum: 0,
      secondNum: 0,
      operation: '',
    };
  },

  computed: {
    countSum() {
      let res = 0;

      if (this.operation === 'sum') {
        res = this.firstNum + this.secondNum;
      }

      if (this.operation === 'subtract') {
        res = this.firstNum - this.secondNum;
      }

      if (this.operation === 'multiply') {
        res = this.firstNum * this.secondNum;
      }

      if (this.operation === 'divide') {
        res = this.firstNum / this.secondNum;
      }

      return res;
    },
  },
}).mount('#app');
