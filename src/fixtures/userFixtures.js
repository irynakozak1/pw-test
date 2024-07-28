import {test as base, expect as baseExpect, request as baseRequest} from '@playwright/test'
import {USER_IRA_STORAGE_STATE_PATH} from "../components/constants.js";
import GaragePage from "../pageObjects/Garagepage/GaragePage.js";
import WelcomePage from "../pageObjects/WelcomePage/WelcomePage.js";

export const test = base.extend({
    welcomePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    request: async ({}, use)=>{
        const req = await request.newContext({
            storageState: USER_IRA_STORAGE_STATE_PATH
        })
        await use(req)

        await req.dispose()

    },
    page: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: USER_IRA_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()
        await use(page)

        await ctx.close()
    },
    garagePage: async ({page}, use)=>{
        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)
    },
})

export const expect = baseExpect
export const request = baseRequest