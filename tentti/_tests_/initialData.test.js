const {initialData} = require('../client/src/components/initialData')


describe('Alkudatatestit', ()=>{

    test('Alkudata on olemassa', () => {
        expect(initialData.length).toBeGreaterThan(0);
    })

    test('Alkudatan tentillä pitää olla useampi kuin yksi kysymys', () => {
        expect(initialData[0].kysymykset.length).toBeGreaterThan(1)
    })

    test('Tentin jokaiselle kysymykselle on oikea vaihtoehto', () => {
        let kysymyslaskuri = 0
        let oikeatlaskuri = 0
        let verranto = 0
        initialData[0].kysymykset.forEach(item => {
            kysymyslaskuri++
            let oikeaOn = false
            item.vaihtoehdot.forEach(choice => {
                if (choice.korrekti === 1 && !oikeaOn) {
                    oikeatlaskuri++
                    oikeaOn = true
                }
            })    
        })
        verranto = oikeatlaskuri/kysymyslaskuri
        expect(verranto).toEqual(1)
    })     
    
    test('Onko alkudatassa TENTTI B', () => {
        expect(initialData[0].tentti).toMatch(/TENTTI B/)
    })
})