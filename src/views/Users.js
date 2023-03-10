import React, { useEffect, useState } from "react";
// import Select from "react-select";
import { Table } from 'antd';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  // Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
// import { GetAllUser } from "Redux/Features/Userslice";
import axios from '../Axios'
import { MDBDataTable } from "mdbreact";

function ReactTables() {
  const [singleSelect, setSingleSelect] = React.useState("");
  const [multipleSelect, setMultipleSelect] = React.useState("");
  const [User, setUser] = useState([])
  const [Loading, setLoading] = useState(false)
  const [totalPages, settotalPages] = useState(1)
  const [basicData, setBasicData] = useState({
    // columns: Colums,
    rows: []
  });
  const dispatch = useDispatch()
  
  const [sort, setsort] = useState(null)
  const [sortingOrder, setsortingOrder] = useState({
    name: false,
    user_name: false,
    email: false,
    phone: false,

  });


  const columns = [
    {
      title: 'Manager Name',
      dataIndex: 'manager_Name',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["manager_name",${sortingOrder.name ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              name: !sortingOrder.name
            })
          }
        };
      },
      sorter: true,
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["full_name",${sortingOrder.user_name ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              user_name: !sortingOrder.user_name
            })
          }
        };
      },
      sorter: true,
      // width:'4%'
    },
    {
      title: 'Contact E-mail',
      dataIndex: 'Contact_Email',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["email",${sortingOrder.email ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              email: !sortingOrder.email
            })
          }
        };
      },
      sorter: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["phone",${sortingOrder.phone ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              phone: !sortingOrder.phone
            })
          }
        };
      },
      sorter: true,
    },
  ];


  const onChange = (pagination, filters, sorter, extra) => {

  };




  const getAllUsers = async (page) => {
    setLoading(true)
    await axios.get(`/hilton_user?offset=${page * 10}&limit=10&${sort && `sort=${sort}`}`, {

    },
      ).then((response) => {

        if (response.status === 200) {

          settotalPages(response.data.data.count)
          setUser(response.data.data.hilton_users)
          setBasicData({
            // columns: Colums,
            rows: response.data.data.hilton_users?.map((i,key) => (
              {
                key:key,
                name: i.full_name,
                Contact_Email: i.email,
                phone: i.phone,
                manager_Name: i.manager_name
              }
            ))
          })
          setLoading(false)

        }
      })
  }
  const data = basicData.rows

  useEffect(() => {
    getAllUsers(0).then((res) => {

    })
  }, [sort])


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            {totalPages &&
              <h4 className="title mt-0">
                Users <b>({totalPages})</b>
              </h4>

            }

            <Card>
              <Card.Body className="p-0">

                {/* <MDBDataTable data={basicData} /> */}
                <Table
                  pagination={
                    {
                      pageSize: 10,
                      total: totalPages,
                      onChange: (page,) => {

                        getAllUsers(page - 1)
                      }
                    }
                  }
                  loading={Loading}
                  columns={columns}
                  dataSource={data}
                  onChange={onChange} />

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReactTables;
