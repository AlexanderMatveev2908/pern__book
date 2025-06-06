// Here's a categorized cheat sheet with commonly used methods grouped by purpose — including some useful .getByRole queries, assertions, interactions, and waiting.

// 🧭 ELEMENT LOCATORS
// ts
// Copy
// Edit
// page.locator('css=selector')       // Generic CSS
// page.locator('//xpath')            // XPath
// page.getByRole('button')           // ARIA role
// page.getByLabel('Email')           // <label for="">
// page.getByPlaceholder('Email')     // Placeholder text
// page.getByText('Welcome')          // Exact text match
// page.getByTitle('tooltip text')    // Title attribute
// page.getByAltText('image alt')     // alt attribute
// ✅ Tip: Use page.getByRole when possible — it matches how screen readers understand the DOM.

// 🎯 ASSERTIONS (expect())
// ts
// Copy
// Edit
// expect(locator).toBeVisible()
// expect(locator).toBeHidden()
// expect(locator).toBeEnabled()
// expect(locator).toBeDisabled()
// expect(locator).toHaveText("Hi")
// expect(locator).toContainText("Hi")
// expect(locator).toHaveAttribute("type", "email")
// expect(locator).toHaveValue("test@example.com")
// expect(locator).toHaveCount(3)
// expect(locator).toBeChecked()
// expect(locator).toHaveClass(/active/)
// ⌨️ INPUTS / INTERACTIONS
// ts
// Copy
// Edit
// await page.fill('#email', 'test@mail.com')
// await page.type('#email', 't') // types char by char
// await page.press('#email', 'Enter')
// await page.click('#submit')
// await page.dblclick('#button')
// await page.check('#agree')
// await page.uncheck('#agree')
// await page.selectOption('#select', 'value')
// 🔄 NAVIGATION / WAITING
// ts
// Copy
// Edit
// await page.goto('http://localhost:3000')
// await page.waitForNavigation()
// await page.waitForURL('**/dashboard')
// await page.waitForSelector('#sidebar')
// await page.waitForTimeout(500)  // not recommended unless needed
// await page.reload()
// 📷 SCREENSHOTS / DEBUGGING
// ts
// Copy
// Edit
// await page.screenshot({ path: 'screenshot.png' })
// await page.pause()               // interactive debugger
// await page.locator('#id').screenshot()
// 📋 GET DATA FROM ELEMENTS
// ts
// Copy
// Edit
// const text = await page.textContent('#welcome')
// const html = await page.innerHTML('#container')
// const inputVal = await page.inputValue('#email')
// const attr = await page.getAttribute('#btn', 'data-id')
// const count = await page.locator('.item').count()
// 🛠️ ADVANCED UTILS
// ts
// Copy
// Edit
// await page.evaluate(() => window.scrollTo(0, 0))   // run code in browser
// await page.setViewportSize({ width: 1280, height: 720 })
// await page.context().clearCookies()
// await page.context().storageState({ path: 'state.json' })  // for login sessions
// 🔀 MULTIPLE ELEMENTS
// ts
// Copy
// Edit
// const items = page.locator('.item')
// await expect(items).toHaveCount(5)
