import BasePage from "../BasePage.js";
import SignInModal from "./components/SignInModal.js";
import GaragePage from "../Garagepage/GaragePage.js";


export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/');
    }

    async openSignInPopup(){
        await this.header.signInButton.click()
        return new SignInModal(this._page)
    }

    async loginAsGuest(){
        await this.header.guestLoginButton.click()
        return new GaragePage(this._page)
    }
}