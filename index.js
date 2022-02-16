const puppeteer = require('puppeteer')

const code = require('./ansCode')
const loginLink = 'https://www.hackerrank.com/auth/login'

const email = 'mehisex411@plexfirm.com'
const password = 'Allu@Arjun1234'

const browserOpen = puppeteer.launch({
  headless: false,
  args: ['--start-maximized'],
  defaultViewport: null,
})
let page
browserOpen
  .then(function (browserObj) {
    const browserOpenPromise = browserObj.pages()
    return browserOpenPromise
  })
  .then(function (tab) {
    page = tab[0]
    let hackerrankOpenPromise = page.goto(loginLink)
    return hackerrankOpenPromise
  })
  .then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 54 })
    return emailIsEntered
  })
  .then(function () {
    let passwordIsEntered = page.type("input[id='input-2']", password, {
      delay: 36,
    })
    return passwordIsEntered
  })
  .then(function () {
    let LoginButtonClicked = page.click(
      '.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled'
    )
    return LoginButtonClicked
  })
  .then(function () {
    const waitForPromise = page.waitForSelector(
      'div[data-automation="algorithms"]'
    )
    return waitForPromise
  })
  .then(function () {
    let clickOnAlgoPromise = page.click('div[data-automation="algorithms"]')
    return clickOnAlgoPromise
  })
  .then(function () {
    const waitForPromise = page.waitForSelector('input[value="solved"]')
    return waitForPromise
  })
  .then(function () {
    let warmupClicked = page.click('input[value="solved"]')
    return warmupClicked
  })
  .then(function () {
    let waitFor3Sec = page.waitForSelector(
      '.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',
      { delay: 100 }
    )
    return waitFor3Sec
  })
  .then(function () {
    let allChallengesPromise = page.$$(
      '.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',
      { delay: 100 }
    )
    return allChallengesPromise
  })
  .then(function (questionsArr) {
    let questionWillBeSolved = questionSolver(
      page,
      questionsArr[0],
      code.answers,
      { delay: 100 }
    )
    return questionWillBeSolved
  })

function waitAndClick(selector, cpage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cpage.waitForSelector(selector)
    waitForModelPromise
      .then(function () {
        let clickModel = cpage.click(selector)
        return clickModel
      })
      .then(function () {
        resolve()
      })
      .catch(function (err) {
        reject()
      })
  })
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClicked = question.click({ delay: 100 })
    questionWillBeClicked
      .then(function () {
        let textArea = waitAndClick('.view-lines', page, { delay: 100 })
        return textArea
      })
      .then(function () {
        let ctrlIsPressed = page.keyboard.down('Control', { delay: 100 })
        return ctrlIsPressed
      })
      .then(function () {
        let AIsPressed = page.keyboard.down('A', { delay: 100 })
        return AIsPressed
      })
      .then(function () {
        let XIsPressed = page.keyboard.down('X', { delay: 100 })
        return XIsPressed
      })
      .then(function () {
        let ctrlIsReleased = page.keyboard.up('Control', { delay: 100 })
        return ctrlIsReleased
      })
      .then(function () {
        return waitAndClick('.checkbox-input', page)
      })
      .then(function () {
        return waitAndClick('#input-1', page)
      })
      .then(function () {
        return page.type('#input-1', answer, { delay: 9 })
      })
      .then(function () {
        let ctrlIsPressed = page.keyboard.down('Control', { delay: 100 })
        return ctrlIsPressed
      })
      .then(function () {
        let AIsPressed = page.keyboard.down('A', { delay: 100 })
        return AIsPressed
      })
      .then(function () {
        let XIsPressed = page.keyboard.down('X', { delay: 100 })
        return XIsPressed
      })
      .then(function () {
        let ansss = waitAndClick('.view-lines', page, { delay: 100 })
        return ansss
      })
      .then(function () {
        let VIsPressed = page.keyboard.press('V', { delay: 100 })
        return VIsPressed
      })
      .then(function () {
        let ctrlIsReleased = page.keyboard.up('Control', { delay: 100 })
        return ctrlIsReleased
      })
      .then(function () {
        let submitLoaded = page.waitForSelector(
          '.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled'
        )
        return submitLoaded
      })
      .then(function () {
        let submitsPressed = page.click(
          '.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled'
        )
        return submitsPressed
      })
      .then(function () {
        resolve()
      })
      .then(function (err) {
        reject()
      })
  })
}
