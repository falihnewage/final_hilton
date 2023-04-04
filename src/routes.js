
import Dashboard from "views/Dashboard.js";
import Property from "views/Property.js";
import Question from "views/Question.js";
import Recommendations from "views/Recommendations.js";
import Users from "views/Users.js";
import { FiAlignJustify } from "react-icons/fi";
import AddProperty from "views/AddProperty";
// import AddQuestion from "views/Components/AddQuestion";
import Editpage from "views/Pages/Edit-page";
import LoginPage from "views/Pages/LoginPage.js";
import PageNotFound from "views/Pages/Pagenotfound";

var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: <FiAlignJustify/>,
    component: Dashboard,
    show:true
  },
  {
    path: `/edit-property/:id/:type`,
    layout: "/admin",
    name: "EditProperty",
    icon: "nc-icon nc-chart-pie-35",
    component: Editpage,
    show:false
  },
  {
    path: "/Users",
    layout: "/admin",
    name: "User Management",
    icon: "nc-icon nc-circle-09",
    component: Users,
    show:true
  },

  {
    path: `/Property/:id`,
    layout: "/admin",
    name: "Property Management",
    icon: "nc-icon nc-map-big",
    component: Property,
    show:true
  },

  {
    path: "/Question",
    layout: "/admin",
    name: "Question Management",
    icon: "nc-icon nc-bullet-list-67",
    component: Question,
    show:true
  },

  {
    path: "/Recommendations",
    layout: "/admin",
    name: "Report Management",
    icon: "nc-icon nc-chart-bar-32",
    component: Recommendations,
    show:true
  },


  {
    path: "/login-page",
    layout: "/auth",
    name: "Login Page",
    mini: "LP",
    component: LoginPage,
  },
  {
    path: `/add-property/:id`,
    layout: "/admin",
    name: "AddProperty",
    component: AddProperty,
  },
  {
    path: "*",
    layout: "/admin",
    name: "Notfound",
    icon: "nc-icon nc-chart-pie-35",
    component: PageNotFound,
    
  },
  {
    path: "*",
    layout: "/auth",
    name: "Notfound",
    icon: "nc-icon nc-circle-09",
    component: PageNotFound,
  },
  // {
  //   path: "/add-question",
  //   layout: "/admin",
  //   name: "Addquestion",
  //   component: AddQuestion,
  // },

 
];
export default routes;
