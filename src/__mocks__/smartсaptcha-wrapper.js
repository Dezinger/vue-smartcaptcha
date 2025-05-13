export const WIDGET_ID = 'widgetId'
const smartCaptchaMock = {
  render: jest.fn(() => WIDGET_ID),
  reset: jest.fn()
}

export default {
  getSmartcaptcha: jest.fn(() => Promise.resolve(smartCaptchaMock)),
  render: jest.fn((...args) => args[args.length - 1](WIDGET_ID)),
  reset: jest.fn(),
  execute: jest.fn(),
  checkSmartcaptchaLoad: jest.fn(),
  assertSmartcaptchaLoad: jest.fn()
}
