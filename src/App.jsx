
import './App.css'
import About from './components/About'
import Seach from './components/Seach'


function App() {
  return (
    <>

      <div className="page-container">

        <div className="container">
          <h1 className="display-4">Table Sortable</h1>

          <div className='container-nav'>
            <div className="col-md-5">
              <button id="refresh"><h1>Обновить</h1></button>
            </div>
            <Seach/>
            <div className="text-right">
              <span className="pr-3"><h1>Rows Per Page:</h1></span>
              <div className="col-md-2">
                
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="container-table">
          <table>
            
            <About />

         
          </table>
        </div>
        
      </div>
    </>
  )
}

export default App
