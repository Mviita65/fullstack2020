import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

// import './App.css';

function App() {

  const [data, setData] = useState([])

  const initialData = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 }
  ];
  useEffect(() => {                                   // haetaan data
    let jemma = window.localStorage
    let tempData = JSON.parse(jemma.getItem("data")) // muutetaan merkkijono objekteiksi
    if (tempData==null) {
      jemma.setItem("data", JSON.stringify(initialData))
      tempData = initialData
    } else {
      if (tempData.lenght==0) {
        jemma.setItem("data", JSON.stringify(initialData))
        tempData = initialData  
    }}
    setData(tempData)
  },
    [])                                             // tehdään aluksi

  useEffect(() => {                                 // tallennetaan data

    window.localStorage.setItem("data", JSON.stringify(data))

  },
    [data])                                         // tarkkailee datan muuttumista

  // // const [osaNappulat,setOsaNappulat]=useState([])
  // const [nappulat,setNappulat]=useState([])
  // const [valitut,setValitut]=useState([])


  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue('firstName') || ''} ${
  //         params.getValue('lastName') || ''
  //       }`,
  //   },
  // ];

  // const nappulaPainettu = (index) => {
  //   console.log("Nappula painettu!"+index)
  //   let uusiLista = nappulat.concat([nappulat[index]])
  //   setNappulat(uusiLista)
  // }
  //  const nappulaPainettu = () => {
  //     setRows([]);
  //   }

  // const nimiMuuttui = (event,index) =>{
  //   let uusiLista = [...nappulat]
  //   uusiLista[index] = event.target.value
  //   console.log(event.target.value)
  //   setNappulat(uusiLista)
  // }

  // const omat=()=>{
  //   console.log("Valittiin jotain listalta.")
  // }

  function sukunimiMuuttui(event, index) {
    let syväKopio = JSON.parse(JSON.stringify(data));
    syväKopio[index].lastName = event.target.value;
    setData(syväKopio);
  }

  //JSX
  return (
    <div>
      {/* {nappulat.map((nappula,index)=><input key={index} onChange={(event)=>nimiMuuttui(event,index)} value={nappula}></input>)}
      {nappulat.map((nappula,index)=><button key={index} onClick={()=>nappulaPainettu(index)}>{nappula}</button>)}
      <button onClick={painikePainettu}>Näytä vain Jarnot</button><br/>
      {osaNappulat.length==0 ? "Ei ole vielä suodatettu Jarnoja":osaNappulat.map((nappula,index)=><button key={index} onClick={()=>nappulaPainettu(index)}>{nappula}</button>)} */}
      {/* <DataGrid rows={rows} columns={columns} pageSize={9} checkboxSelection onSelectionChange={omat}></DataGrid> */}
      {data.map((item, index) => <div key={index}><input onChange={(event) => sukunimiMuuttui(event, index)} value={item.lastName}></input> {item.firstName} {item.age}</div>)}
    </div>
  );
}

export default App;