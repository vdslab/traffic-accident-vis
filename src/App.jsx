import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Button from './components/button'

function App() {
  return (
    <>
      <Header />
      <div className='App'>
        <Button text='あああ' />
        <Button text='いいい' />
      </div>
    </>
  )
}

export default App
