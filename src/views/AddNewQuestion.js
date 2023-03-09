// import { Alert, message } from 'antd'
// import axios from '../Axios'
// import Cookies from 'js-cookie'
// import React, { useState } from 'react'
// import { Button, Form, Modal } from 'react-bootstrap'
// import { useForm } from 'react-hook-form'
// import { Label } from 'reactstrap'

// const AddNewQuestion = () => {
//     const [modal, setModal] = useState(false);
    
//     const { register, handleSubmit, formState: { errors }, reset } = useForm()

//     const addQuestion = async (data) => {
//         data.applicable > data.available ? message.info('must be lessthan applicable'):
//         await axios.post(`/category_question`,
//           {
//             "sub_category_id": "633e6d30eb4e33c60cd53980",
//             "sub_category_name": "",
//             "category_id": "633e6c63eb4e33c60cd53973",
//             "category_name": "Physical Inspection",
//             "question": data?.question,
//             "points_available": data.available,
//             "points_applicable": data?.applicable,
//             "serial": 1,
//             "question_type": "normal"
//           },
//           {
//             headers: { Authorization: `Bearer ${Cookies.get('token')}` }
//           }).then((response) => {
//             console.log(response, 'res after ques add');
//             if (response.statusText === "Created") {
//               setModal(!modal)
//             //   setrefetch(true)
//             //   setrefetch(false)
//               message.success('Question Created Successfully')
//             }
//           }).catch((err) => {
//             console.log(err);
//           })
    
//       }

//     const onSubmit = async (data) => {
//         console.log(data, 'data');
    
//         addQuestion(data)
    
    
    
//         // data.type == "Limited Service" || "Complete Service" ?
//         //   await axios.post(`http://web.newagesme.com:3339/property`, {
//         //     "name": data?.name,
//         //     "number": data?.number,
//         //     "user_id": "63283b0382235c10ae84e639",
//         //     "general_manager": data.gm,
//         //     "regional_operator": data.rg_manager,
//         //     "sales_leader": data.acc_manager,
//         //     "property_type": data.type
//         //   },
//         //     {
//         //       headers: { Authorization: `Bearer ${Cookies.get('token')}` }
//         //     }).then((res) => {
//         //       console.log(res);
//         //       if (res.status === 201) {
//         //         message.success('Property Added Successfuly')
//         //         reset()
//         //         navigate.push('/admin/property')
//         //       } else {
//         //         message.error('something went wrong')
//         //       }
//         //     }) : message.error('something went wrong')
    
    
//       }
//   return (
//     <Modal
//           className=" modal-primary"
//           onHide={() => setModal(!modal)}
//           show={modal}
//         >
//           {/* <Modal.Header className="justify-content-center">
//             <div className="modal-profile">
//               <i className="nc-icon nc-bulb-63"></i>
//             </div>
//           </Modal.Header> */}
//           <Modal.Body className="text-center m-3">
//             <p>Always have an access to your profile</p>
//             <Form onSubmit={handleSubmit(onSubmit)}>
//               <Form.Group>
//                 <Label>Question</Label>
//                 <Form.Control
//                   {...register('question', {
//                     required: 'Question is Required',
//                     validate: (value) => !value.trim() == "",
//                     maxLength: { value: 30, message: 'Must be less than 30 characters' }
//                   })}
//                   name='question'

//                   placeholder=""></Form.Control>
//                 {/* {errors?.name && <p style={{ color: 'red' }}>{errors?.name.message}</p>} */}
//                 {errors?.question?.type === 'required' && <Alert message={errors?.question.message} type="error" />}
//                 {errors?.question?.type === "validate" && (
//                   <Alert message="Question is Required" type="error" />
//                 )}
//               </Form.Group>
//               <Form.Group>
//                 <Label>Points available</Label>
//                 <Form.Control
//                   placeholder=""
//                   {...register('available', {
//                     required: 'Points available is Required',
//                     validate: (value) => !value.trim() == "",
//                     maxLength: { value: 30, message: 'Must be less than 30 characters' }
//                   })}
//                   name='available'
//                 ></Form.Control>

//                 {errors?.available?.type === 'required' && <Alert message={errors?.available.message} type="error" />}
//                 {errors?.available?.type === "validate" && (
//                   <Alert message="Points available is Required" type="error" />
//                 )}
//               </Form.Group>
//               <Form.Group>
//                 <Label>Point Applicable</Label>
//                 <Form.Control
//                   placeholder=""
//                   {...register('applicable', {
//                     required: 'Point applicable is Required',
//                     validate: (value) => !value.trim() == "",
//                     maxLength: { value: 30, message: 'Must be less than 30 characters' }
//                   })}
//                   name='applicable'
//                 ></Form.Control>

//                 {errors?.applicable?.type === 'required' && <Alert message={errors?.applicable.message} type="error" />}
//                 {errors?.applicable?.type === "validate" && (
//                   <Alert message="Point applicable is Required" type="error" />
//                 )}
//               </Form.Group>


//               <div className="modal-footer">
//                 <Button
//                   className="btn-simple btn-danger"
//                   onClick={() => setModal(!modal)}
//                   // variant="link"
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="btn-simple"
//                   // onClick={() => setModal(!modal)}
//                   // variant="butt"
//                 >
//                   Add
//                 </Button>
//               </div>


//             </Form>
//           </Modal.Body>

//         </Modal>
//   )
// }

// export default AddNewQuestion