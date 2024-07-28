import {expect, test} from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import users from "../../../src/data/users.js";

test.describe('Positive scenarios', () => {
    let popup
    test.beforeEach(async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        popup = await welcomePage.openSignInPopup()

        await popup.waitLoaded()
    })

    test('Sign In', async ({page})=>{
        await popup.emailInput.fill(users.IRYNA_KOZAK.email)
        await popup.passwordInput.fill(users.IRYNA_KOZAK.password)
        await popup.logInButton.click()

        // await page.pause()

        await expect(page).toHaveURL('/panel/garage')
    })
})