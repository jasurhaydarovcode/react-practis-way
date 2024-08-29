import React from 'react'
import AdminHeader from '../../components/headers/headers'

function AdminScreen({ children, title }) {
    return (
        <>
            <AdminHeader />
            <div className='even:dark:bg-gray-800'>
                <div className='container mx-auto h-max'>
                    {title && <h1 className='text-2xl font-bold py-5 text-white'>{title}</h1>}
                    {children}
                </div>
            </div >
        </>
    )
}

export default AdminScreen
