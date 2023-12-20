
import './App.css'
import About from './components/About'

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
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Search in table..." id="searchField" />
            </div>
            <div className="text-right">
              <span className="pr-3"><h1>Rows Per Page:</h1></span>
              <div className="col-md-2">
                <div className="d-flex justify-content-end">
                  <select className="custom-select" name="rowsPerPage" id="changeRows">
                    <option value="10" selected>10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                  </select>
                </div>
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
