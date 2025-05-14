import VueSmartcaptcha from '../../src'
import { mount } from '@vue/test-utils'

const WIDGET_ID = 'widgetId'

function createMock () {
  return {
    render: jest.fn(function (ele, options) {
      // Save the callback
      this._verify = options.callback
      return WIDGET_ID
    }),
    execute: jest.fn(function () {
      this._verify()
    }),
    reset: jest.fn()
  }
}

describe('Example spec', () => {
  let wrapper
  let verify
  beforeEach(() => {
    window.smartCaptcha = createMock()
    verify = jest.fn()
    wrapper = mount(VueSmartcaptcha, {
      propsData: { sitekey: 'sitekey' }
    })
    wrapper.vm.$on('verify', verify)
  })

  it('Should render smartcaptcha', () => {
    expect(window.smartCaptcha.render).toBeCalled()
    expect(wrapper.vm.$widgetId).toBe(WIDGET_ID)
  })

  it('Should call execute', () => {
    wrapper.vm.execute()
    expect(window.smartCaptcha.execute).toBeCalledWith(WIDGET_ID)
  })

  it('Should call reset', () => {
    wrapper.vm.reset()
    expect(window.smartCaptcha.reset).toBeCalledWith(WIDGET_ID)
  })

  it('Should emit verify', () => {
    window.smartCaptcha._verify()
    expect(verify).toBeCalled()
  })
})
