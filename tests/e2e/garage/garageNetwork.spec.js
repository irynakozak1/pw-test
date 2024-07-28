import {test} from '../../../src/fixtures/guestFixtures.js';
import {BRANDS_MOCK_RESPONSE} from "./fixtures/brands.js";
import {MODELS_MOCK_BY_ID} from "./fixtures/models.js";


test.describe('Network', () => {
    test('Network', async({garagePage, page}) => {
       await page.route('/api/cars/brands', async (route)=>{
           await route.fulfill({
               status: 200,
               body: JSON.stringify(BRANDS_MOCK_RESPONSE)
           })
       })

       await page.route('/api/cars/models?carBrandId=*', async (route, request)=>{
           const url = new URL(request.url())
           const {searchParams} = url
           const body = JSON.stringify(MODELS_MOCK_BY_ID[searchParams.get('carBrandId')])
           await route.fulfill({
               status: 200,
               body
           })

       })

        await garagePage.addCarButton.click()
        await page.pause()
    })

    // test('Network2', async ({garagePage, page})=>{
    //     await page.route('')
    // })
})