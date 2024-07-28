import {test} from "@playwright/test";


test('page in new tab', async ({page}) => {
    await page.goto('https://translate.google.com/?sl=pl&tl=uk&op=websites')
    // await page.pause()
    await page.getByRole('button', { name: 'Accept all' }).click()
    await page.locator("input[type='url']").fill('https://www.google.com/')
    // await page.pause()
    await page.getByLabel('Translate website').click()
})