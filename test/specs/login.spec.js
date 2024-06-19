import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productPage from '../pageobjects/product.page.js'
import scrollScreenVertical from '../../helpers/scrollScreenVertical.js'

describe('SWAG LABS LOGIN PAGE', () => {
  after(async () => {
    await productPage.clickMenuButton()
    await productPage.clickLogoutButton()
  })

  it('should failed when login with all empty field', async () => {
    //ACTION
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText('Username is required')
  })

  it('should failed when login with empty username field', async () => {
    //ACTIONS
    await loginPage.usernameInputField.clearValue()
    await loginPage.inputInvalidPassword()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText('Username is required')
  })

  it('should failed when login with empty password field', async () => {
    //ACTIONS
    await loginPage.inputInvalidUsername()
    await loginPage.passwordInputField.clearValue()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText('Password is required')
  })

  it('should failed when login with invalid username but valid password', async () => {
    //ACTIONS
    await loginPage.inputInvalidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('should failed when login with valid username but invalid password', async () => {
    //ACTIONS
    await loginPage.inputValidUsername()
    await loginPage.inputInvalidPassword()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('should handle case sensitivity on username', async () => {
    //ACTIONS
    await loginPage.inputCustomLogin('STANDARD_USER', 'secret_sauce')
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('should handle case sensitivity on password', async () => {
    //ACTIONS
    await loginPage.inputCustomLogin('standard_user', 'SECRET_SAUCE')
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('should failed because it did not trim whitespace from username', async () => {
    //ACTIONS
    await loginPage.inputCustomLogin(' standard_user ', 'secret_sauce')
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('should failed because it did not trim whitespace from password', async () => {
    //ACTIONS
    await loginPage.inputCustomLogin('standard_user', ' secret_sauce ')
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('should reset login form after logout', async () => {
    //ACTIONS
    await loginPage.inputValidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()
    await productPage.clickMenuButton()
    await productPage.clickLogoutButton()

    //ASSERT
    const username = await loginPage.usernameInputField.getText()
    expect(username).toBe('Username')
    const password = await loginPage.passwordInputField.getText()
    expect(password).toBe('Password')
  })

  it('should succeed when login with valid username and password', async () => {
    //ACTIONS
    await loginPage.inputValidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(productPage.titleProductPage).toHaveText('PRODUCTS')
  })

  it('should succeed when login with autofill 3', async () => {
    //ACTIONS
    await productPage.clickMenuButton()
    await productPage.clickLogoutButton()
    await loginPage.clickAutoFill3()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(productPage.titleProductPage).toHaveText('PRODUCTS')
  })

  it('should failed when login with autofill 2', async () => {
    //ACTIONS
    await productPage.clickMenuButton()
    await productPage.clickLogoutButton()
    await loginPage.clickAutoFill2()
    await loginPage.clickLoginButton()
    await scrollScreenVertical(100, 600)

    //ASSERT
    await expect(loginPage.errorMessage).toHaveText(
      'Sorry, this user has been locked out.',
    )
  })

  it('should succeed when login with autofill 1', async () => {
    //ACTIONS
    await loginPage.clickAutoFill1()
    await loginPage.clickLoginButton()

    //ASSERT
    await expect(productPage.titleProductPage).toHaveText('PRODUCTS')
  })
})
