let codeList = [
    'ar',
    'am',
    'bg',
    'bn',
    'ca',
    'cs',
    'da',
    'de',
    'el',
    'en_GB',
    'en_US',
    'es',
    'es_419',
    'et',
    'fa',
    'fi',
    'fil',
    'fr',
    'gu',
    'he',
    'hi',
    'hr',
    'hu',
    'id',
    'it',
    'ja',
    'kn',
    'ko',
    'lt',
    'lv',
    'ml',
    'mr',
    'ms',
    'nl',
    'no',
    'pl',
    'pt_BR',
    'pt_PT',
    'ro',
    'ru',
    'sk',
    'sl',
    'sr',
    'sv',
    'sw',
    'ta',
    'te',
    'th',
    'tr',
    'uk',
    'vi',
    'zh_TW',
    'zh_CN',
    'en',
]

let codeMap = {
    ar: 'Arabic',
    am: 'Amharic',
    bg: 'Bulgarian',
    bn: 'Bengali',
    ca: 'Catalan',
    cs: 'Czech',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    en: 'English',
    en_GB: 'English (Great Britain)',
    en_US: 'English (USA)',
    es: 'Spanish',
    es_419: 'Spanish (Latin America and Caribbean)',
    et: 'Estonian',
    fa: 'Persian',
    fi: 'Finnish',
    fil: 'Filipino',
    fr: 'French',
    gu: 'Gujarati',
    he: 'Hebrew',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    kn: 'Kannada',
    ko: 'Korean',
    lt: 'Lithuanian',
    lv: 'Latvian',
    ml: 'Malayalam',
    mr: 'Marathi',
    ms: 'Malay',
    nl: 'Dutch',
    no: 'Norwegian',
    pl: 'Polish',
    pt_BR: 'Portuguese (Brazil)',
    pt_PT: 'Portuguese (Portugal)',
    ro: 'Romanian',
    ru: 'Russian',
    sk: 'Slovak',
    sl: 'Slovenian',
    sr: 'Serbian',
    sv: 'Swedish',
    sw: 'Swahili',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    vi: 'Vietnamese',
    zh_CN: 'Chinese (China)',
    zh_TW: 'Chinese (Taiwan)',
}

codeMap = {
    ...codeMap,
    ...{
        zh_CN: 'Chinese (Simplified)',
        zh_TW: 'Chinese (Traditional)',
        en_US: 'English (U.S.)',
        en_GB: 'English (U.K.)',
        es: 'Spanish (Spain)',
        // noop
        es_MX: 'Spanish (Mexico)',
        fr_CA: 'French (Canada)',
        en_AU: 'English (Australia)',
        en_CA: 'English (Canada)',
    },
}

const keyMap = {
    es_MX: 'es',
    fr_CA: 'fr',
    en_AU: 'en',
    en_CA: 'en',
}

codeList = codeList.concat(['es_MX', 'fr_CA', 'en_AU', 'en_CA'])

// codeList = [
//     'en',
//     'en_GB',
//     'en_US',
//     'en_AU',
//     'en_CA',
// ]

// codeList = codeList.filter(c => c !== 'zh_CN')

function sleep(t = 500) {
    return new Promise((resolve) => {
        setTimeout(resolve, t)
    })
}

async function openSelect(
    btnSelector = '.locale-switcher___1hMpc button',
    menuSelector = 'body > div > div[role="menu"]'
) {
    let menu = document.querySelector(menuSelector)

    const button = document.querySelector(btnSelector)
    !menu && button.click()

    let wait = !menu
    while (wait) {
        await sleep(500)
        menu = document.querySelector(menuSelector)
        wait = !menu
    }
    return menu
}

async function select(code, menuSelector = 'body > div > div[role="menu"]') {
    let menu = document.querySelector(menuSelector)
    let language = codeMap[code]
    const xpath = `./div/ul/li/button[contains(.,"${language}")]`
    const iterator = document.evaluate(
        xpath,
        menu,
        null,
        XPathResult.ANY_TYPE,
        null
    )
    const button = iterator.iterateNext()

    button && button.click()
    !button && console.log('select failed: ', code)

    return !!button
}

