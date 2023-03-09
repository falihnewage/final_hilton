import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux/es/exports";
import axios from '../../Axios';
// import { useHistory } from "react-router";
import { useHistory } from "react-router-dom";
// react-bootstrap components
import { message } from "antd";
import {
  Button,
  Card, Col, Container, Form
} from "react-bootstrap";
import { setToken } from 'utils/utils';
import { setSession } from 'utils/utils';
import { setUid } from 'utils/utils';

const LoginPage = () => {
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  const [loading, setloading] = useState(false)
  const [token, settoken] = useState(false)
  const dispatch = useDispatch()
  const navigate = useHistory()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = async (data) => {
    // navigate.push('/admin/dashboard')

    setloading(true)

    await axios.post(`/auth/local`,
      {
        username: data.email,
        password: data.password,
        info: {
          role_id: 1
        },
        

      },{

        credentials:'include',
        withCredentials:true
      }
      
      ).then(async (res) => {

        setloading(false)
        

        message.success('Login Success')
        reset()
        // navigate.push('/admin/dashboard')

      }).catch((err) => {

        message.error(err.response.data.message || "Something went wrong")
      }).then(() => {
        setloading(false)
      })
    reset()
  }

  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 1000);
  });

  useEffect(() => {
    if (Cookies.get('token')) {
      window.location.href = "/admin/dashboard"
    }

  }, [token])


  return (
    <>
      <div
        className="full-page "
      >
        <div className="content d-flex align-items-center p-0">
          <Container>
            <Col className="mx-auto" lg="6" md="8">
              <Form onSubmit={handleSubmit(onSubmit)} action="" className="form" method="">
                <Card className={"card-login " + cardClasses}>
                  <Card.Header className="text-center pt-4">
                    <img
                      alt="..."
                      src={require("assets/img/logo.png").default}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          {...register('email',
                            {
                              required: 'Email address is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid E-mail Address',

                              }
                            }

                          )}
                          placeholder="Enter email"
                          type="email"
                          name="email"
                        ></Form.Control>
                        {errors?.email && <p className='text-danger'>{errors?.email.message}</p>}

                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          {...register('password',
                            {
                              required: 'Password is required',
                              minLength: { value: 6, message: 'Password must be minimum 6 characters' }
                            })}
                          name='password'
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                        {errors?.password && <p className='text-danger'>{errors?.password.message}</p>}

                      </Form.Group>
                      <Button disabled={loading} className="btn-lg w-100" type="submit" variant="warning">
                        Login

                      </Button>
                    </Card.Body>
                  </Card.Body>

                </Card>
              </Form>
            </Col>
          </Container>
        </div>

      </div>
    </>
  );
}

export default LoginPage;
