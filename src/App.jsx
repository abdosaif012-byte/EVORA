import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Header } from './Pages/header'
import { Hero } from './Pages/hero'
import { Home } from './Pages/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    < Hero />
    < Home />
    </>
  )
}

export default App
