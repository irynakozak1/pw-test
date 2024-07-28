import BaseComponent from "../../../components/BaseComponent.js";


export default class SignInModal extends BaseComponent {
    _emailInputSelector = '#signinEmail'
    _passwordInputSelector = '#signinPassword'

    constructor(page) {
        super(page, page.locator('app-signin-modal'));
        this.emailInput = this.container.locator(this._emailInputSelector)
        this.passwordInput = this.container.locator(this._passwordInputSelector)
        this.logInButton = this.container.locator('.btn-primary')
    }
}