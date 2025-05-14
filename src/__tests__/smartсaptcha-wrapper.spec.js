import smartcaptcha, { createSmartcaptcha } from '../smartcaptcha-wrapper'

const WIDGET_ID = 'widgetId'
function createMock () {
  return {
    render: jest.fn(() => WIDGET_ID),
    reset: jest.fn(),
    execute: jest.fn()
  }
}

describe('smartcaptcha', () => {
  describe('#createSmartcaptcha', () => {
    let ins
    let smartcaptchaMock

    beforeEach(() => {
      smartcaptchaMock = createMock()
      ins = createSmartcaptcha()
      window.smartCaptcha = smartcaptchaMock
    })

    afterEach(() => delete window.smartCaptcha)

    describe('#assertLoaded', () => {
      describe('When SmartCAPTCHA not loaded', () => {
        it('Throw error', () => {
          expect(() => {
            ins.assertLoaded()
          }).toThrow()
        })
      })

      describe('When SmartCAPTCHA loaded', () => {
        it('Not throw error', () => {
          ins.notify()

          expect(() => {
            ins.assertLoaded()
          }).not.toThrow()
        })
      })
    })

    describe('#checkSmartcaptchaLoad', () => {
      describe('When SmartCAPTCHA not loaded', () => {
        beforeEach(() => {
          delete window.smartCaptcha
        })

        it('Not load SmartCAPTCHA into it', () => {
          ins.checkSmartcaptchaLoad()
          expect(() => {
            ins.assertLoaded()
          }).toThrow()
        })
      })

      describe('When SmartCAPTCHA loaded', () => {
        it('Load SmartCAPTCHA', () => {
          ins.checkSmartcaptchaLoad()

          expect(() => {
            ins.assertLoaded()
          }).not.toThrow()
        })
      })
    })

    describe('#wait', () => {
      describe('When smartcaptcha not loaded', () => {
        it('Return defered object', () => {
          const spy = jest.fn()
          // Since it return thenable, not Promise. Here must wrap it as Promise
          const promise = Promise.resolve(ins.wait()).then(spy)
          expect(spy).not.toHaveBeenCalled()
          ins.notify()
          return promise.then(() => {
            expect(spy).toHaveBeenCalled()
          })
        })
      })
    })

    describe('#notify', () => {
      it('Resolve the deferred', () => {
        ins.notify()
        return Promise.resolve(ins.wait())
      })
    })

    describe('#render', () => {
      it('Render SmartCAPTCHA', () => {
        const ele = document.createElement('div')
        const sitekey = 'foo'

        ins.notify()

        return ins.render(ele, { sitekey }, widgetId => {
          expect(smartcaptchaMock.render).toBeCalled()
          expect(widgetId).toBe(WIDGET_ID)
        })
      })
    })

    describe('#reset', () => {
      describe('When pass widget id', () => {
        it('Reset SmartCAPTCHA', () => {
          ins.reset(WIDGET_ID)

          expect(smartcaptchaMock.reset).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.reset()

          expect(smartcaptchaMock.reset).not.toBeCalled()
        })
      })

      beforeEach(() => {
        jest.resetAllMocks()
        ins.notify()
      })
    })

    describe('#execute', () => {
      describe('When pass widget id', () => {
        it('Execute SmartCAPTCHA', () => {
          ins.execute(WIDGET_ID)

          expect(smartcaptchaMock.execute).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.execute()

          expect(smartcaptchaMock.execute).not.toBeCalled()
        })
      })

      beforeEach(() => {
        ins.notify()
      })
    })
  })

  describe('window.vueSmartcaptchaApiLoaded', () => {
    it('Load smartCaptcha', () => {
      window.vueSmartcaptchaApiLoaded()
      expect(() => smartcaptcha.assertLoaded()).not.toThrow()
    })
  })
})
