import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import instance from 'Axios'
import { useHistory } from 'react-router'
const Default = ({ children }) => {

    const [isLoading, setisLoading] = useState(false)
    const navigate = useHistory()
    useEffect(() => {
        setisLoading(true)
        instance.get(`/hilton_user/detail/me`)
            .then((response) => {
                setisLoading(false)
                response?.data?.data?.user ?.role_id ===1 ? navigate.push('/admin/dashboard') : navigate.push('/auth/login-page')
            }).catch((errr) => {
                setisLoading(false)
                navigate.push('/auth/login-page')
            })
    }, [window?.location?.href])
    return (
        <div>
            {isLoading ? <h1>Loading</h1> : children}

        </div>
    )
}

export default Default