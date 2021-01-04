const funktiot = require('./moduuli')
let onnistuneet=0
let ajetut=0

const testSumma1=()=> {
    ajetut++;
    let palautui = funktiot.summa(1,2)
    if (palautui==3) {
        console.log("summa funktion testi1 onnistui")
        onnistuneet++
    } else {
        console.log("summa funktion testi1 epäonnistui")
    }
}

const testSumma2=()=> {
    ajetut++;
    let palautui = funktiot.summa(1,"l")
    if (palautui=="anna appelsiineja") {
        console.log("summa funktion testi2 onnistui")
        onnistuneet++
    } else {
        console.log("summa funktion testi2 epäonnistui")
    }
}
const testTulo=()=> {
    ajetut++;
    let palautui = funktiot.tulo(1,2)
    if (palautui==2) {
        console.log("tulo funktion testi onnistui")
        onnistuneet++
    } else {
        console.log("tulo funktion testi epäonnistui")
    }
}

const testMerkkaaLöydetytKirjaimet=()=>{
    ajetut++
    let palautui = funktiot.merkkaaLöydetytKirjaimet(['a','e','y'],['k','i','s','s','a'])
    console.log(palautui.toString());
    if (palautui == '_,_,_,_,a'){
        console.log("merkkaaLöydetytKirjaimet funktion testi onnistui")
        onnistuneet++
    } else {
        console.log("merkkaaLöydetytKirjaimet funktion testi epäonnistui")
    }
}

const testMerkkaaLöydetytKirjaimet2=()=>{
    ajetut++
    let palautui = funktiot.merkkaaLöydetytKirjaimet2(['a','e','y'],['k','i','s','s','a'])
    console.log(palautui.toString());
    if (palautui == '_,_,_,_,a'){
        console.log("merkkaaLöydetytKirjaimet2 funktion testi onnistui")
        onnistuneet++
    } else {
        console.log("merkkaaLöydetytKirjaimet2 funktion testi epäonnistui")
    }
}

testSumma1();
testSumma2();
testTulo();
testMerkkaaLöydetytKirjaimet();
testMerkkaaLöydetytKirjaimet2();
console.log("onnistuneet: "+onnistuneet+", ajetut: "+ajetut)
