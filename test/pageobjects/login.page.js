import { $ } from '@wdio/globals'
import scrollScreenVertical from '../../helpers/scrollScreenVertical.js'

class LoginPage {
  get usernameInputField() {
    return $('~test-Username')
  }
  get passwordInputField() {
    return $('~test-Password')
  }
  get loginButton() {
    return $('~test-LOGIN')
  }
  get errorMessage() {
    return $('//*[@content-desc="test-Error message"]/android.widget.TextView')
  }
  get titleHomePage() {
    return $('.android.widget.TextView')
  }
  get autoFillUser1() {
    return $('//android.widget.TextView[@text="standard_user"]')
  }
  get autoFillUser2() {
    return $('//android.widget.TextView[@text="locked_out_user"]')
  }
  get autoFillUser3() {
    return $('//android.widget.TextView[@text="problem_user"]')
  }
  get menuButton() {
    return $('~test-Menu')
  }
  get logoutButton() {
    return $('//android.view.ViewGroup[@content-desc="test-LOGOUT"]')
  }

  async inputValidUsername() {
    await this.usernameInputField.setValue('standard_user')
  }
  async inputInvalidUsername() {
    await this.usernameInputField.setValue('user_random')
  }
  async inputValidPassword() {
    await this.passwordInputField.setValue('secret_sauce')
  }
  async inputInvalidPassword() {
    await this.passwordInputField.setValue('pass_random')
  }
  async inputEmpty(field) {
    await field.setValue('')
  }
  async clickLoginButton() {
    await this.loginButton.click()
  }
  async clickAutoFill1() {
    await scrollScreenVertical(600, 100)
    await this.autoFillUser1.click()
  }
  async clickAutoFill2() {
    await scrollScreenVertical(600, 100)
    await this.autoFillUser2.click()
  }
  async clickAutoFill3() {
    await scrollScreenVertical(600, 100)
    await this.autoFillUser3.click()
  }
  async clickMenuButton() {
    await this.menuButton.click()
  }
  async clickLogoutButton() {
    await this.logoutButton.click()
  }
}

export default new LoginPage()
