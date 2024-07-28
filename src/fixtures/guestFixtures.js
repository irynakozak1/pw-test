import {expect as baseExpect, test as base} from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import WelcomePage from "../pageObjects/WelcomePage/WelcomePage.js";

export const test = base.extend({
    welcomePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    garagePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        await welcomePage.loginAsGuest()

        await expect(page).toHaveURL(/garage/)

        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)
    },
})

export const expect = baseExpect