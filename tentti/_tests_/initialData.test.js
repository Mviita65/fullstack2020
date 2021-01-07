const {initialData} = require('../client/src/components/initialData')

describe.skip('Alkudatatestit', ()=>{
    
    test('Kurssilta pitää löytyä ainakin yksi tentti', () => {
        expect(initialData.length).toBeGreaterThan(0);
    })


})