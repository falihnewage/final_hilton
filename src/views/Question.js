import { Alert, message, Popconfirm, Select, Spin } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDrag, useDrop } from "react-dnd";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Label } from "reactstrap";
import axios from '../Axios';
import EditQuestion from "./Pages/EditQuestion";

const type = "DraggableBodyRow";

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const { Option } = Select;

  const ref = useRef(null);
  // const [{ isOver, dropClassName }, drop] = useDrop({
  //   accept: type,
  //   collect: (monitor) => {
  //     const { index: dragIndex } = monitor.getItem() || {};

  //     if (dragIndex === index) {
  //       return {};
  //     }

  //     return {
  //       isOver: monitor.isOver(),
  //       dropClassName:
  //         dragIndex < index ? " drop-over-downward" : " drop-over-upward",
  //     };
  //   },
  //   drop: (item) => {
  //     moveRow(item.index, index);
  //   },
  // });
  // const [, drag] = useDrag({
  //   type,
  //   item: {
  //     index,
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{
        cursor: "move",
        ...style,
      }}
      {...restProps}
    />
  );
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const App = () => {
  const dispatch = useDispatch()
  const [categories, setcategories] = useState([])
  const [newcategories, setnewcategories] = useState([])
  const [subcategories, setsubcategories] = useState([])
  const [categoryQuestions, setcategoryQuestions] = useState([])
  const [category_id, setcategory_id] = useState(categories?.filter((item) => item._id === category_id)[0]?._id)
  const [refetch, setrefetch] = useState(false)
  const [modal, setModal] = useState(false);
  const [Editmodal, setEditModal] = useState(false);
  const [currentItem, setcurrentItem] = useState({});
  const [testItem, settestItem] = useState({});
  const [currentEditItem, setcurrentEditItem] = useState({});
  const [show, setshow] = useState(false)
  const [loading, setloading] = useState(false)
  const [questionIndex, setquestionIndex] = useState()
  const [editReFetch, seteditReFetch] = useState(false)

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()


  function getReportQuestions(report_items = []) {
    const objectData = report_items?.reduce(function (rv, x) {
      (rv[x["category_id"]] = rv[x["category_id"]] || []).push(x);
      return rv;
    }, {});
    return Object?.keys(objectData)?.map((key) => ({
      questions: [objectData[key]] || [],
      title: [objectData[key]][0][0]?.category_name || null,
      count: [objectData[key]][0].length,
      completed_count: [objectData[key]][0].filter((q) => q.is_completed).length,
      completed: (
        ([objectData[key]][0].filter((q) => q.is_completed).length /
          [objectData[key]][0].length) *
        100
      ).toFixed(2),
      category_id: [objectData[key]][0][0]?.category_id || null,
      active_question_index: [objectData[key]][0][0]?._id,
      touched: false
    }));
  }

  // category data
  const getCategoryData = async () => {
    setloading(true)
    await axios.get(`/category`,
    ).then((res) => {
      setloading(true)
      if (res.status == 200) {
        setnewcategories(res.data.data.categories)
        // setcategory_id(res.data.data.categories[0]?._id)

      }
    }).catch((err) => {

    }).then(() => {
      setloading(false)
    })
  }


  // 


  const getdata = async () => {
    setloading(true)
    await axios.get(`/category_question?offset=0&limit=-1`,
    ).then(async (res) => {

      if (res.status == 200) {


        const question = await getReportQuestions(res.data.data.category_questions)

        setcategories(question)
        setcategory_id(question[0]?.category_id)


      }
    }).catch((err) => {
      message.warn('Something went wrong')
    }).finally(() => {
      setloading(false)
    })
  }

  const getAllSubCategory = async () => {
    setloading(true)
    await axios.get(`/sub_category?offset=0&limit=10&where=%7B%22category_id%22%3A%22${category_id}%22%7D`,

    ).then((response) => {

      setsubcategories(response.data.data.sub_categories)
    }).catch((err) => {
      console.log(err.response.data, 'error in qn page');
    }).finally(() => {

      setloading(false)
    })

  }

  const getAllCategoryQuestions = async () => {
    await axios.get(`/category_question?offset=0&limit=-1&where=%7B%22category_id%22%3A%22${category_id}%22%7D`,

    ).then((response) => {

      setcategoryQuestions(response.data.data.category_questions)
    }).catch((err) => {

    })

  }

  // function to delete question using ID
  const deleteQuestionById = async (id) => {
    setrefetch(true)
    await axios.delete(`/category_question/${id}`,

    ).then((response) => {
      // console.log(response);
      response.data.message === "Deleted" && message.success('Question Deleted Successfully')
      // setcategoryQuestions(response.data.data.category_questions)
      // console.log('fn triggered');


      // setrefetch(false)
    }).catch((err) => {

      message.error('Something went wrong')
    }).finally(() => {
      setrefetch(false)
    })

  }
  // function to delete question using ID

  // function to Add new question
  const addQuestion = async (data) => {

    await axios.post(`/category_question`,
      {
        "sub_category_id": currentItem._id,
        "sub_category_name": currentItem?.name,
        "category_id": category_id,
        "category_name": categories?.filter((item) => item.category_id === category_id)[0]?.title,
        "question": data?.question,
        "points_available": data.available,
        "points_applicable": data?.applicable,
        "serial": 0,
        "question_type": "normal",
        "category_index": newcategories?.find((item) => item._id === category_id)?.index,
        "sub_category_index": currentItem.index,
        "question_index": questionIndex === -Infinity ? 1 : questionIndex

      },
    ).then((response) => {

      if (response.statusText === "Created") {
        setModal(!modal)
        // setrefetch(true)

        reset()
        setcurrentItem({})
        message.success('Question Created Successfully')
        // setrefetch(false)
      }
    }).catch((err) => {

    })

  }
  // function to Add new question


  // Function to get question by ID
  const GetQuestionbyId = async () => {
    if (currentEditItem?._id) {
      await axios.get(`/category_question/${currentEditItem?._id}`,

      ).then((response) => {

        if (response.status === 200) {
          setcurrentEditItem(response.data.data.category_question)
        }
      }).catch((err) => {

      })
    }

  }
  // Function to get question by ID


  const confirm = (e) => {

    deleteQuestionById(e)

  };

  const onSubmit = async (data) => {


    addQuestion(data)

  }



  const handleAddModal = (item) => {

    setcurrentItem(item)
    setModal(!modal)
  }
  const handleEditModal = (item) => {

    settestItem(item)
    setshow(!show)
    // setcurrentItem(item)
    // setEditModal(!Editmodal)
  }





  useEffect(() => {
    // dispatch(Login())
    getdata()


  }, [])

  useEffect(() => {
    getCategoryData()
    category_id && getAllSubCategory()
    category_id && getAllCategoryQuestions()
  }, [category_id, refetch, currentItem])

  useEffect(() => {
    GetQuestionbyId()
  }, [Editmodal])


  const sorted = subcategories?.sort((a, b) => a.index - b.index)

  const heading = useMemo(() => categories?.filter((item) => item.category_id === category_id)[0]?.title,
    [categories, category_id])
  return (
    <>
      <div className="row mb-3">
        {/* Add Question Modal */}
        <Modal
          className=" modal-primary"
          onHide={() => setModal(!modal)}
          show={modal}
        >

          <Modal.Body className="text-center m-3">

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Label>Question</Label>
                <Form.Control
                  {...register('question', {
                    required: 'Question is Required',
                    validate: (value) => !value.trim() == "",
                    maxLength: { value: 150, message: 'Question must be less than 150 characters' }
                  })}
                  name='question'
                  // style={{wordBreak:'break-all'}}

                  placeholder=""></Form.Control>
                {/* {errors?.name && <p style={{ color: 'red' }}>{errors?.name.message}</p>} */}
                {errors?.question?.type === 'maxLength' && <Alert message={errors?.question.message} type="error" />}
                {errors?.question?.type === 'required' && <Alert message={errors?.question.message} type="error" />}
                {errors?.question?.type === "validate" && (
                  <Alert message="Question is Required" type="error" />
                )}
              </Form.Group>
              <Form.Group>
                <Label>Item Point Available</Label>
                <Form.Control
                  placeholder=""
                  {...register('available', {
                    required: 'Points available is Required',
                    // validate: (value) => !value.trim() == "",
                    validate: (value) => value > 0,
                    pattern: /\d+/,
                    maxLength: 3
                  })}
                  name='available'
                  type="number"
                ></Form.Control>
                {errors?.available?.type === "pattern" && <Alert message="Point available must be numbers" type="error" />}
                {errors?.available?.type === "maxLength" && <Alert message="Point available must be less than 3 digits " type="error" />}

                {/* {errors.available.type === "valueAsNumber" && <Alert message="Points Must be numbers" type="error" />} */}
                {errors?.available?.type === 'required' && <Alert message={errors?.available.message} type="error" />}
                {errors?.available?.type === "validate" && (
                  <Alert message="Point available must be numbers" type="error" />
                )}
              </Form.Group>
              <Form.Group>
                <Label>Total Point Applicable</Label>
                <Form.Control
                  placeholder=""
                  {...register('applicable', {
                    required: 'Point applicable is Required',
                    pattern: /\d+/,
                    // validate: (value) => !value.trim() == "",
                    validate: (value) => parseInt(watch('available')) >= parseInt(value),
                    maxLength: 3

                  })}
                  name='applicable'
                  type="number"
                ></Form.Control>
                { }
                {errors?.applicable?.type === "pattern" && <Alert message="Point applicable must be numbers" type="error" />}
                {errors?.applicable?.type === "maxLength" && <Alert message="Point applicable must be less than 3 digits " type="error" />}

                {errors?.applicable?.type === 'required' && <Alert message={errors?.applicable.message} type="error" />}
                {errors?.applicable?.type === "validate" && (
                  <Alert message="Points applicable should be less than points available" type="error" />
                )}
              </Form.Group>


              <div className="modal-footer">
                <Button
                  className="btn-simple btn-danger"
                  onClick={() => {
                    setModal(!modal)
                    reset()
                  }}
                // variant="link"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-simple"

                >
                  Add
                </Button>
              </div>


            </Form>
          </Modal.Body>

        </Modal>
        {/* Add Question Modal End */}

        {/* Edit Question Modal  */}
        {show && <EditQuestion show={show} testItem={testItem} setshow={setshow} currentEditItem={currentEditItem} setrefetch={setrefetch} seteditReFetch={seteditReFetch} />}

        {/* Edit Question Modal End */}



        <Col lg="9">
          <h4 className="title mt-0">Question Management</h4>

        </Col>
        <Col lg="3">
          <select name='category_option' {...register("category_option", { required: 'State is required' })} className="w-100" onChange={(categoryId) => { setcategory_id(categoryId.target.value) }}>
            <option defaultValue={categories[0]?.category_id} value={categories[0]?.category_id} hidden>{categories[0]?.title}</option>

            {
              categories?.map((categorie, i) => (

                <option key={i} value={categorie.category_id}>{categorie.title}</option>
              ))
            }

          </select>

        </Col>
      </div>

      <div className="table-responsive overflow-auto">
        <Spin spinning={loading}>
          <table className="table">
            <thead>
              <tr style={{ backgroundColor: '#0f569e' }} className="top-hed">
                <th scope="col"><h5 className="text-white ">{heading}</h5></th>
                <th scope="col" className="text-white text-center">ITEM POINTS AVAILABLE</th>
                <th scope="col" className="text-white text-center">TOTAL Points Applicable</th>
                <th className="text-right">
                  {/* <button type="submit" class="btn btn-primary btn-md" >
                  ADD TITLE
                </button> */}
                  <a
                    onClick={() => {

                      setModal(!modal)
                      {
                        const itemSET = categoryQuestions?.filter((item) => !item.sub_category_name).map((quest) => quest.question_index)
                        setquestionIndex(Math.max(...itemSET) + 1)

                      }

                    }
                    }

                    className="p-3">
                    <i className="fa fa-plus text-light"></i>
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryQuestions && categoryQuestions.filter((item) => !item.sub_category_name).map((questions, i) => (
                <tr key={i} className="bg-sec">
                  <td className="font-weight-normal">{questions.question} </td>
                  <td className="text-center">{questions.points_available}</td>
                  <td className="text-center">{questions.points_applicable}</td>
                  <td className="text-right">
                    <a onClick={() => handleEditModal(questions)} className="p-3">
                      <i className="fa fa-edit text-primary"></i>
                    </a>

                    <Popconfirm
                      title="Are you sure to delete this question?"
                      onConfirm={() => confirm(questions._id)}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >


                      <a

                        href="#" className="p-3">
                        <i className="fa fa-trash text-danger"></i>
                      </a>
                    </Popconfirm>
                  </td>
                </tr>
              ))}


              {
                sorted?.map((sub, i) => (
                  <>
                    <tr className="py-3 bg-first">
                      <td colSpan={3} className="py-2"><h6 className="font-weight-bold m-0">{sub.name}  </h6></td>
                      <td className="text-right">
                        <a onClick={() => {
                          handleAddModal(sub)
                          {
                            const itemSET = categoryQuestions?.filter((item) => item.sub_category_name == sub.name).map((quest) => quest.question_index)
                            setquestionIndex(Math.max(...itemSET) + 1)

                          }
                          // alert(categoryQuestions?.filter((item)=>item.sub_category_name == sub.name).map((quest)=>quest.question_index >10 ?true:false))
                        }} className="p-3">
                          <i className="fa fa-plus text-primary"></i>
                        </a>
                        {/* <a href="#" className="p-3">
                      <i class="fa fa-trash text-danger"></i>
                    </a> */}
                      </td >
                    </tr>

                    {categoryQuestions && categoryQuestions.filter((item) => item.sub_category_name == sub.name).map((questions, i) =>
                    (
                      <tr key={i} className="bg-sec">
                        <td className="font-weight-normal ">{questions.question} </td>
                        <td className="text-center">{questions.points_available}</td>
                        <td className="text-center">{questions.points_applicable}</td>
                        <td className="text-right">
                          <a onClick={() => handleEditModal(questions)} className="p-3">
                            <i className="fa fa-edit text-primary"></i>
                          </a>
                          <Popconfirm
                            title="Are you sure to delete this question?"
                            onConfirm={() => confirm(questions._id)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <a

                              className="p-3">
                              <i className="fa fa-trash text-danger"></i>
                            </a>
                          </Popconfirm>
                        </td>
                      </tr>
                    )

                    )}
                  </>
                ))
              }

            </tbody>
          </table>
        </Spin>

      </div>


      <div className="row">
        <Col lg="12">
          {/* <CollapseS /> */}
        </Col>
      </div>


    </>
  );
};
export default App;