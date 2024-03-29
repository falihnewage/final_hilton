import { message, Popconfirm } from 'antd';
import axios from "../../Axios";
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FiLogOut } from "react-icons/fi";




const NavDropDown = () => {
    const [confirmLoading, setconfirmLoading] = useState(false)
    const navigate = useHistory();
const handleLogOut = async (e) => {
    
    setconfirmLoading(true)
    await axios.post(`/auth/logout`,
        // {
        //     "session_id": session_id

        // },
        ).then(async (response) => {

            if (response.status === 200) {
                setconfirmLoading(false)
                // message.success('Logout Success')
                window.location=process.env.REACT_APP_LOGOUT_REDIRECT_URL
                // navigate.push(`/auth/login-page`)

            }
        }).catch((err) => {
            setconfirmLoading(false)

            message.warn('Something went wrong')
        })




}
const confirm = (e) => {
    handleLogOut()
};
    return(

    <Popconfirm
        title="Are you sure to Logout?"
        onConfirm={confirm}
        okButtonProps={{
            loading: confirmLoading,
          }}
        okText="Yes"
        cancelText="No"
        placement='bottomRight'
    >
        <a className='text-danger d-flex align-items-center'>
            <i onClick={(e) => handleLogOut(e)} className=" mr-2"><FiLogOut/></i>
            
            Log out</a>
    </Popconfirm>
);
}
export default NavDropDown;