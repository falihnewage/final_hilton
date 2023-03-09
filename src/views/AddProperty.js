import Cookies from "js-cookie";
import { useHistory, useParams } from "react-router-dom";
import axios from '../Axios';

import { Alert, message } from "antd";
import {
  Button,
  Card, Col, Container, Form, Row
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Label } from "reactstrap";
import { getUid } from "utils/utils";

function AddProperty() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useHistory();
  const user_id=getUid()
  const { id } = useParams();
  const onSubmit = async (data) => {
    
    data.type == "Limited Service" || "Complete Service" ?
      await axios.post(`/property`, {
        "name": data?.name,
        "number": data?.number,
        "user_id": user_id,
        "general_manager": data.gm,
        "regional_operator": data.rg_manager,
        "sales_leader": data.acc_manager,
        "property_type": data.type
      },
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        }).then((res) => {
          // console.log(res);
          if (res.status === 201) {
            message.success('Property Added Successfuly')
            reset()
            navigate.push(`/admin/property/${parseInt(id)+1}`)
          } else {
            message.error('something went wrong')
          }
        }) : message.error('something went wrong')


  }
  // useEffect(() => {

  // }, [])

  return (
    <Container fluid>
      <h4 className="title mt-0">Add Property</h4>
      <Card className="mb-3 p-md-5">
        <Card.Body>
          <Row>
            <Col lg="6">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Label>Property Name</Label>
                  <Form.Control
                    {...register('name',{
                      required: 'Property Name is Required',
                      validate: (value) => !value.trim() == "",
                      maxLength: { value: 90, message: 'Must be less than 90 characters' }
                    })}
                    name='name'

                    placeholder=""></Form.Control>
                    {/* {errors?.name && <p style={{ color: 'red' }}>{errors?.name.message}</p>} */}
                    {errors?.name?.type==='maxLength' && <Alert message={errors?.name.message} type="error" />}
                    {errors?.name?.type==='required' && <Alert message={errors?.name.message} type="error" />}
                    {errors?.name?.type === "validate" && (
                      <Alert message="Property Name is Required" type="error" />
                    )}
                </Form.Group>
                <Form.Group>
                  <Label>Property Number</Label>
                  <Form.Control
                    placeholder=""
                    {...register('number',{
                      required: 'Property Number is Required',
                      validate: (value) => !value.trim() == "",
                      maxLength: { value: 30, message: 'Must be less than 30 characters' }
                    })}
                    name='number'
                  ></Form.Control>
                    
                    {errors?.number?.type==='required'  && <Alert message={errors?.number.message} type="error" />}
                    {errors?.number?.type === "validate" && (
                      <Alert message="Property Number is Required" type="error" />
                    )}
                </Form.Group>
                <Form.Group>
                  <Label>General Manager</Label>
                  <Form.Control
                    placeholder=""
                    {...register('gm',{
                      required: 'General Manager is Required',
                      validate: (value) => !value.trim() == "",
                      maxLength: { value: 30, message: 'Must be less than 30 characters' }
                    })}
                    name='gm'
                  ></Form.Control>
                    {errors?.gm?.type==='required'   && <Alert message={errors.gm.message} type="error" />}
                    {errors?.gm?.type === "validate" && (
                      <Alert message="General Manager is Required" type="error" />
                    )}
                </Form.Group>
                <Form.Group>
                  <Label>Regional Director of Operations</Label>
                  <Form.Control
                    name="rg_manager"
                    {...register('rg_manager',{
                      required: 'Regional Director of Operations is Required',
                      validate: (value) => !value.trim() == "",
                      maxLength: { value: 30, message: 'Must be less than 30 characters' }
                    })}
                    placeholder=""></Form.Control>
                    {errors?.rg_manager?.type==='required'   && <Alert message="Regional Director of Operations is required" type="error" />}
                    {errors?.rg_manager?.type === "validate" && (
                      <Alert message="Regional Director of Operations is required" type="error" />
                    )}
                </Form.Group>
                <Form.Group>
                  <Label>Accounting Manager/Controller</Label>
                  <Form.Control
                    {...register('acc_manager',{
                      required: 'Accounting Manager is Required',
                      validate: (value) => !value.trim() == "",
                      maxLength: { value: 30, message: 'Must be less than 30 characters' }
                    })}
                    name='acc_manager'
                    placeholder=""></Form.Control>
                    {errors?.acc_manager?.type==='required' && <Alert message="Accounting Manager is Required" type="error" />}
                    {errors?.acc_manager?.type === "validate" && (
                      <Alert message="Accounting Manager is Required" type="error" />
                    )}
                </Form.Group>
                <Form.Group>
                  <Label>Property Type</Label>
                  <br/>
                  <select style={{width:'100%',height:'40px',border:'1px solid #AABBCC'}} className='Form.Control' {...register("type", { required: 'Property Type is required' })} name='type'>

                    <option value='' selected  disabled hidden>Select</option>
                    <option value='Limited Service' >Limited Service</option>
                    <option value='Complete Service' >Complete Service</option>
                    
                                                        </select>
                    {errors?.type && <Alert message={errors?.type.message} type="error" /> }

                  {/* <Form.Control
                    {...register('type')}
                    placeholder=""
                    name="type"></Form.Control> */}
                </Form.Group>
                <Row>
                  <Col md="6">
                    <Button className="btn w-100" type="submit" variant="primary">
                      SUBMIT
                    </Button>
                  </Col>
                  <Col md="6">
                    <Button 
                    
                      className="btn w-100"
                      type="button"
                      onClick={()=>navigate.push(`/admin/property/${parseInt(id)+1}`)}
                      variant="tn-outline-secondary"
                    >
                      CANCEL
                    </Button>
                  </Col>
                </Row>
              </Form>

            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddProperty;
