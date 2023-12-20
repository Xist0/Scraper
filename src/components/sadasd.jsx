import React from 'react'
import { useEffect, useState } from 'react'
import './ItemeProducts.css'
import { Link, useParams } from 'react-router-dom'


function ItemeProducts() {
    const { id } = useParams()
    const [elem, setArray] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        fetch('https://dummyjson.com/products/' + id)
            .then(response => response.json())
            .then(json => {
                setArray(json)
                setImg(json.thumbnail)
            })
    }, [])

    function setImg(img) {
        setSelectedImage(img);
    }


    return (
        <div className='I_ItemeProducts'>
            <div className='I_Iteme'>
                <div className='ImagesGrid'>
                    {
                        elem.images?.map((img) => {
                            return <img className='I_thumbnail' src={img} onClick={() => setImg(img)} />
                        })
                    }
                </div>
                <img className='I_M_thumbnail' src={selectedImage}></img>
                <div className='I_text'>
                    <h className='I_txt'>{elem.title}</h>
                    <h className='I_txt'>Цена: {elem.price}$</h>
                    <h className='I_txt'>Брэнд: {elem.brand}</h>
                    <h className='I_txt'>Катигория: {elem.category}</h>
                </div>

            </div>
            <div className="i_btn">
                <Link to='/'><button className='I_card'><h1>Назад</h1></button></Link>
            </div>

        </div>
    )
}
export default ItemeProducts