import {test, expect, request as apiRequest} from "../../src/fixtures/userFixtures.js";
import {BRANDS} from "../../src/data/brands.js";
import {MODELS} from "../../src/data/models.js";
import {USER_IRA_STORAGE_STATE_PATH} from "../../src/components/constants.js";


test.describe('Create all cars', ()=>{
    test.afterAll(async ()=>{
        const request = await apiRequest.newContext({
            storageState: USER_IRA_STORAGE_STATE_PATH
        })

        const carsResponse = await request.get('/api/cars')
        const cars = await carsResponse.json()

        await Promise.all(
            cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
        )

    })
    test('Create all cars', async ({request}) => {
        const brand = BRANDS.Audi
        for (const model of Object.values(MODELS[brand.id])) {

            await test.step('Test step with ', async ()=> {
                const response = await request.post('/api/cars', {
                    data: {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }

                })
                const body = await response.json()
                expect(response.status()).toBe(201)

                expect(body.status).toBe('ok')
            })

        }


    })

    test('car', async ({request}) => {
        for (const brand of Object.values(BRANDS)) {
            for (const model of Object.values(MODELS[brand.id])) {
                const response = await request.post('/api/cars', {
                    data: {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }

                })
                const body = await response.json()
                await expect(response).toBeOK()
                expect(response.status()).toBe(201)

                expect(body.status).toBe('ok')
            }
        }
    })
})