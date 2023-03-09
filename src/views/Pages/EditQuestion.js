import { Alert, message } from 'antd';
import axios from '../../Axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Label } from 'reactstrap';
import { ClearFetch } from 'utils/utils';

const EditQuestion = ({ show, setshow, testItem, setrefetch,seteditReFetch }) => {
    //   const [show, setShow] = useState(false);
    const [currentEditItem, setcurrentEditItem] = useState({});
    
    const handleClose = () => setshow(false);
    const handleShow = () => setshow(true);
    const GetQuestionbyId = async () => {
        
        await axios.get(`/category_question/${testItem?._id}`,

            {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            }).then((response) => {
                
                if (response.status === 200) {
                    setcurrentEditItem(response.data.data.category_question)
                }
            }).catch((err) => {
                
            })
    }
    const updateQuestionById = async ({ question_edit, available_edit, applicable_edit }) => {
        //    parseInt(applicable_edit)  >parseInt(available_edit)   ? message.info('Points applicable should be less than points available') :
        setrefetch(true)
        await axios.put(`/category_question/${testItem?._id}`,
            {
                "active": true,
                "sub_category_id": currentEditItem?.sub_category_id ? currentEditItem?.sub_category_id : null,
                "sub_category_name": currentEditItem?.sub_category_name ? currentEditItem?.sub_category_name : null,
                "category_id": currentEditItem?.category_id,
                "category_name": currentEditItem?.category_name,
                "question": question_edit,
                "points_available": available_edit,
                "points_applicable": applicable_edit,
                "serial": 1,
                "question_type": currentEditItem?.question_type
            },
            {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            }).then((response) => {
                
                if (response.data.message === "Updated") {
                    
                    message.success("Question Updated")
                    
                    
                    // ClearFetch(setrefetch(false))
                    
                    setshow(!show)
                    

                }
            }).catch((err) => {

            }).finally(()=>{
                setrefetch(false) 
            })
    }
   
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(
        {
            defaultValues: {
                "question_edit": currentEditItem?.question,
                "available_edit": currentEditItem?.points_available,
                "applicable_edit": currentEditItem?.points_applicable
            }
        }
    )
    const onSubmit = async (data) => {
        

        updateQuestionById(data)
    }



    useEffect(() => {
        GetQuestionbyId()


    }, [testItem?._id])
    
    return (
        <>
            

            <Modal show={show} onHide={handleClose} size={currentEditItem.question_type === "grid4"&& currentEditItem.question_type === "list1" || 'xl'}>
                
                {currentEditItem?.question && <Modal.Body className="text-center m-3">
                    {/* <p>Always have an access to your profile</p> */}
                    <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Group>
                            <Label>Question</Label>
                            <Form.Control
                                {...register('question_edit', {
                                    required: 'Question is Required',
                                    validate: (value) => !value.trim() == "",
                                    // validate: (value) => value > 0,
                                    maxLength: { value: 150, message: 'Question must be less than 150 characters' }
                                })}
                                name='question_edit'
                                defaultValue={currentEditItem?.question}
                                placeholder=""></Form.Control>
                            {/* {errors?.name && <p style={{ color: 'red' }}>{errors?.name.message}</p>} */}
                            {errors?.question_edit?.type === 'maxLength' && <Alert message={errors?.question_edit.message} type="error" />}
                            {errors?.question_edit?.type === 'required' && <Alert message={errors?.question_edit.message} type="error" />}
                            {errors?.question_edit?.type === "validate" && (
                                <Alert message="Question is Required" type="error" />
                            )}
                        </Form.Group>
                        <div style={{ overflow: 'overlay' }} >

                            {

                                currentEditItem?.question_type === "grid2" &&

                                <>

                                    {currentEditItem?.extras?.map((item,i) => (
                                        <table key={i} className="table table-bordered table-xs" size="xs">
                                            <thead>
                                                <tr>
                                                    {item.headings.map((heading,i) => (
                                                        <th key={i}>{heading}</th>
                                                    ))}

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.questions.map((ques,i) => (
                                                    <tr key={i}>
                                                        <td>{ques.title}</td>
                                                        <td>{ques.value1}</td>
                                                        <td>{ques.value2}</td>
                                                        <td>{ques.variation}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                        
                                    ))}




                                </>
                            }
                            {currentEditItem?.question_type.startsWith('g') &&
                                <table className="table table-bordered " size="sm">


                                    <thead>
                                        <tr>
                                            {currentEditItem.question_type === "grid1" && currentEditItem?.extras?.map((item,i) => (
                                                < >
                                                    {item.headings.map((heading) => (


                                                        <>
                                                            {/* <th scope="col"></th> */}
                                                            <th scope="col">{heading}</th>

                                                        </>

                                                    ))}
                                                </>
                                            ))}
                                            {currentEditItem.question_type === "grid3" && currentEditItem?.extras?.map((item) => (
                                                <>
                                                    {item.headings.map((heading) => (


                                                        <>
                                                            {/* <th scope="col"></th> */}
                                                            <th scope="col">{heading}</th>

                                                        </>

                                                    ))}
                                                </>
                                            ))}
                                            {currentEditItem.question_type === "grid4" &&
                                                <>
                                                    <th></th>
                                                    <th>label1</th>
                                                    <th>label2</th>
                                                    <th>label3</th>
                                                    <th>label4</th>
                                                    <th>label5</th>

                                                </>
                                            }
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {currentEditItem?.question_type !== "grid2" && currentEditItem?.extras?.map((item) => (
                                            <>
                                                {item.questions.map((ques) => (
                                                    <tr>

                                                        <td>{ques.title}</td>
                                                        {currentEditItem.question_type === "grid1" && currentEditItem.question_type === "grid3" || <td>{ques.value1}</td>}
                                                        {currentEditItem.question_type === "grid1" && currentEditItem.question_type === "grid3" || <td>{ques.value2}</td>}
                                                        {currentEditItem.question_type === "grid1" && <td>{ques.variation}</td>}
                                                        {currentEditItem.question_type === "grid4" &&
                                                            <>
                                                                {/* <td>{ques.value1}</td>
                                           <td>{ques.value2}</td> */}
                                                                <td>{ques.value3}</td>
                                                                <td>{ques.value4}</td>
                                                                <td>{ques.value5}</td>
                                                            </>


                                                        }
                                                    </tr>
                                                ))}

                                            </>
                                        ))}



                                    </tbody>
                                </table>

                            }
                            {
                                currentEditItem?.question_type.startsWith('s') &&
                                <div>
                                    {/* {item.questions.map((ques) => (
                                        <>
                                        <h6>{ques.title}</h6>
                                        <h6>{ques.value}</h6>
                                        </>
                                    ))} */}
                                    {currentEditItem?.extras?.map((item) => (
                                        <>
                                            {item.questions.map((ques) => (
                                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '3%' }}>
                                                    <td>{ques.title}:</td>
                                                    {/* <h6>{ques.value}</h6> */}
                                                    {/* <input defaultValue={ques.value} /> */}
                                                    <Form.Control
                                                        disabled
                                                        style={{ width: '32%' }}
                                                        defaultValue={ques.value}
                                                        placeholder=""
                                                        {...register('ques', {
                                                            // required: 'Points available is Required',
                                                            // validate: (value) => !value.trim() == "",
                                                            pattern: /\d+/,
                                                            // validate: (value) => value > 0,
                                                            // valueAsNumber: true,
                                                            // maxLength: 3,
                                                        })}
                                                        name='available_edit'
                                                        type="text"
                                                    ></Form.Control>
                                                </div>
                                            ))}

                                        </>
                                    ))}

                                </div>
                            }
                            {
                                currentEditItem?.question_type.startsWith('l') &&
                                <div className='mb-2' >
                                    {/* {item.questions.map((ques) => (
                                        <>
                                        <h6>{ques.title}</h6>
                                        <h6>{ques.value}</h6>
                                        </>
                                    ))} */}
                                    {currentEditItem?.extras?.map((item) => (
                                        <div style={{display:'flex' ,width:'100%'}}>
                                           
                                            <div style={{wordWrap:'break-word', width:'90%'}} className='left-ques' >
                                                <p></p>
                                                {/* <li>{item}</li> */}
                                                <td style={{ textDecoration: "none" }} >- {item}</td>
                                            </div>

                                            <div style={{justifyContent:'flex-end'}} className='right-ques' >
                                                <input style={{width:'48%',height:'80%'}} disabled />
                                            </div>



                                        </div >
                                    ))}

                                </div>
                            }


                        </div>
                        <Form.Group>
                            <Label>Item Point Available</Label>
                            <Form.Control
                                defaultValue={currentEditItem?.points_available}
                                placeholder=""
                                {...register('available_edit', {
                                    required: 'Points available is Required',
                                    // validate: (value) => !value.trim() == "",
                                    pattern: /\d+/,
                                    validate: (value) => value > 0,
                                    // valueAsNumber: true,
                                    maxLength: 3,
                                })}
                                name='available_edit'
                                type="number"
                            ></Form.Control>
                            {/* {errors?.available_edit?.type === "pattern" && <Alert message='Point must be number' type="error" />} */}

                            {errors?.available_edit?.type === "maxLength" && <Alert message="Point availabe must be lessthan 3 digits " type="error" />}
                            {errors?.available_edit?.type === "pattern" && <Alert message="Point availabe must be numbers" type="error" />}
                            {errors?.available_edit?.type === 'required' && <Alert message={errors?.available_edit.message} type="error" />}
                            {errors?.available_edit?.type === "validate" && (
                                <Alert message="Points available must be numbers" type="error" />
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Label>Total Point Applicable</Label>
                            <Form.Control
                                defaultValue={currentEditItem?.points_applicable}
                                placeholder=""
                                {...register('applicable_edit', {
                                    required: 'Point applicable is Required',
                                    // validate: (value) => !value.trim() == "",
                                    // valueAsNumber: true,
                                    validate: (value) => parseInt(watch('available_edit')) >= parseInt(value),
                                    pattern: /\d+/,

                                    maxLength: 3
                                })}
                                name='applicable_edit'
                                type="number"
                            ></Form.Control>
                            {errors?.applicable_edit?.type === "pattern" && <Alert message="Point apllicable must be numbers" type="error" />}
                            {errors?.applicable_edit?.type === "maxLength" && <Alert message="Point applicable must be lessthan 3 digits " type="error" />}

                            {errors?.applicable_edit?.type === 'required' && <Alert message={errors?.applicable_edit.message} type="error" />}
                            {errors?.applicable_edit?.type === "validate" && (
                                <Alert message="Points applicable should be less than points available" type="error" />
                            )}
                        </Form.Group>


                        <div className="modal-footer">
                            <Button
                                className="btn-simple btn-danger"
                                onClick={() => {
                                    setshow(!show)
                                    reset()
                                    // setrefetch(true)
                                    // setrefetch(false)
                                    // setcurrentEditItem({

                                    // })


                                }}
                            // variant="link"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="btn-simple"
                            // onClick={() => setModal(!modal)}
                            // variant="butt"
                            >
                                Update
                            </Button>
                        </div>



                    </Form>
                </Modal.Body>}

            </Modal>
        </>
    );
}
export default EditQuestion
