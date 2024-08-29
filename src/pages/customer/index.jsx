import React, { useEffect, useState } from 'react'
import CustomerHeader from '../../components/headers/customer'
import ProductCard from '../../components/cards/productCard'
import CategoryBtn from '../../components/buttons/categoryBtn'
import axios from 'axios'
import { apiUrl } from '../../helpers/url'

function Customer() {
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);

    // categories olib kelish

    useEffect(() => {
        getCategory()
        getProduct()
    }, [])

    function getCategory() {
        axios.get(apiUrl + 'category/list',)
            .then((res) => {
                if (res.data.success === true) {
                    setCategories(res.data.body);
                } else {
                    setCategories([])
                }
            }).catch((err) => {
                setCategories([])
                console.error(err);
            })
    }

    function getProduct() {
        axios.get(apiUrl + 'product/list',)
            .then((res) => {
                if (res.data.success === true) {
                    setProducts(res.data.body);
                } else {
                    setProducts([])
                }
            }).catch((err) => {
                setProducts([])
                console.error(err);
            })
    }

    return (
        <div>
            <CustomerHeader />
            <div className='bg-gray-800 py-16'>
                <div className='container mx-auto '>
                    {categories && categories.length > 0 && categories.map((item, index) =>
                        <CategoryBtn text={item.name} />
                    )}
                    <div className='flex gap-5 flex-wrap pt-10'>
                        {products && products.length > 0 && products.map((item, index) =>
                            <ProductCard item={item} key={index} />
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Customer
