import { message, Popconfirm } from 'antd';
import axios from "../../Axios";
import React from 'react';
import { useHistory } from 'react-router';





const NavDropDown = () => {
    const navigate = useHistory();
const handleLogOut = async (e) => {
    

    await axios.post(`/auth/logout`,
        // {
        //     "session_id": session_id

        // },
        ).then(async (response) => {

            if (response.status === 200) {
                message.success('Logout Success')
                navigate.push(`/auth/login-page`)

            }
        }).catch((err) => {

        })




}
const confirm = (e) => {
    handleLogOut()
};
    return(

    <Popconfirm
        title="Are you sure to Logout?"
        onConfirm={confirm}

        okText="Yes"
        cancelText="No"
        placement='bottomRight'
    >
        <a className='text-danger d-flex align-items-center'><i onClick={(e) => handleLogOut(e)} className="nc-icon nc-button-power mr-2"></i>
            Log out</a>
    </Popconfirm>
);
}
export default NavDropDown;