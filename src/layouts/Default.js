import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import instance from 'Axios'
import { useHistory } from 'react-router'
const Default = ({ children }) => {

    const [isLoading, setisLoading] = useState(true)
    const navigate = useHistory()
    useEffect(() => {

        instance.get(`/hilton_user/detail/me`)
            .then((response) => {
                setisLoading(false)
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