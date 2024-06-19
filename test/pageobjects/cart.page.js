import { $ } from '@wdio/globals'
import productPage from '../pageobjects/product.page.js'

class CartPage {
  get titleCartPage() {
    return $('//*[@text="YOUR CART"]')
  }
  //NEED UPDATE LATER
  get cartItems() {
    return $$('//*[@content-desc="test-Item"]')
  }
  get checkoutButton() {
    return $('~test-CHECKOUT')
  }
  get backShopping() {
    return $('~test-CONTINUE SHOPPING')
  }
  get removeButton() {
    return $('~test-REMOVE')
  }

  async clickBackShopping() {
    await this.backShopping.click()
  }
  async clickCheckoutButton() {
    await this.checkoutButton.click()
  }
  async clickRemoveButton() {
    await this.removeButton.click()
  }
  async getCartItemsCount() {
    await productPage.clickAddToCartButton(2)
    await productPage.clickAddToCartButton(1)
    await productPage.clickCartButton()
    const cartItemsCount = await this.cartItems
    return cartItemsCount.length
  }

  //CHECK AGAIN
  get cartItems2() {
    return $$('//*[@content-desc="test-Description"]')
  }
  async getCartItemsCount2() {
    const cartItemsCount = await this.cartItems2
    return cartItemsCount.length
  }
}

export default new CartPage()
