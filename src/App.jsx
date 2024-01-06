import { useState } from 'react'
import './App.css'
import Header from './components/header'
import ButtonPage from './components/btton_page'
import Map from './components/Map'
function App() {
  return (
    <>
      <Header />
      <main>
        <aside>
          <ButtonPage />
        </aside>
        <Map />
      </main>
    </>
  )
}

export default App
