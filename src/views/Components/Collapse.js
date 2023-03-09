import { AppstoreAddOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import React, { useState } from "react";
const { Panel } = Collapse;
const { Option } = Select;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CollapseS = () => {
  const [expandIconPosition, setExpandIconPosition] = useState("start");

  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const onChange = (key) => {
    console.log(key);
  };



  return (
    <>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
      >
        <Panel header="Personnel File Maintenance " key="1" extra={<AppstoreAddOutlined />}>
          <div>{text}</div>
        </Panel>
        <Panel header="Record Retention:" key="2" extra={<AppstoreAddOutlined />}>
          <div>{text}</div>
        </Panel>
        <Panel header="Posting Requirements" key="3" extra={<AppstoreAddOutlined />}>
          <div>{text}</div>
        </Panel>
        <Panel header="Meetings" key="4" extra={<AppstoreAddOutlined />}>
          <div>{text}</div>
        </Panel>
        <Panel header="Legal Counsel" key="5" extra={<AppstoreAddOutlined />}>
          <div>{text}</div>
        </Panel>
      </Collapse>
    </>
  );
};

export default CollapseS;
