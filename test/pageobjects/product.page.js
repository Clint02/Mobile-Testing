import { $ } from '@wdio/globals'

class ProductPage {
  get menuButton() {
    return $('~test-Menu')
  }
  get allItemsButton() {
    return $('~test-ALL ITEMS')
  }
  get logoutButton() {
    return $('~test-LOGOUT')
  }
  get cartButton() {
    return $('~test-Cart')
  }
  get titleProductPage() {
    return $('//*[@text="PRODUCTS"]')
  }
  get toggleButton() {
    return $('~test-Toggle')
  }
  get sortButton() {
    return $('~test-Modal Selector Button')
  }
  get sortText() {
    return $('//*[@text="Sort items by..."]')
  }
  get sortOption1() {
    return $('//*[@text="Name (A to Z)"]')
  }
  get sortOption2() {
    return $('//*[@text="Name (Z to A)"]')
  }
  get sortOption3() {
    return $('//*[@text="Price (low to high)"]')
  }
  get sortOption4() {
    return $('//*[@text="Price (high to low)"]')
  }
  get productListTitle() {
    return $$('//*[@content-desc="test-Item title"]')
  }
  get productListPrice() {
    return $$('//*[@content-desc="test-Price"]')
  }
  get firstProduct() {
    return $('(//*[@content-desc="test-Item"])[1]')
  }
  get firstTitleProduct() {
    return $('(//*[@content-desc="test-Item title"])[1]')
  }
  get secondTitleProduct() {
    return $('(//*[@content-desc="test-Item title"])[2]')
  }
  addToCartButton(index) {
    return $(`(//*[@content-desc="test-ADD TO CART"])[${index}]`)
  }

  async clickMenuButton() {
    await this.menuButton.click()
  }
  async clickAllItems() {
    await this.allItemsButton.click()
  }
  async clickLogoutButton() {
    await this.logoutButton.click()
  }
  async clickCartButton() {
    await this.cartButton.click()
  }
  async clickToggleButton() {
    await this.toggleButton.click()
  }
  async getProductsCount1() {
    const productsCount = await this.productListTitle
    return productsCount.length
  }
  async getProductsCount2() {
    await this.clickToggleButton()
    const productsCount = await this.productListTitle
    return productsCount.length
  }
  async openFirstProduct() {
    await this.firstProduct.click()
  }
  async clickAddToCartButton(option) {
    await this.addToCartButton(option).click()
  }
}

export default new ProductPage()
