import {test, expect, request as apiRequest} from '../../src/fixtures/userFixtures.js';


test.describe('Cars api', ()=>{
    test('Cars api', async ({request}) => {
        const response = await request.get('/api/cars/brands')
        const body = await response.json()

        console.log(body)
    })

    test('Cars user', async ({request}) => {
        const response = await request.get('/api/cars')
        await expect(response).toBeOK()

        const body = await response.json()

        console.log(body)
    })

    test('Cars user 1', async () => {
        const request = await apiRequest.newContext()
        const response = await request.get('/api/cars')
        await expect(response).not.toBeOK()
        expect(response.status()).toBe(401)

        console.log(await response.json())
        const body = await response.json()
        expect(body.status).toEqual('error')
    })
})