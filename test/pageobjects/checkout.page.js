import { $ } from '@wdio/globals'

class CheckoutPage {
  get titleCheckoutPage() {
    return $('//*[@text="CHECKOUT: INFORMATION"]')
  }
}

export default new CheckoutPage()
