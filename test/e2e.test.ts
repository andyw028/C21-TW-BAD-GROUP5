import { Page, chromium } from 'playwright'

describe('Login', () => {
	let page: Page
	beforeAll(async () => {
		const browser = await chromium.launch()
		page = await browser.newPage()
	})

	test('Title is pocketmon', async () => {
		await page.goto('https://samor.me')
		const title = await page.title()
		expect(title).toContain('Pocketmon')
	})

	test('login success', async () => {
		// Go to https://samor.me/
		await page.goto('https://samor.me/')
		// Click text=Log In
		await page.locator('text=Log In').click()
		let login = await page.title()
		expect(login).toContain('Pocketmon Login')
		// Click text=Forgot password? Submit Don't have an account? Sigup here >> [placeholder="Enter your username"]
		await page
			.locator(
				'text=Forgot password? Submit Don\'t have an account? Sigup here >> [placeholder="Enter your username"]'
			)
			.click()
		// Fill text=Forgot password? Submit Don't have an account? Sigup here >> [placeholder="Enter your username"]
		await page
			.locator(
				'text=Forgot password? Submit Don\'t have an account? Sigup here >> [placeholder="Enter your username"]'
			)
			.fill('admin')
		// Press Tab
		await page
			.locator(
				'text=Forgot password? Submit Don\'t have an account? Sigup here >> [placeholder="Enter your username"]'
			)
			.press('Tab')
		// Click text=Forgot password? Submit Don't have an account? Sigup here >> [placeholder="Enter your password"]
		await page
			.locator(
				'text=Forgot password? Submit Don\'t have an account? Sigup here >> [placeholder="Enter your password"]'
			)
			.click()
		// Fill text=Forgot password? Submit Don't have an account? Sigup here >> [placeholder="Enter your password"]
		await page
			.locator(
				'text=Forgot password? Submit Don\'t have an account? Sigup here >> [placeholder="Enter your password"]'
			)
			.fill('1234')
		// Click text=Forgot password? Submit Don't have an account? Sigup here >> input[type="submit"]
		await page
			.locator(
				'text=Forgot password? Submit Don\'t have an account? Sigup here >> input[type="submit"]'
			)
			.click()
		// Click text=OK
		await page.locator('text=OK').click()
		let dashboard = await page.title()
		expect(dashboard).toContain('Dashboard')
	})
	afterAll(() => {})
})
