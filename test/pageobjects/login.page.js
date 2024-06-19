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
  get autoFillUser1() {
    return $('~test-standard_user')
  }
  get autoFillUser2() {
    return $('~test-locked_out_user')
  }
  get autoFillUser3() {
    return $('~test-problem_user')
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

  async inputCustomLogin(username, password) {
    await this.usernameInputField.setValue(username)
    await this.passwordInputField.setValue(password)
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
}

export default new LoginPage()
