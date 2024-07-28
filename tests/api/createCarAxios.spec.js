import {test, expect} from "../../src/fixtures/userFixtures.js";
import {BRANDS} from "../../src/data/brands.js";
import {MODELS} from "../../src/data/models.js";
import axios from "axios";
import users from "../../src/data/users.js";


test.describe('Create all cars', ()=>{
    let request

    test.beforeAll(async ()=>{
        const loginResponse = await axios.post('https://qauto.forstudy.space/api/auth/signin', {
                "email": users.IRYNA_KOZAK.email,
                "password": users.IRYNA_KOZAK.password,
                "remember": false
        })

        const cookie = loginResponse.headers.get('set-cookie')[0].split(';')[0]

        request = axios.create({
            baseURL: 'https://qauto.forstudy.space/',
            headers: {
                "Cookie": cookie
            },
            validateStatus: (status) => {
                return status <= 500
            }
        })
    })
    test.afterAll(async ()=>{
        const carsResponse = await request.get('/api/cars')
        const cars = await carsResponse.data

        await Promise.all(
            cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
        )

    })
    test('Create all cars', async () => {
        const brand = BRANDS.Audi
        for (const model of Object.values(MODELS[brand.id])) {

            await test.step('Test step with ', async ()=> {
                const response = await request.post('/api/cars', {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100)
                })
                const body = response.data
                expect(response.status()).toBe(201)

                expect(body.status).toBe('ok')
            })

        }


    })

    test.only('car', async () => {
        for (const brand of Object.values(BRANDS)) {
            for (const model of Object.values(MODELS[brand.id])) {
                const response = await request.post('/api/cars', {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100)

                })
                const body = response.data
                expect(response.status).toBe(201)

                expect(body.status).toBe('ok')
            }
        }
    })
})