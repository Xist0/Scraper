import './App.css'
import React from 'react'
import About from './components/About'

function App() {
  return (
    <>

      <div className="page-container">

        <div className="container-nav">
        </div>
      </div>
      <div className="line"></div>
      <div className="container-table">
        <table>
          <About />
        </table>
      </div>
    </>
  )
}

export default App
