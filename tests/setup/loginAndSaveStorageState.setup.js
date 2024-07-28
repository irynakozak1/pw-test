import {expect, test as setup} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import SignInModal from "../../src/pageObjects/WelcomePage/components/SignInModal.js";
import users from "../../src/data/users.js";
import {USER_IRA_STORAGE_STATE_PATH} from "../../src/components/constants.js";


setup.describe('Setup', ()=>{
    setup('Setup', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const signInPopup = await welcomePage.openSignInPopup()
        await signInPopup.emailInput.fill(users.IRYNA_KOZAK.email)
        await signInPopup.passwordInput.fill(users.IRYNA_KOZAK.password)
        await signInPopup.logInButton.click()

        await expect(page).toHaveURL(/garage/)

        await page.context().storageState({
            path: USER_IRA_STORAGE_STATE_PATH
        })
    })

})