import React from "react";
import PropTypes from "prop-types";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
  Dropdown,
  Form,
} from "react-bootstrap";

function FixedPlugin({
  setSidebarImageParent,
  setSidebarBackgroundParent,
  sidebarDefaultImage,
  sidebarImages,
  backgroundColors,
  backgroundColor,
}) {
  const [imageSwitch, setImageSwitch] = React.useState(true);
  const [sidebarSwitch, setSidebarSwitch] = React.useState(false);
  const [navbarSwitch, setNavbarSwitch] = React.useState(false);
  const [sidebarImage, setSidebarImage] = React.useState(sidebarDefaultImage);
  return (
    <>
     
    </>
  );
}

FixedPlugin.defaultProps = {
  setSidebarImageParent: () => {},
  setSidebarBackgroundParent: () => {},
  sidebarDefaultImage: "",
  sidebarImages: [],
  backgroundColors: [],
};

FixedPlugin.propTypes = {
  setSidebarImageParent: PropTypes.func,
  setSidebarBackgroundParent: PropTypes.func,
  sidebarDefaultImage: PropTypes.string,
  sidebarImages: PropTypes.arrayOf(PropTypes.string),
  // these are colors that can be passed to the Badge component
  backgroundColors: PropTypes.arrayOf(PropTypes.string),
};

export default FixedPlugin;
