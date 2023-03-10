import { message, Popconfirm } from 'antd';
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from '../Axios';
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// react-bootstrap components
import {
  Col,
  // Table,
  Container,
  Row
} from "react-bootstrap";

// core components
// const history =useHistory()
// import { Navigate } from "react-big-calendar";
import { Table } from 'antd';
import { useDispatch } from "react-redux";



function ReactTables() {

  const [properties, setproperties] = useState([])
  const [currentPage, setcurrentPage] = useState(0)
  const [refetch, setrefetch] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [numberOfPages, setnumberOfPages] = useState(1)
  const navigate = useHistory();
  const dispatch = useDispatch()
  const history = useHistory()
  const [sort, setsort] = useState(null)
  const { id } = useParams();
  const [page, setpage] = useState(id == ':id' ? 0 : id - 1)

  const [sortingOrder, setsortingOrder] = useState({
    p_name: false,
    p_number: false,
    g_manager: false,
    r_director: false,
    a_manager: false,
    p_type: false,
  })


  const [basicData, setBasicData] = useState({
    // columns: Colums,
    rows: []
  });

  const columns = [
    {
      title: 'PROPERTY NAME',
      dataIndex: 'name',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["name",${sortingOrder.p_name ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              p_name: !sortingOrder.p_name
            })
          }
        };
      },
      sorter: true,
      width: '10%',
      responsive: ["sm"]
    },
    {
      title: 'PROPERTY NUMBER',
      dataIndex: 'number',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["number",${sortingOrder.p_number ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              p_number: !sortingOrder.p_number
            })
          }
        };
      },
      sorter: true,
      responsive: ["sm"]
    },
    {
      title: 'GENERAL MANAGER',
      dataIndex: 'general_manager',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["general_manager",${sortingOrder.g_manager ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              g_manager: !sortingOrder.g_manager
            })
          }
        };
      },
      ellipsis: false,
      sorter: true,

      responsive: ["sm"]
    },
    {
      title: 'REGIONAL DIRECTOR',
      dataIndex: 'regional_operator',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["regional_operator",${sortingOrder.r_director ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              r_director: !sortingOrder.r_director
            })
          }
        };
      },
      sorter: true,
      width: '10%',
      responsive: ["sm"]
    },
    {
      title: 'ACCOUNT MANAGER',
      dataIndex: 'accounting_manger',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["sales_leader",${sortingOrder.a_manager ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              a_manager: !sortingOrder.a_manager
            })
          }
        };
      },
      sorter: true,
      width: '10%',
      responsive: ["sm"]
    },
    {
      title: 'PROPERTY TYPE',
      dataIndex: 'property_type',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["property_type",${sortingOrder.p_type ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              p_type: !sortingOrder.p_type
            })
          }
        };
      },
      sorter: true,
      width: '10%',
      responsive: ["sm"]
    },
    {
      title: '',
      key: 'operation',
      // fixed: 'right',
      width: 100,
      render: (prop) => <p onClick={() => navigate.push(`/admin/edit-property/${prop?._id}/${page}`)} className="text-center">
        <a >
          <i className="fa fa-edit text-primary"></i>
        </a>
      </p>,
    },
    {
      title: '',
      key: 'operation',
      // fixed: 'right',
      width: 100,
      render: (item) => <Popconfirm
        title="Are you sure to delete this Property?"
        onConfirm={() => confirm(item?._id)}
        // onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >

        <p className="text-center">
          <a >
            <i

              className="fa fa-trash text-danger"></i>
          </a>
        </p>
      </Popconfirm>,
    },
  ];


  const onChange = (pagination, filters, sorter, extra) => {
    
  };

  const getdata = async () => {
    setLoading(true)
    await axios.get(`/property?offset=${page * 10}&limit=10&${sort && `sort=${sort}`}`,
      ).then((res) => {

        if (res.status == 200) {
          setproperties(res.data.data.properties)
          setnumberOfPages(res.data.data.count)
          setBasicData({

            rows: res.data.data.properties?.map((i, key) => (
              {
                key: key,
                _id: i._id,
                name: i.name,
                number: i.number,
                general_manager: i.general_manager,
                regional_operator: i.regional_operator,
                property_type: i.property_type,
                accounting_manger: i.sales_leader
              }
            ))
          })
          setLoading(false)
        }
      }).catch((err) => {
        message.warn('Something went wrong')
      })
  }
  const data = basicData.rows
  const deleteItem = (item) => {
    axios.delete(`/property/${item}`,
      ).then((response) => {

        if (response.statusText === "OK") {
          setrefetch(true)
          setpage(0)
          navigate.push(`/admin/Property/1`)
          message.success('Property Deleted Successfully');

          // setrefetch(false)


        }
      })


  }
  const confirm = (item) => {
    deleteItem(item)
  };


  useEffect(() => {
    getdata(0)
    // dispatch(Login())
    // dispatch(GetAllUser())
  }, [refetch, dispatch, sort, page])
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            {/* <MDBDataTable data={basicData} /> */}
            <Row className="align-items-center mb-3">
              <Col lg="10">
                <h4 className="title mt-0">
                  Property <b>({numberOfPages})</b>
                </h4>
              </Col>
              <Col lg="2">
                <button type="submit" className="btn btn-primary btn-md w-100"
                  onClick={() => navigate.push(`/admin/add-property/${page}`)}
                >
                  Add Property
                </button>
              </Col>
            </Row>
            {/* <Card>
              <Card.Body className="p-0"> */}

            <div className="overflow-auto">
              <Table
                pagination={{
                  pageSize: 10,
                  current:id == ':id' ? 1 : parseInt(id),
                  defaultCurrent: id == ':id' ? 1 : parseInt(id),
                  total: numberOfPages,
                  onChange: (pagenum,) => {
                    setpage(pagenum - 1)
                    
                    history.push(`/admin/Property/${pagenum}`)
                    // getdata(pagenum-1)
                  }
                }} size="small" loading={Loading}
                columns={columns}
                dataSource={data}
                onChange={onChange}

              />
            </div>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReactTables;
