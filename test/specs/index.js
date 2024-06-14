import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import scrollScreenVertical from '../../helpers/scrollScreenVertical.js'

describe('SWAG LABS LOGIN PAGE', () => {
  it('Login with all empty field', async () => {
    await loginPage.clickLoginButton()

    await expect(loginPage.errorMessage).toHaveText('Username is required')
  })

  it('Login with empty username field', async () => {
    await loginPage.inputEmpty(loginPage.usernameInputField)
    await loginPage.inputInvalidPassword()
    await loginPage.clickLoginButton()

    await expect(loginPage.errorMessage).toHaveText('Username is required')
  })

  it('Login with empty password field', async () => {
    await loginPage.inputInvalidUsername()
    await loginPage.inputEmpty(loginPage.passwordInputField)
    await loginPage.clickLoginButton()

    await expect(loginPage.errorMessage).toHaveText('Password is required')
  })

  it('Login with invalid username but valid password', async () => {
    await loginPage.inputInvalidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()

    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('Login with valid username but invalid password', async () => {
    await loginPage.inputValidUsername()
    await loginPage.inputInvalidPassword()
    await loginPage.clickLoginButton()

    await expect(loginPage.errorMessage).toHaveText(
      'Username and password do not match any user in this service.',
    )
  })

  it('Login with valid username and password', async () => {
    await loginPage.inputValidUsername()
    await loginPage.inputValidPassword()
    await loginPage.clickLoginButton()
    await expect(loginPage.titleHomePage).toHaveText('PRODUCTS')
  })

  it('Login with autofill 3', async () => {
    await loginPage.clickMenuButton()
    await loginPage.clickLogoutButton()
    await loginPage.clickAutoFill3()
    await loginPage.clickLoginButton()
    await expect(loginPage.titleHomePage).toHaveText('PRODUCTS')
  })

  it('Login with autofill 2', async () => {
    await loginPage.clickMenuButton()
    await loginPage.clickLogoutButton()
    await loginPage.clickAutoFill2()
    await loginPage.clickLoginButton()
    await scrollScreenVertical(100, 600)
    await expect(loginPage.errorMessage).toHaveText(
      'Sorry, this user has been locked out.',
    )
  })

  it('Login with autofill 1', async () => {
    await loginPage.clickAutoFill1()
    await loginPage.clickLoginButton()
    await expect(loginPage.titleHomePage).toHaveText('PRODUCTS')
  })
})
