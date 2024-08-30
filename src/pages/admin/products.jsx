import { useEffect, useState } from 'react'
import AdminScreen from '.'
import { apiUrl } from '../../helpers/url'
import axios from 'axios'
import { toast } from 'react-toastify'
import { config, imgConfig } from '../../helpers/token'
import useFetch from '../../hooks/UseFetch'

function AdminProducts() {
    const [products, setProducts] = useState(null)
    const [img, setImg] = useState(null)

    const { data, error, loading } = useFetch(`${apiUrl}product/list`)

    if (error) {
        toast.error('Failed to load products')
    }
    function handlechange(e) {
        setImg(e.target.files[0])
    }

    function fileUpload() {
        let formData = new FormData()
        formData.append('image', img)
        
        if (img) {
            axios.post(`http://161.35.214.247:8090/api/videos/upload`, formData, imgConfig)
                .then(res => {
                    toast.success('Image uploaded successfully')
                }).catch((err) => {
                    console.log(err);

                })
        } else {
            toast.error('Please select an image')
        }

    }


    function deleteProduct(productId) {
        if (config && productId) {
            axios.delete(`${apiUrl}product/${productId}`, config)
                .then(response => {
                    if (response.data.success) {
                        toast.success('Product deleted successfully')
                    } else {
                        toast.error('Failed to delete product')
                    }
                }).catch(() => {
                    toast.error('Failed to delete product')
                })
        } else {
            toast.error('server error')
        }
    }

    return (
        <AdminScreen title={'Client'}>
            <button onClick={fileUpload} className='bg-green-400 px-3 py-2 text-white'>upload</button>
            <input onChange={handlechange} type="file" />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr><td colSpan="5">Loading...</td></tr>}
                        {data && data.map((product, key) =>
                            <tr key={key} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {key + 1}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.name}
                                </th>
                                <td class="px-6 py-4">
                                    {product.description}
                                </td>
                                <td class="px-6 py-4">
                                    {product.price}
                                </td>
                                <td class="px-6 py-4">
                                    <p onClick={() => deleteProduct(product.id)} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">delete</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </AdminScreen>
    )
}

export default AdminProducts
