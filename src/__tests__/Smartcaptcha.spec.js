import smartcaptcha, { WIDGET_ID } from '../smartcaptcha-wrapper'

import Smartcaptcha from '../Smartcaptcha'
import { mount } from '@vue/test-utils'

jest.mock('../smartcaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createWrapper = propsData => {
  return mount(Smartcaptcha, { propsData })
}

describe('Smartcaptcha', () => {
  const wrapper = createWrapper({ sitekey: SITE_KEY })

  it('Should render SmartCAPTCHA', () => {
    expect(smartcaptcha.checkSmartcaptchaLoad).toBeCalled()
    expect(smartcaptcha.render.mock.calls[0][0]).toBe(wrapper.vm.$el)
    expect(smartcaptcha.render.mock.calls[0][1]).toMatchSnapshot('SmartCAPTCHA options')
  })

  /*
  it('Emit events', () => {
    expect(wrapper.emitted()).not.toContainKey('verify')
    wrapper.vm.emitVerify()
    expect(wrapper.emitted().verify).toBeTruthy()

    expect(wrapper.emitted()).not.toContainKey('expired')
    wrapper.vm.emitExpired()
    expect(wrapper.emitted().expired).toBeTruthy()
  })
  */
  it('Can reset/execute', () => {
    expect(smartcaptcha.reset).not.toBeCalled()
    wrapper.vm.reset()
    expect(smartcaptcha.reset).toBeCalledWith(WIDGET_ID)

    expect(smartcaptcha.execute).not.toBeCalled()
    wrapper.vm.execute()
    expect(smartcaptcha.execute).toBeCalledWith(WIDGET_ID)
  })

  it('will load smartcaptcha script when `loadSmartcaptchaScript` set to `true`', () => {
    const id = 'SMARTCAPTCHA_SCRIPT_ID'
    createWrapper({
      sitekey: SITE_KEY,
      loadSmartcaptchaScript: true,
      smartcaptchaScriptId: id
    })
    expect(document.getElementById(id)).not.toBe(null)
  })
})
