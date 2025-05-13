import Vue from 'vue'
import VueSmartcaptcha from '../'

const app = new Vue({
  render (h) {
    return h(VueSmartcaptcha, {props: {sitekey: 'foo'}})
  }
})
