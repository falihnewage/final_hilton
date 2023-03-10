import { message, Popconfirm } from 'antd';
import axios from "../../Axios";
import Cookies from 'js-cookie';
import React from 'react';
import { removeToken } from 'utils/utils';
import { removeUid } from 'utils/utils';
import { removeSession } from 'utils/utils';
import { getSession } from 'utils/utils';

const session_id = getSession()
const handleLogOut = async (e) => {

    await axios.post(`/auth/logout`,
        {
            "session_id": session_id

        },
        ).then(async (response) => {

            if (response.status === 200) {
                await removeToken()
                await removeUid()
                await removeSession()
                window.location.href = "/auth/login-page"

            }
        }).catch((err) => {

        })




}
const confirm = (e) => {
    handleLogOut()
};



const NavDropDown = () => (

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

export default NavDropDown;