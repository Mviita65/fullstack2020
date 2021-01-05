
const {tarkistaSähköposti, tarkistaSalasana} = require('../client/src/components/inputchecks');

describe('Sähköpostitestaus', ()=>{

    test('Ei parametria',()=>{
        expect(() => {
            tarkistaSähköposti()}).toThrow('Sähköpostia ei välitetty, tarkista lomake!');
        });

    test('SUURAAKKOSET', () => {
        expect(tarkistaSähköposti("ANTTI.PENTTI@GPOSTI.COM")).toBe(true);
    })

    test('Kelvoton osoite', () => {
        expect(tarkistaSähköposti("antti.pentti(a)gposti.com")).toBe(false);
    })
})

describe('Salasanatestaus', () => {

    test('Ei parametria',()=>{
        expect(() => {
            tarkistaSalasana()}).toThrow('Salasanaa ei välitetty, tarkista lomake!');
        });

    test('salasana salasanana (=vain pienet kirjaimet)', () => {
        expect(tarkistaSalasana("salasana")).toBe(false);
    })

    test('salasana lyhyt (=alle kuusi merkkiä)', () => {
        expect(tarkistaSalasana("abc")).toBe(false);
    })

    test('salasana kelvollinen (=pienet ja suuret + numero)', () => {
        expect(tarkistaSalasana("abc3XRT")).toBe(true);
    })
})
