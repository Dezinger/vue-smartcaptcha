import smartсaptcha, { createSmartcaptcha } from '../smartсaptcha-wrapper'

const WIDGET_ID = 'widgetId'
function createMock () {
  return {
    render: jest.fn(() => WIDGET_ID),
    reset: jest.fn(),
    execute: jest.fn()
  }
}

describe('smartсaptcha', () => {
  describe('#createSmartcaptcha', () => {
    let ins
    let smartсaptchaMock

    beforeEach(() => {
      smartсaptchaMock = createMock()
      ins = createSmartcaptcha()
      window.smartCaptcha = smartсaptchaMock
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
      describe('When smartсaptcha not loaded', () => {
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
          expect(smartсaptchaMock.render).toBeCalled()
          expect(widgetId).toBe(WIDGET_ID)
        })
      })
    })

    describe('#reset', () => {
      describe('When pass widget id', () => {
        it('Reset SmartCAPTCHA', () => {
          ins.reset(WIDGET_ID)

          expect(smartсaptchaMock.reset).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.reset()

          expect(smartсaptchaMock.reset).not.toBeCalled()
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

          expect(smartсaptchaMock.execute).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.execute()

          expect(smartсaptchaMock.execute).not.toBeCalled()
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
      expect(() => smartсaptcha.assertLoaded()).not.toThrow()
    })
  })
})
