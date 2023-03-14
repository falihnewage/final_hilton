import React, { useEffect, useState } from "react";
import axios from '../../Axios'
import { Label } from "reactstrap";
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { Label } from "reactstrap";
import { Alert, message, Spin } from "antd";

const Editpage = () => {
  const [property, setproperty] = useState()
  const [loading, setloading] = useState(false)
  const navigate = useHistory();
  const { id } = useParams();
  const { type } = useParams();



  const getSingleProperty = async () => {
    setloading(true)
    await axios.get(`/property/${id}`,


    ).then((res) => {

      if (res.status == 200) {
        setproperty(res.data.data.property)
      }
    }).catch((err) => {

    }).finally(() => {
      setloading(false)
    })
  }

  const { register, handleSubmit, control, formState: { errors } } = useForm(
    {
      defaultValues: {
        "active": true,
        "name": property?.name,
        "number": property?.number,
        // "user_id": user_id,
        "general_manager": property?.general_manager,
        "regional_operator": property?.regional_operator,
        "sales_leader": property?.sales_leader,
        "property_type": property?.property_type
      }
    }
  )
  const onSubmit = async (data) => {

    await axios.put(`/property/${id}`, {
      "active": true,
      "name": data.name ? data.name : property?.name,
      "number": data.number ? data.number : property?.number,
      // "user_id": user_id,
      "general_manager": data.gm,
      "regional_operator": data.rg_manager,
      "sales_leader": data.acc_manager,
      "property_type": data.type
    },

    ).then((response) => {

      if (response.status === 200) {
        navigate.push(`/admin/Property/${parseInt(type) + 1}`)
        message.success('Property Updated Successfully')
      }
    })



  }
  useEffect(() => {
    getSingleProperty()
  }, [])

  return (
    <Container fluid>
      <h4 className="title mt-0">Edit Property</h4>
      <Card className="mb-3 p-md-5">
        <Card.Body>
          <Row>
            <Col lg="6">
              <Spin spinning={loading}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Label>Property Name</Label>
                    <Form.Control
                      {...register('name', {
                        required: 'Property Name is Required',
                        validate: (value) => !value.trim() == "",
                        maxLength: { value: 30, message: 'Must be less than 30 characters' }
                      })}
                      name='name'
                      defaultValue={property?.name}

                      placeholder=""></Form.Control>
                    {errors?.name?.type === 'required' && <Alert message={errors?.name.message} type="error" />}
                    {errors?.name?.type === "validate" && (
                      <Alert message="Property Name is Required" type="error" />
                    )}

                  </Form.Group>
                  <Form.Group>
                    <Label>Property Number</Label>
                    <Form.Control
                      placeholder=""
                      {...register('number', {
                        required: 'Property Number is Required',
                        validate: (value) => !value.trim() == "",
                        maxLength: { value: 30, message: 'Must be less than 30 characters' }
                      })}
                      name='number'
                      defaultValue={property?.number}
                    ></Form.Control>
                    {errors?.number?.type === 'required' && <Alert message={errors?.number.message} type="error" />}
                    {errors?.number?.type === "validate" && (
                      <Alert message="Property Number is Required" type="error" />
                    )}

                  </Form.Group>
                  <Form.Group>
                    <Label>General Manager</Label>
                    <Form.Control
                      placeholder=""
                      {...register('gm', {
                        required: 'General Manager is Required',
                        validate: (value) => !value.trim() == "",
                        maxLength: { value: 30, message: 'Must be less than 30 characters' }
                      })}
                      name='gm'
                      defaultValue={property?.general_manager}
                    ></Form.Control>
                    {errors?.gm?.type === 'required' && <Alert message={errors.gm.message} type="error" />}
                    {errors?.gm?.type === "validate" && (
                      <Alert message="General Manager is Required" type="error" />
                    )}

                  </Form.Group>
                  <Form.Group>
                    <Label>Regional Director of Operations</Label>
                    <Form.Control
                      name="rg_manager"
                      {...register('rg_manager', {
                        required: 'Regional Director of Operations is Required',
                        validate: (value) => !value.trim() == "",
                        maxLength: { value: 30, message: 'Must be less than 30 characters' }
                      })}
                      defaultValue={property?.regional_operator
                      }
                      placeholder=""></Form.Control>
                    {errors?.rg_manager?.type === 'required' && <Alert message="Regional Director of Operations is required" type="error" />}
                    {errors?.rg_manager?.type === "validate" && (
                      <Alert message="Regional Director of Operations is required" type="error" />
                    )}

                  </Form.Group>
                  <Form.Group>
                    <Label>Accounting Manager/Controller</Label>
                    <Form.Control
                      {...register('acc_manager', {
                        required: 'Accounting Manager is Required',
                        validate: (value) => !value.trim() == "",
                        maxLength: { value: 30, message: 'Must be less than 30 characters' }
                      })}
                      name='acc_manager'
                      defaultValue={property?.sales_leader}
                      placeholder=""></Form.Control>
                    {errors?.acc_manager?.type === 'required' && <Alert message="Accounting Manager is Required" type="error" />}
                    {errors?.acc_manager?.type === "validate" && (
                      <Alert message="Accounting Manager is Required" type="error" />
                    )}

                  </Form.Group>
                  <Form.Group>
                    <Label>Property Type</Label>
                    <select defaultValue={property?.property_type} style={{ width: '100%', height: '40px', border: '1px solid #AABBCC' }} className='Form.Control' {...register("type", { required: 'Property Type is required' })} name='type'>

                      {/* <option value={property?.property_type} selected disabled hidden>{property?.property_type}</option> */}
                      <option value='Limited Service' >Limited Service</option>
                      <option value='Complete Service' >Complete Service</option>

                    </select>
                    {errors?.type && <Alert message={errors?.type.message} type="error" />}

                  </Form.Group>
                  <Row>
                    <Col md="6">
                      <Button className="btn w-100" type="submit" variant="primary">
                        Update
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button
                        className="btn w-100"
                        type="button"
                        onClick={() => navigate.push(`/admin/Property/${parseInt(type) + 1}`)}
                        variant="tn-outline-secondary"
                      >
                        CANCEL
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Spin>

            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Editpage