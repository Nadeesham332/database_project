import './CRUDassessment.css'
import LoggedNavbar from "../../Components/LoggedNavbar/LoggedNavbar";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import moment from "moment";

const CRUDassessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [course, setCourse] = useState('');
  const [assessment, setAssessment] = useState('');
  const [assessor, setAssessor] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [instructor, setInstructor] = useState('');
  const [update, setUpdate] = useState(false);
  const [insert, setInsert] = useState(false);
  const [deleteAssess, setDeleteAssess] = useState(false);
  const [instructorId, setInstructorId] = useState('');
  const [assessCode, setAssessCode] = useState('');
  const [schedDate, setSchedDate] = useState('');
  const [updatingError, setUpdatingError] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  const [deletingError, setDeletingError] = useState(false);
  const [conError, setConError] = useState(false);
  let cnt = -1;

  useEffect(() => {

    //get data in the session
    let data = localStorage.getItem('accessorDetails');
    data = JSON.parse(data);
    // console.log(data);

    setCourseId(data.Course_id);
    setInstructorId(data.Instructor_id);
    setCourse(data.Course);
    setInstructor(data.Instructor);


    let form = new FormData()
    form.append('course', data.Course_id)

    axios.post('http://localhost/result-sheet-system/crud_assessment.php', form)
      .then(res => {
        setAssessments(res.data);
        // console.log(res.data);
      })
      .catch(
        (error) => {
          console.log('Database not connected!');
          setConError(true);
        }
      );

  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();

    let rowNum = e.currentTarget.getAttribute('id');
    // console.log(rowNum);
    setAssessmentId(assessments[rowNum].Ass_id);
    setAssessment(assessments[rowNum].Assessment);
    setSupervisor(assessments[rowNum].Supervisor_id);
    setAssessor(assessments[rowNum].Assessor_id);
    setSchedDate(assessments[rowNum].Scheduled_date);
    setAssessCode(assessments[rowNum].Ass_login_code);

    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }
  const handleView = (e) => {
    e.preventDefault();

    let rowNum = e.currentTarget.getAttribute('id');

    let viewAssessment = {
      Course_id: courseId,
      Course: course,
      Instructor_id: instructorId,
      Instructor: instructor,
      Assessment_id: assessments[rowNum].Ass_id,
      Assessment: assessments[rowNum].Assessment,
      Supervisor: assessments[rowNum].sname,
      Assessor: assessments[rowNum].aname,
      Sched_Date: assessments[rowNum].Scheduled_date
    }

    //Add the session
    localStorage.setItem('viewAssessment', JSON.stringify(viewAssessment));

    //get data in the session
    let data = localStorage.getItem('viewAssessment');
    data = JSON.parse(data);
    console.log(data);
    window.location.href = `/ViewAssessment`;

  }

  const updateAssessment = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('course', courseId)
    form.append('assessmentId', assessmentId)
    form.append('assessCode', assessCode)
    form.append('assessment', assessment)
    form.append('supervisor', supervisor)
    form.append('assessor', assessor)
    form.append('schedDate', schedDate)

    axios.post('http://localhost/result-sheet-system/update_assessment.php', form)
      .then(res => {
        // console.log(res.data);
        if (res.data === 0) {
          setUpdate(false);
          setUpdatingError(true);
        }
        else {
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setUpdate(false);
          window.location.reload(false);
        }
      })
      .catch(
        (error) => {
          console.log('Database not connected!');
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setUpdate(false);
          setConError(true);
        })
  }

  const timeFotmat = (e) => {
    e.preventDefault();
    let tempDate = e.target.value;
    const myArr = tempDate.split("T");
    let date = myArr[0] + " " + myArr[1];
    // console.log(date);
    setSchedDate(date);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    let rowNum = e.currentTarget.getAttribute('id');
    // console.log(rowNum);
    setAssessmentId(assessments[rowNum].Ass_id);
    setSupervisor(assessments[rowNum].Supervisor_id);
    setAssessor(assessments[rowNum].Assessor_id);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteAssess(true);
  }

  const deleteFromDB = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('course', courseId)
    form.append('assessment', assessmentId)
    form.append('supervisor', supervisor)
    form.append('assessor', assessor)


    axios.post('http://localhost/result-sheet-system/delete_assessment.php', form)
      .then(res => {
        if (res.data) {
          console.log('Success');
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setDeleteAssess(false);
          window.location.reload(false);
        }
        else {
          setDeleteAssess(false);
          setDeletingError(true);
        }
      })




  }


  const insertAssessment = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('course', courseId)
    form.append('assessmentId', assessmentId)
    form.append('assessCode', assessCode)
    form.append('assessment', assessment)
    form.append('supervisor', supervisor)
    form.append('assessor', assessor)
    form.append('schedDate', schedDate)

    axios.post('http://localhost/result-sheet-system/insert_assessment.php', form)
      .then(res => {
        // console.log(res.data);
        if (res.data === 1) {
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setInsert(false);
          window.location.reload(false);

        }
        else {
          setInsert(false);
          setInsertingError(true);
        }
      })
      .catch(
        (error) => {
          console.log('Database not connected!');
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setInsert(false);
          setConError(true);
        })
  }


  return (

    <>
      <LoggedNavbar />
      <section className="ftco-section" >
        <div className="container" id="app-root" >

          <div className="row justify-content-center">
            <div className="text-center mb-5">
              <h2 className="heading-section">CRUD Assessments</h2>
            </div>
            <div className="iname" display="table">
              <div>
                <h5 className="text-left mb-3">Course ID: {courseId}</h5>
                <h5 className="text-left mb-3">Course: {course}</h5>
              </div>
              <div>

                <h5 className="text-left mb-3">Instructor ID: {instructorId}</h5>
                <h5 className="text-left mb-3">Instructor: {instructor}</h5>
              </div>
            </div>

          </div>

          <hr />

          <div className="row ">
            <div className="col-md-12 ">
              <div className=" table-responsive-sm  crudAssessTabel">

                {assessments.length !== 0 && <table className="table table-bordered table-dark table-hover">
                  <thead className='text-center '>
                    <tr>

                      <th >Assessment ID</th>
                      <th className="align-middle">Assesssment</th>
                      <th className="align-middle">Supervisor</th>
                      <th className="align-middle">Assessor</th>
                      <th className="align-middle">Scheduled Date</th>
                      <th>Assessor login code</th>
                      <th className="align-middle">View</th>
                      <th className="align-middle">Edit</th>
                      <th className="align-middle">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((result) => {
                      cnt = cnt + 1;
                      return (
                        <tr key={result.Ass_id}>
                          <td>{result.Ass_id}</td>
                          <td >{result.Assessment}</td>
                          <td>{result.sname}</td>
                          <td>{result.aname}</td>
                          <td>{result.Scheduled_date}</td>
                          <td>{result.Ass_login_code}</td>
                          <td className='text-center'><Button type='button' id={cnt} onClick={handleView} className='btn-success' ><i className="far fa-eye"></i></Button> </td>
                          <td className='text-center'><Button type='button' id={cnt} onClick={handleUpdate} className='btn-primary' ><i className="fas fa-edit"></i></Button> </td>
                          <td className='text-center'> <Button className='btn-danger' id={cnt} onClick={handleDelete} ><i className="far fa-trash-alt"></i></Button> </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>}
              </div>

              {!conError && <div className='text-center'>
                <button className='mt-5 btn-link btn-lg btn-outline-primary btn-round' onClick={() => {
                  setInsert(true);
                  document.getElementById('app-root').style.filter = 'blur(5px)';
                  document.getElementById('app-root').style.pointerEvents = "none";
                }}><i className="fas fa-plus"></i>
                </button>
                <div className='mt-1 text-primary' onClick={() => {
                  setInsert(true);
                  document.getElementById('app-root').style.filter = 'blur(5px)';
                  document.getElementById('app-root').style.pointerEvents = "none";
                }}><button className='btn btn-link' >Add New</button>
                </div>
              </div>}

              {conError && <h5 className="text-danger mt-5 text-center">Oops.. Connection Error...</h5>}

            </div>
          </div>
        </div>

        {update && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 600 }} tabIndex="-1">

          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setUpdate(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h4 className='text-light mt-3'>Update Assessment</h4>
            </div>

            <div className="d-flex flex-column text-center">
              <form onSubmit={updateAssessment}>
                <div className="form-group" >
                  <label className="text-light float-left">Course ID</label>
                  <input type="text" className="form-control" value={courseId} readOnly />
                </div>
                <div className="form-group">
                  <label className="text-light float-left">Assessment ID</label>
                  <input type="text" className="form-control" value={assessmentId} readOnly />
                </div>
                <div className="form-group">
                  <label className="text-light float-left">Assessment</label>
                  <input type="text" className="form-control" value={assessment} name="assessment" onChange={(e) => setAssessment(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="text-light float-left">Supervisor ID</label>
                  <input type="text" className="form-control" value={supervisor} name="supervisor" onChange={(e) => setSupervisor(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="text-light float-left">Assessor ID</label>
                  <input type="text" className="form-control" value={assessor} name="assessor" onChange={(e) => setAssessor(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="text-light float-left">Scheduled Date</label>
                  <input type="datetime-local" min={moment(new Date()).format("YYYY-MM-DDTHH:mm")} value={moment(schedDate).format("YYYY-MM-DDTHH:mm")} className="form-control" name="schedDate" onChange={timeFotmat} required />
                </div>
                <div className="form-group">
                  <label className="text-light float-left">Assessor LogIn Code</label>
                  <input type="text" className="form-control" maxLength="12" value={assessCode} name="assessCode" onChange={(e) => setAssessCode(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-info btn-block btn-round">Submit</button>
                <br />
              </form>
            </div>

          </div>
        </div>}


        {updatingError && <div className="modal-contents display-fixed " id="error-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setUpdatingError(false);
                setUpdate(true);
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-danger mt-5'>Updating Failed!</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Something went wrong. Please try again!</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => {
                  setUpdatingError(false);
                  setUpdate(true);
                }}>Close
              </button>
            </div>
          </div>
        </div>}

        {deletingError && <div className="modal-contents display-fixed " id="error-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setDeletingError(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-danger mt-4'>Deleting Failed!</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Result was released in this Assessment. If you want to delete further, ask the assessor to remove all results and try back...</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => {
                  setDeletingError(false);
                  document.getElementById('app-root').style.filter = 'blur(0)';
                  document.getElementById('app-root').style.pointerEvents = "all";
                }}>Close
              </button>
            </div>
          </div>
        </div>}

        {deleteAssess && <div className="modal-contents display-fixed " id="delete-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setDeleteAssess(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-light mt-3'>Delete Assessment</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Are you sure you want to delete this Assessment?</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => {
                  setDeleteAssess(false);
                  document.getElementById('app-root').style.filter = 'blur(0)';
                  document.getElementById('app-root').style.pointerEvents = "all";
                }}>Cancel
              </button>
              <button type="button" onClick={deleteFromDB} className="btn btn-danger btn-info btn-block btn-box">Delete</button>
            </div>
          </div>
        </div>}

        {insert && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 600 }} tabIndex="-1">

          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setInsert(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h4 className='text-light mt-3'>Insert an Assessment</h4>
            </div>

            <div className="d-flex flex-column text-center">
              <form onSubmit={insertAssessment}>
                <div className="form-group" >
                  <input type="text" className="form-control" value={"Course ID:" + courseId} readOnly />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Assessment ID" name="assessmentId" onChange={(e) => setAssessmentId(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Assessment" name="assessment" onChange={(e) => setAssessment(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Supervisor ID" name="supervisor" onChange={(e) => setSupervisor(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Assessor ID" name="assessor" onChange={(e) => setAssessor(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="datetime-local" min={moment(new Date()).format("YYYY-MM-DDTHH:mm")} placeholder="Scheduled Date" className="form-control" name="schedDate" onChange={timeFotmat} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" maxLength="12" placeholder="Assessor LogIn Code" name="assessCode" onChange={(e) => setAssessCode(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-info btn-block btn-round">Submit</button>
              </form>
            </div>
          </div>
        </div>}

        {insertingError && <div className="modal-contents display-fixed " id="error-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setInsertingError(false);
                setInsert(true);
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-danger mt-5'>Inserting Failed!</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Something went wrong. Please try again!</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => {
                  setInsertingError(false);
                  setInsert(true);
                }}>Close
              </button>
            </div>
          </div>
        </div>}
      </section>
      <Footer />
    </>
  );
}

export default CRUDassessments;