import { useEffect, useState } from 'react'
import './About.css'

function About() {

  const [data, setData] = useState({})

  useEffect(() => {
    fetch('https://dummyjson.com/products/')
      .then(res => res.json())
      .then(json => {
        setData(json)
      })
  }, [])

  return (

    <div className="about-table">
      <table>
        <tr id='table-nav'>
          <th id='Shop'><h1>Магазин</h1></th>
          <th id='Shop'><h1>Наименование</h1></th>
          <th id='Artikyl' ><h1>Артикул</h1></th>
          <th><h1>В наличии</h1></th>
          <th id='Prise'><h1>Цена</h1></th>
          <th id='link'><h1>Ссылка</h1></th>
          <th id='Foto'><h1>Фото</h1></th>
        </tr>
        {
          data.products?.map((elem) => {
            return <tr>
              <td><p>{elem.title}</p></td>
              <td><p>{elem.title}</p></td>
              <td><p>{elem.title}</p></td>
              <td><p>{elem.title}</p></td>
              <td id='Prise'><h1>{elem.price} ₽</h1></td>
              <td id='link' ><a href="#"><h1>Перейти</h1></a></td>
              <td id='Foto'><img className='img' src={elem.thumbnail} alt="" /></td>
             
            </tr>
            
            
          }, [])
          
        }
        
      </table>
    </div>

  )
}
export default About