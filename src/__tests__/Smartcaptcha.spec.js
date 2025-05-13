import smartсaptcha, { WIDGET_ID } from '../smartсaptcha-wrapper'

import Smartcaptcha from '../Smartcaptcha'
import { mount } from '@vue/test-utils'

jest.mock('../smartсaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createWrapper = propsData => {
  return mount(Smartcaptcha, { propsData })
}

describe('Smartcaptcha', () => {
  const wrapper = createWrapper({ sitekey: SITE_KEY })

  it('Should render SmartCAPTCHA', () => {
    expect(smartсaptcha.checkSmartcaptchaLoad).toBeCalled()
    expect(smartсaptcha.render.mock.calls[0][0]).toBe(wrapper.vm.$el)
    expect(smartсaptcha.render.mock.calls[0][1]).toMatchSnapshot('SmartCAPTCHA options')
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
    expect(smartсaptcha.reset).not.toBeCalled()
    wrapper.vm.reset()
    expect(smartсaptcha.reset).toBeCalledWith(WIDGET_ID)

    expect(smartсaptcha.execute).not.toBeCalled()
    wrapper.vm.execute()
    expect(smartсaptcha.execute).toBeCalledWith(WIDGET_ID)
  })

  it('will load smartсaptcha script when `loadSmartсaptchaScript` set to `true`', () => {
    const id = 'SMARTCAPTCHA_SCRIPT_ID'
    createWrapper({
      sitekey: SITE_KEY,
      loadSmartсaptchaScript: true,
      smartсaptchaScriptId: id
    })
    expect(document.getElementById(id)).not.toBe(null)
  })
})
