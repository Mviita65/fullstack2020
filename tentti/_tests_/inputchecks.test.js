
// testattavat funktiot
const {tarkistaSähköposti, tarkistaSalasana} = require('../client/src/components/inputchecks');

// ryhmittely
describe('Sähköpostitestaus', ()=>{

    test('Ei parametria, throw error',()=>{
        expect(() => {
            tarkistaSähköposti()}).toThrow('Sähköpostia ei välitetty, tarkista lomake!');
        });

    test('SUURAAKKOSET, osaako tulkita?', () => {
        expect(tarkistaSähköposti("ANTTI.PENTTI@GPOSTI.COM")).toBe(true);
    })

    test('Kelvoton osoite, paluu false', () => {
        expect(tarkistaSähköposti("antti.pentti(a)gposti.com")).toBe(false);
    })
})

describe('Salasanatestaus', () => {

    test('Ei parametria, throw error',()=>{
        expect(() => {
            tarkistaSalasana()}).toThrow('Salasanaa ei välitetty, tarkista lomake!');
        });

    test('salasana salasanana (=vain pienet kirjaimet eli false)', () => {
        expect(tarkistaSalasana("salasana")).toBe(false);
    })

    test('salasana lyhyt (=alle kuusi merkkiä eli false)', () => {
        expect(tarkistaSalasana("abc4")).toBe(false);
    })

    test('salasana kelvollinen (=pienet ja suuret + numero eli true)', () => {
        expect(tarkistaSalasana("abc3XRT")).toBe(true);
    })
})
