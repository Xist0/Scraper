import React, {useEffect, useState} from 'react'
import './About.css'
import { data } from './data.js'

function About() {


  const listItem = data.map(data =>
    <tr>
      <td><p>{data.product_store}</p></td>
      <td><p>{data.product_name}</p></td>
      <td><p>{data.product_article}</p></td>
      <td><p>{data.product_in_stock}</p></td>
      <td id='Prise'><h1>{data.product_price} ₽</h1></td>
      <td id='link' ><a href={data.product_link}><h1>Перейти</h1></a></td>
      <td id='Foto'><img className='img' src={data.product_image} alt="" /></td>

    </tr>
  )

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
       {listItem}
      </table>
    </div>

  )
}
export default About