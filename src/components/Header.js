import BaseComponent from "./BaseComponent.js";

export default class Header extends BaseComponent {
    constructor(page) {
        super(page, page.locator('header'));
        this.signInButton = page.locator('.btn.header_signin')
        this.guestLoginButton = page.locator('.header-link.-guest')
    }
}

// export default class Header {
//     constructor(page) {
//         this._page = page
//         this.signInButton = page.locator('.btn.header_signin')
//     }
// }