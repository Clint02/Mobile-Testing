import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productPage from '../pageobjects/product.page.js'
import scrollScreenVertical from '../../helpers/scrollScreenVertical.js'
import cartPage from '../pageobjects/cart.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'

describe('SWAG LABS CART PAGE', () => {
  before(async () => {
    await loginPage.inputValidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()
    await productPage.clickAddToCartButton(2)
    await productPage.clickCartButton()
  })

  after(async () => {
    await productPage.clickMenuButton()
    await productPage.clickLogoutButton()
  })

  //CHECK AGAIN
  it('should verify product removed from cart', async () => {
    await cartPage.clickRemoveButton()
    const count = await cartPage.getCartItemsCount2()
    expect(count).toBe(0)
  })

  it('should proceed to checkout', async () => {
    await scrollScreenVertical(400, 100)
    await cartPage.clickCheckoutButton()

    //ASSERT
    await expect(checkoutPage.titleCheckoutPage).toHaveText(
      'CHECKOUT: INFORMATION',
    )
  })
})
