import React from 'react'
import { useEffect, useState } from 'react'


const [data, setData] = useState({})

const navigate = useNavigate()

useEffect(() => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
            setData(json)
        })
}, [])

function Item() {
    return (
        <div className="container-table">
            {
                data.products?.map((elem) => {
                    return <div className='elem' onClick={() => {
                        navigate('/products/' + elem.id)
                    }} >
                        <img className='img' src={elem.thumbnail} alt="" />
                        <p>{elem.title}</p>
                        <p>{elem.price}</p>
                    </div>
                }, [])
            }
        </div>
    )
}

export default Item