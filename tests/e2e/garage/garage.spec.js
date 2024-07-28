import {test, expect} from '../../../src/fixtures/userFixtures.js';


test.describe('Garage (fixtures)', ()=>{
    test('Add car button is visible', async ({garagePage, page})=>{
        await expect(garagePage.addCarButton).toBeVisible()
        await garagePage.addCarButton.click()

        const brand = 'Audi'
        const model = 'R8'

        await page.locator("#addCarBrand").selectOption(brand)
        await page.locator("#addCarModel").selectOption(model)
        await page.locator("#addCarMileage").fill('123')
        await page.locator('.modal-content  .btn-primary').click()

        await page.waitForTimeout(2000)
        const guestData = await page.evaluate(()=> window.sessionStorage.getItem('guestData'))
        await page.pause()
        console.log(guestData)
        const parsedGuestData = JSON.parse(guestData)

        // expect(parsedGuestData.cars.length).toBe(1)
        console.log(parsedGuestData)
        const car = parsedGuestData.cars[0]
        expect(car.brand).toBe(brand)
        expect(car.model).toBe(model)


    })
})