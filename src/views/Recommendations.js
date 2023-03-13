import { message, Table } from 'antd';
import React, { useEffect, useState } from "react";
// react-bootstrap components
import {
  Card, Col,
  // Table,
  Container,
  Row
} from "react-bootstrap";

// core components
import moment from "moment";
import axios from "../Axios";
import { useHistory } from 'react-router';

function ReactTables() {
  
  const [Report, setReport] = useState([])
  const [Loading, setLoading] = useState(false)
  const [totalPages, settotalPages] = useState(1)
  const [sort, setsort] = useState(null)
  const [sortingOrder, setsortingOrder] = useState({
    p_name: false,
    r_manager: false,
    e_date: false,
    r_director: false,
    g_manager: false,
    a_manager: false,
  })
// fuction for assingning url in the <a> tag
  const openWindow =(url)=>{
    window.open(url, '_blank','noopener');
  }
  // fuction for assingning url in the <a> tag
  const [basicData, setBasicData] = useState({
    // columns: Colums,
    rows: []
  });
  const data = basicData.rows
  const columns = [
    {
      title: 'PROPERTY NAME',
      dataIndex: 'name',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["property_id.name", ${sortingOrder.p_name ? ` "desc" ` : ` "asc" `}]]`)
            setsortingOrder({
              p_name: !sortingOrder.p_name
            })
          }
        };
      },
      sorter: true,
      // width: '10%',
      responsive: ["sm"]
    },
    {
      title: 'Regional Manager',
      dataIndex: 'regional_manager',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["property_id.regional_operator",${sortingOrder.r_manager ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              r_manager: !sortingOrder.r_manager
            })
          }
        };
      },
      sorter: true,
      responsive: ["sm"]
    },
    {
      title: 'Evaluation Date',
      dataIndex: 'evaluation_date',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["evaluation_date",${sortingOrder.e_date ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              e_date: !sortingOrder.e_date
            })
          }
        };
      },
      ellipsis: false,
      sorter: true,

      responsive: ["sm"]
    },
    {
      title: 'General Manager',
      dataIndex: 'general_manger',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["property_id.general_manager",${sortingOrder.g_manager ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              g_manager: !sortingOrder.g_manager
            })
          }
        };
      },
      sorter: true,
      // width: '10%',
      responsive: ["sm"]
    },

    {
      title: 'Accounting Manager/Controller',
      dataIndex: 'accounting_manger',
      onHeaderCell: (column) => {
        return {
          onClick: () => {

            setsort(`[["property_id.sales_leader",${sortingOrder.a_manager ? `"desc"` : `"asc"`}]]`)
            setsortingOrder({
              a_manager: !sortingOrder.a_manager
            })
          }
        };
      },
      sorter: true,
      // width: '10%',
      responsive: ["sm"]
    },
    {
      title: '',
      key: 'operation',
      // fixed: 'right',
      width: 100,
      render: (prop) => <p className="text-center">
        
        <a  onClick={()=>openWindow(prop?.url)}><i className="fa fa-download text-center text-primary"></i></a>
      </p>,
    },

  ];
const navigate= useHistory()
  const getAllReports = async (page) => {
    setLoading(true)
    await axios.get(`/report?offset=${page * 10}&limit=10&where={"is_completed":true}&${sort && `sort=${sort}`}`,

      ).then((response) => {

        setReport(response.data.data.reports)
        settotalPages(response.data.data.count)
        if (response.status === 200) {
          setBasicData({

            rows: response.data.data.reports?.filter(item => item.is_completed).map((i, key) => (
              {
                key: key,
                _id: i._id,
                name: i.property_id.name,
                regional_manager: i.property_id.regional_operator,
                evaluation_date: moment(i.evaluation_date).format("MMM DD YYYY"),
                general_manger: i.property_id.general_manager,
                regional_operator: i.regional_operator,
                property_type: i.property_type,
                accounting_manger: i.property_id.sales_leader,
                url: i.pdf_path
              }
            ))
          })
          setLoading(false)
        }

      }).catch((err) => {
        
        if (err?.response?.data?.statusCode === 401) {
          navigate.push('/auth/login-page')
        } else {
          message.error(err.response.data.message || "Something went wrong")
        }
      })

  }


 
  useEffect(() => {
    getAllReports(0)
  }, [sort])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4 className="title mt-0">
              Report Management <b>({totalPages})</b>
            </h4>
            <Card>
              <Card.Body className="p-0">

                <div className="overflow-auto">
                  <Table
                    pagination={
                      {
                        total: totalPages,
                        pageSize: 10,
                        onChange: (page,) => {

                          getAllReports(page - 1)
                        }

                      }
                    }
                    size="small"
                    loading={Loading}
                    columns={columns}
                    dataSource={data}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReactTables;