async function inputText(inputElement, text) {
    await new Promise((resolve) => {
        setTimeout(resolve, 300)
    })
    // inputElement.select()
    // document.execCommand('paste', text)
    inputElement.value = text

    const ev = new Event('input', { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(ev)

    const ev3 = new Event('keydown', {
        key: 'a',
        bubbles: true,
        cancelable: true,
    })
    inputElement.dispatchEvent(ev3)

    const ev4 = new Event('keyup', {
        key: 'a',
        bubbles: true,
        cancelable: true,
    })
    inputElement.dispatchEvent(ev4)

    const ev5 = new Event('keypress', { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(ev5)

    const changeEv = new Event('change', { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(changeEv)

    await new Promise((resolve) => {
        setTimeout(resolve, 300)
    })
}

async function pythonInputText(inputElement, text) {
    let wait = true
    while (wait) {
        inputElement.select()
        inputElement.focus()

        let focus =
            document.visibilityState === 'visible' && document.hasFocus()

        if (focus) {
            try {
                await fetch(`http://localhost:8000/type?text=${encodeURIComponent(text)}`, {
                    method: 'get',
                    mode: 'no-cors',
                })
                // await fetch('http://localhost:8000/type', {
                //     method: 'PUT',
                //     body: text,
                //     mode: 'no-cors',
                // })
            } catch (e) {
                console.error(e)
            }
        }

        !focus && console.log('waiting doc focus...')

        await new Promise((resolve) => {
            setTimeout(resolve, 150)
        })

        let correct = inputElement.value === text
        !correct && console.log('check type...')

        wait = !(focus && correct)
    }

    console.log('python input done!')
}

async function inputPromotionalText(text) {
    const inputDiv = document.querySelector('div[name="promotionalText"]')
    await inputText(inputDiv, text)
    // await pythonInputText(inputDiv, text)
}

async function inputDescription(text) {
    const inputDiv = document.querySelector('div[name="description"]')
    await inputText(inputDiv, text)
    // await pythonInputText(input, text)
}

async function inputWhatsNew(text) {
    const inputDiv = document.querySelector('div[name="whatsNew"]')
    await inputText(inputDiv, text)
}

async function inputKeywords(text) {
    const input = document.querySelector('input#keywords')
    text = text.split(/[\n،,、，]/).join(',')
    await inputText(input, text)
    // await pythonInputText(input, text)
}

async function inputsupportUrl(text) {
    const input = document.querySelector('input#supportUrl')
    await inputText(input, text)
    // await pythonInputText(input, text)
}

async function inputTitle(text) {
    const input = document.querySelector('input#name')
    await pythonInputText(input, text)
}

async function inputSubtitle(text) {
    const input = document.querySelector('input#subtitle')
    await pythonInputText(input, text)
}

// conduct
async function test() {
    // codeList = ['en', 'ar', 'ca']
    for (let code of codeList) {
        console.log('test code: ', code)
        // await openSelect()
        // await select(code)
        // await inputPromotionalText(code + ': aaa')

        const valueCode = keyMap[code] || code
        let pText = window.AS_IOS_DICT[valueCode].promotional
        if (pText.length > 170) {
            pText = window.AS_IOS_DICT[valueCode].pro_1
        }

        console.log(code, pText)

        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })
    }
}

async function view() {
    // let codeList = ['en', 'ar', 'ca']
    for (let code of codeList) {

        await openSelect()
        const ok = await select(code)
        if (!ok) continue

        console.log('view code: ', code)

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
}

// AS_IOS_DICT = {}
// DESCRIPTION_DICT = {}
// WHATSNEW_DICT = {}
async function start() {
    // let codeList = ['ja', 'sv', 'ar']
    let langList = [...codeList]
    for (let code of langList) {
        await openSelect()
        const ok = await select(code)
        if (!ok) continue

        console.log('code: ', code)
        const valueCode = keyMap[code] || code

        let promotionalText = window.AS_IOS_DICT[valueCode].promotion
        // if (promotionalText.length > 170) {
        //     console.log('promotional too long', code, promotionalText.length)
        //     promotionalText = window.AS_IOS_DICT[valueCode].promotional1
        // }
        if (promotionalText.length > 170) {
            console.log('promotional too long', code, promotionalText.length)
            // promotionalText = window.AS_IOS_DICT[valueCode].promotional2
            promotionalText = window.AS_IOS_DICT['en'].promotion
        }
        await inputPromotionalText(promotionalText)

        const descriptionText = window.AS_IOS_DICT[valueCode].description
        await inputDescription(descriptionText)

        let keywordsText = window.AS_IOS_DICT[valueCode].keywords
        // if (keywordsText.length > 100) {
        //     console.log('keywords too long', code, keywordsText.length)
        //     keywordsText = window.AS_IOS_DICT[valueCode].keyword1
        // }
        if (keywordsText.length > 100) {
            console.log('keywords too long', code, keywordsText.length)
            keywordsText = window.AS_IOS_DICT['en'].keywords
        }
        await inputKeywords(keywordsText)


        await inputsupportUrl("https://sider.ai/mac")

        let whatsNewText = window.AS_IOS_DICT[valueCode].whatsnew
        await inputWhatsNew(whatsNewText)

        await new Promise((resolve) => {
            setTimeout(resolve, 300)
        })
    }
    console.log('done')
}

// WHATSNEW_DICT = {}
async function startWhatsNew() {
    let langList = [...codeList]
    for (let code of langList) {
        await openSelect()
        const ok = await select(code)
        if (!ok) continue

        console.log('code: ', code)
        const valueCode = keyMap[code] || code

        let whatsNewText = window.WHATSNEW_DICT[valueCode].whatsnew
        // if (whatsNewText.length < 7) whatsNewText = window.WHATSNEW_DICT[valueCode]['1']
        await inputWhatsNew(whatsNewText)

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
    console.log('done')
}

// AS_IOS_DICT = {}
async function startAppInfo() {
    // let codeList = ['ja', 'en', 'zh']
    let langList = [...codeList]
    for (let code of langList) {
        console.log('view code: ', code)
        await openSelect()
        const ok = await select(code)
        if (!ok) continue
        const valueCode = keyMap[code] || code
        // let title = window.AS_IOS_DICT[valueCode].title
        let title = "Sider: ChatGPT powered Sidebar"
        // if (title.length > 30) {
        //     title = window.AS_IOS_DICT[valueCode].title1
        // }
        // if (title.length > 30) {
        //     title = window.AS_IOS_DICT[valueCode].title2
        // }
        // if (title.length > 30) {
        //     title = "Sider - AI " + window.AS_IOS_DICT['en'].title
        // }
        if (code !== 'zh_CN') {
            await inputTitle(title)
        }

        let subtitle = window.AS_IOS_DICT[valueCode].subtitle
        // let subtitle = "Powered by ChatGPT & GPT-4 API"
        // // let subtitle = "Chat to PDF & GPT"
        // if (subtitle.length > 30) {
        //     // console.log('subtitle too long ', code, subtitle.length)
        //     subtitle = window.AS_IOS_DICT[valueCode].subtitle1
        // }
        // if (subtitle.length > 30) {
        //     // console.log('subtitle too long ', code, subtitle.length)
        //     subtitle = window.AS_IOS_DICT[valueCode].subtitle2
        // }
        if (subtitle.length > 30) {
            subtitle = window.AS_IOS_DICT['en'].subtitle
            // subtitle = "Record and share your screen."
        }
        await inputSubtitle(subtitle)

        await new Promise((resolve) => {
            setTimeout(resolve, 300)
        })
    }
    console.log('done')
}

// DATA_DICT
async function startAppend() {
    let langList = [...codeList]
    for (let code of langList) {
        await openSelect()
        const ok = await select(code)
        if (!ok) {
            console.warn('select failed', code)
            continue
        }

        let dataCode = keyMap[code] || code
        const inputDiv = document.querySelector('div[name="description"]')
        let value = inputDiv.value
        value += "\n" + DATA_DICT[dataCode].terms + ' ' + 'https://gochitchat.ai/terms.html\n'
        await inputText(inputDiv, value)

        await new Promise((r) => {
            setTimeout(r, 300)
        })
    }
    console.log('done')
}

async function startPrivacy() {
    let langList = [...codeList]
    for (let code of langList) {
        // await openSelect('button.selectedLocaleDisplay___aWWLV.btn-link___7P55x', 'div.localizationOptions___35E45')

        while (!document.querySelector('div.tb-popover__content.tb-popover__content--show')) {
            const menuBtn = document.querySelector('button.selectedLocaleDisplay___aWWLV.btn-link___7P55x')
            menuBtn.click()
            await sleep(500)
        }

        const xpath = `//div[contains(@class, "localizationOptions___35E45")]/ul/li/button[contains(.,"${codeMap[code]}")]`
        const iterator = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null)
        const langBtn = iterator.iterateNext()

        if (langBtn) {
            langBtn.click()
        }

        const ok = !!langBtn
        if (!ok) {
            console.warn('select failed', code)
            continue
        }

        let dataCode = keyMap[code] || code

        const editBtn = document.querySelector('div.tb-default-theme button.modalLauncher___Kt3Q3')

        editBtn.click()

        console.log(editBtn)

        await new Promise((r) => {
            setTimeout(r, 100)
        })

        const input = document.querySelector('#privacyPolicyUrl')
        // const value = "https://gochitchat.ai/privacy.html"
        const value = "https://sider.ai/policies/privacy.html"

        // await inputText(input, value)
        await pythonInputText(input, value)

        await new Promise((r) => {
            setTimeout(r, 100)
        })

        const saveBtn = document.querySelector("div.modal-footer___2XcPF > div > button.sc-brqgnP.SqPLV.tb-btn--primary")
        console.log(saveBtn)

        if (saveBtn) {
            saveBtn.click()
        }
        if (!saveBtn) {
            const cancelBtn = document.querySelector('div.modal-footer___2XcPF > div > button.sc-brqgnP.SqPLV.tb-btn--secondary')
            cancelBtn?.click()
        }


        while (document.querySelector('div.privacyPolicyModal___8LsyN')) {
            await sleep(200)
            console.info('waiting save...')
        }
    }
    console.log('done')
}

async function startSubscription() {
    let langList = [...codeList]
    for (let code of langList) {
        const xpath = `//div[contains(@class,"ReactVirtualized__Grid__innerScrollContainer")]/div/div/div/div/button[contains(.,"${codeMap[code]}")]`
        const iterator = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null)
        const langBtn = iterator.iterateNext()

        if (langBtn) {
            langBtn.click()
        }
        if (!langBtn) {
            console.warn('select failed', code)
            continue
        }

        await sleep(300)

        const input = document.querySelector('input#groupDisplayName')
        if (!input) {
            continue
        }
        await pythonInputText(input, "Sider Pro")

        const input2 = document.querySelector('input#customAppDisplayName')
        if (!input2) {
            continue
        }

        code = keyMap[code] || code
        // let title = "Sider - AI " + AS_IOS_DICT[code].title
        // await pythonInputText(input2, title)

        const saveBtn = document.querySelector('div.Box-sc-18eybku-0.gFeMUa button')
        const cancelBtn = document.querySelector('div.Box-sc-18eybku-0.bHoFio button')

        if (saveBtn) {
            saveBtn.click()
        }
        if (!saveBtn && cancelBtn) {
            cancelBtn.click()
        }

        while (document.querySelector('input#groupDisplayName')) {
            await sleep(300)
            console.log('waiting save...')
        }
    }
}