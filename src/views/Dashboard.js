import { useEffect, useState } from "react";

// react components used to create a SVG / Vector map
import { DatePicker, message, Spin } from 'antd';
import moment from "moment";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import axios from '../Axios';

const { RangePicker } = DatePicker;
import Chart from 'react-apexcharts'
// react-bootstrap components

import {
  Card, Col, Container,
  Row
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
const { allowedMaxDays, allowedDays, allowedRange,
  beforeToday, afterToday, combine } = DateRangePicker;

function Dashboard() {
  const [graphData, setgrapgData] = useState(

    {
      labels: [],
      series: [{
        name: 'Reports Generated',
        data: []
      }],
    }

  )

  const [dateTo, setdateTo] = useState(moment().format('YYYY-MM-DD'))
  const [dateFrom, setdateFrom] = useState(moment().subtract(7, 'd').format('YYYY-MM-DD'))

  const [dates, setDates] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useHistory()
  const disabledDate = (current) => {

    if (!dates) {
      return false;
    }
    const future = dates[0] && current.valueOf() > Date.now()
    const futuresec = dates[1] && current.valueOf() > Date.now()
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    // const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate || !!future || !!futuresec;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const getdata = async (toDate, fromDate) => {
    setloading(true)
    await axios.get(`/report/dashboard_statistics?&where={"from":${JSON.stringify(fromDate)},"to":${JSON.stringify(toDate)}}`,
    ).then((res) => {

      if (res.status == 200) {
        // labels: res?.data?.data?.dataarray[0],
        //   series.data: res?.data?.data?.dataarray[1]
        setgrapgData({
          series: [{
            data: res?.data?.data?.dataarray[1]
          }],
          labels: res?.data?.data?.dataarray[0],
        })
        setcData({
          options: {
            xaxis: {
              categories: res?.data?.data?.dataarray[0]
            }
          }
        })
      }
    }).catch((err) => {
      // console.log(err.response.data, 'error in qn page');

      if (err?.response?.data?.statusCode === 401) {
        navigate.push('/auth/login-page')
      } else {
        message.error(err.response.data.message || "Something went wrong")
      }
    }).finally(() => {
      setloading(false)
    })
  }

  const [cData, setcData] = useState({

    options: {
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }

      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      // title: {
      //   text: 'Report Generated by Week',
      //   align: 'left'
      // },
      grid: {
        row: {
          // colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    },



  })



  useEffect(() => {


    getdata(dateTo, dateFrom)
  }, [dateFrom, dateTo])


  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="5">
                    <div className="icon-big text-left icon-warning">
                      <i className="nc-icon nc-circle-09 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Link to={'/admin/Users'}><Card.Title as="h4">User Management</Card.Title></Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="5">
                    <div className="icon-big text-left icon-warning">
                      <i className="nc-icon nc-map-big text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Link to='/admin/Property'><Card.Title as="h4">Property Management</Card.Title></Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="5">
                    <div className="icon-big text-left icon-warning">
                      <i className="nc-icon nc-bullet-list-67 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Link to={'/admin/Question'}><Card.Title as="h4">Question Management</Card.Title></Link>

                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="5">
                    <div className="icon-big text-left icon-warning">
                      <i className="nc-icon nc-chart-bar-32 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Link to={'/admin/Recommendations'}><Card.Title as="h4">Report Management</Card.Title></Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>


        </Row>
        <Row></Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Reports Generated </Card.Title>
                <p className="card-category">Weekly counts</p>
                <>

                  <DateRangePicker
                    ranges={[]}
                    editable={false}
                    cleanable={false}
                    placeholder="Select Date"
                    defaultValue={[new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)), new Date(new Date().getTime())]}
                    format='yyyy-MM-dd'
                    onChange={(date) => {

                      setdateFrom(date[0] && moment(date[0]).format('YYYY-MM-DD'))
                      setdateTo(date[1] && moment(date[1]).format('YYYY-MM-DD'))
                    }}
                    disabledDate={combine(allowedMaxDays(7), afterToday())}
                  // disabledDate={combine(allowedMaxDays(7),
                  //   afterToday())}
                  />
                </>
              </Card.Header>
              <Card.Body>
                <Spin spinning={loading}>
                  <Chart options={cData.options} series={graphData?.series} type='line' height={400} width={'90%'} />

                </Spin>
                {/* <ChartistGraph
                  type="Line"
                  data={{
                    labels: graphData?.labels,
                    series: [
                      graphData?.series,
                    ],
                  }}
                  options={{
                    lineSmooth: true,
                    height: "260px",
                    axisY: {
                      offset: 40,
                      labelInterpolationFnc: function (value) {
                        return "" + value;
                      },
                    },
                    low: 10,
                    high: 110,
                    classNames: {
                      point: "ct-point ct-green",
                      line: "ct-line ct-green",
                    },
                    chartPadding: {
                      right: -25,
                    },
                  }}
                /> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;