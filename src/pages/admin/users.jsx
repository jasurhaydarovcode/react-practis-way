import { useCallback, useEffect, useRef, useState } from 'react'
import AdminScreen from '.'
import { apiUrl } from '../../helpers/url'
import axios from 'axios'
import { config } from '../../helpers/token'

function AdminUsers() {
    const [users, setUsers] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedUserID, setSelectedUserID] = useState(null)
    const changeRoleModal = () => setModalVisible(!modalVisible)
    const selecttedRole = useRef('')


    const getUsers = useCallback(() => {
        axios.get(`${apiUrl}user/list`, config)
            .then((res) => {
                console.log(res.data.body);
                if (res.data.success) {
                    let checkedUsers = res.data.body.filter((item) => item.role !== 'ROLE_ADMIN')
                    setUsers(checkedUsers);
                } else {
                    setUsers([])
                }
            }).catch((err) => {
                setUsers([])
                console.log(err);
            })
    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    function changeRole() {
        if (selectedUserID && selecttedRole.current.value !== 'Choose a role') {
            axios.put(`${apiUrl}user/update/role/${selectedUserID}?role=${selecttedRole.current.value}`, {}, config)
                .then(res => {
                    console.log(res.data)
                    getUsers()
                    changeRoleModal()
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <AdminScreen title={'Client'}>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                user name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 && users.map((item, key) =>
                            <tr key={key} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {key + 1}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.fullName}
                                </th>
                                <td class="px-6 py-4">
                                    {item.userName}
                                </td>
                                <td class="px-6 py-4">
                                    {item.role === 'ROLE_SELLER' ? 'Celler' : 'Client'}
                                </td>
                                <td class="px-6 py-4 flex gap-3 cursor-pointer">
                                    <p class="font-medium text-red-600 dark:text-red-500 hover:underline">delete</p>
                                    <p onClick={() => {
                                        changeRoleModal()
                                        setSelectedUserID(item.id)
                                    }} class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">edit role</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {modalVisible &&
                    <div id="default-modal" tabindex="-1" aria-hidden="true" class="flex  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-full max-w-2xl max-h-full">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Terms of Service
                                    </h3>
                                    <button
                                        onClick={() => changeRoleModal()} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div class="p-4 md:p-5 space-y-4">
                                    <select
                                        ref={selecttedRole}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Choose a role</option>
                                        <option value="ROLE_SELLER">Seller</option>
                                        <option value="ROLE_BUYER">Customer</option>
                                    </select>
                                </div>
                                <div class="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="default-modal" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">close</button>
                                    <button onClick={changeRole} data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </AdminScreen>
    )
}

export default AdminUsers
