import { useState } from 'react'
import Header from './Components/Header';
import Form from './Components/Form'
import './App.css'
import './assets/typeahead.css'
function App() {
  const [count, setCount] = useState(0)

  /*var prods;
  const getProducts = async () => {
         const res = await fetch("https://guillervazio.github.io/apivazio/data.json")
         const data = await res.json()
         prods = data.data.memes
     }
     getProducts()*/

  return (
    <div className="App">
        <Header />
        <Form />   
    </div>
  )
}

export default App
