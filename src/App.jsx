import { useState } from 'react'
import './App.css'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Header />
      <p>Hello world</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </>
  )
}

export default App
