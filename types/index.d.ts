import Vue from 'vue'

declare class VueSmartcaptcha extends Vue {
  sitekey: string
  hl: string
  test: boolean
  webview: boolean
  invisible: boolean
  shieldPosition?: string
  hideShield?: boolean

  reset(): void
  execute(): void
}

export default VueSmartcaptcha
