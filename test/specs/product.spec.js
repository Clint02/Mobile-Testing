import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productPage from '../pageobjects/product.page.js'
import scrollScreenVertical from '../../helpers/scrollScreenVertical.js'
import productDetailPage from '../pageobjects/productDetail.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('SWAG LABS PRODUCT PAGE', () => {
  before(async () => {
    await loginPage.inputValidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()
  })

  after(async () => {
    await productPage.clickMenuButton()
    await productPage.clickLogoutButton()
  })

  it('should display products when navigated from menu', async () => {
    //ACTIONS
    await productPage.clickMenuButton()
    await productPage.clickAllItems()

    //ASSERT
    await expect(productPage.titleProductPage).toHaveText('PRODUCTS')
  })

  it('should list all products', async () => {
    //ACTIONS
    const productCount1 = await productPage.getProductsCount2()
    await scrollScreenVertical(1000, 100)
    const productCount2 = await productPage.getProductsCount2()
    const totalProductCount = productCount1 + productCount2

    //ASSERT
    await expect(totalProductCount).toBeGreaterThan(0)
  })

  it('should open cart', async () => {
    //ACTION
    await productPage.clickCartButton()

    //ASSERT
    await expect(cartPage.titleCartPage).toHaveText('YOUR CART')

    //ACTION
    await cartPage.clickBackShopping()
  })

  it('should change layout view', async () => {
    //ACTIONS
    const productCount1 = await productPage.getProductsCount1()
    const productCount2 = await productPage.getProductsCount2()

    //ASSERT
    await expect(productCount2).toBeGreaterThan(productCount1)
  })

  //SORTING STILL MANUAL NEED UPDATE LATER
  //FROM HERE
  it('should sort products by price (high to low)', async () => {
    //ACTIONS
    await productPage.sortButton.click()
    await productPage.sortOption4.click()

    //DEBUG
    const checkFirstProduct = await productPage.firstTitleProduct.getText()
    console.log(checkFirstProduct)
    const checkSecondProduct = await productPage.secondTitleProduct.getText()
    console.log(checkSecondProduct)

    //ASSERT
    await expect(productPage.firstTitleProduct).toHaveText(
      'Sauce Labs Fleece Jacket',
    )
    await expect(productPage.secondTitleProduct).toHaveText(
      'Sauce Labs Backpack',
    )
  })

  it('should sort products by price (low to high)', async () => {
    //ACTIONS
    await productPage.sortButton.click()
    await productPage.sortOption3.click()

    //ASSERT
    await expect(productPage.firstTitleProduct).toHaveText('Sauce Labs Onesie')
    await expect(productPage.secondTitleProduct).toHaveText(
      'Sauce Labs Bike Light',
    )
  })

  it('should sort products by name (Z-A)', async () => {
    //ACTIONS
    await productPage.sortButton.click()
    await productPage.sortOption2.click()

    //ASSERT
    await expect(productPage.firstTitleProduct).toHaveText(
      expect.stringContaining('T-Shirt'),
    )
    await expect(productPage.secondTitleProduct).toHaveText('Sauce Labs Onesie')
  })

  it('should sort products by name (A-Z)', async () => {
    //ACTIONS
    await productPage.sortButton.click()
    await productPage.sortOption1.click()

    //ASSERT
    await expect(productPage.firstTitleProduct).toHaveText(
      'Sauce Labs Backpack',
    )
    await expect(productPage.secondTitleProduct).toHaveText(
      'Sauce Labs Bike Light',
    )
  })
  //UNTIL HERE

  //STILL NEED UPDATED ABOUT THE CART SELECTOR
  it('should verify product added to cart', async () => {
    const count = await cartPage.getCartItemsCount2()

    //ASSERT
    await expect(count).toBe(2)
  })

  it('should open first product details', async () => {
    //ACTION
    await productPage.openFirstProduct()

    //DEBUG
    const tes = await productDetailPage.productDesc.getText()
    console.log(tes)

    //ASSERT
    await expect(productDetailPage.productDesc).toHaveText(
      expect.stringContaining('streamlined Sly Pack'),
    )
  })
})
