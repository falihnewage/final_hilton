
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Provider } from 'react-redux';
import { store } from './Redux/Store';


import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Default from "layouts/Default";


const token = true






const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>

    <Provider store={store} >
      <Default >
        <Switch>




          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />


          {token ? <Redirect from="/" to="/admin/dashboard" /> : <Redirect from="/" to="/auth/login-page" />}

        </Switch>

      </Default>


    </Provider>
  </BrowserRouter>,
  {/* </React.StrictMode>  */ }
);







