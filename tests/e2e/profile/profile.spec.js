import {test} from '../../../src/fixtures/userFixtures.js';


test.describe('Profile', ()=>{
    test('profile', async ({garagePage, page})=>{
        // const body = {
        //     "status": "ok",
        //     "data": {
        //         "userId": 111410,
        //         "photoFilename": "default-user.png",
        //         "name": "Test",
        //         "lastName": "Testovich"
        //     }
        // }
        await page.route('api/users/profile', async (route)=>{
            await route.fulfill({
                body: JSON.stringify({
                    "status": "ok",
                    "data": {
                        "userId": 111410,
                        "photoFilename": "default-user.png",
                        "name": "Test",
                        "lastName": "Testovich"
                    }
                })
            })
        })

        await page.locator(".sidebar_btn-group a[routerlink='profile']").click()
        await page.pause()


    })

})