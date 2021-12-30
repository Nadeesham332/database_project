// import backendNavbar from './backend_Navbar';
import Backendnavbar from '../Components/backend_Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
import moment from "moment";

import React from "react";

const AssessmentDB = () => {
  const [assessments, setAssessments] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [assessor, setAssessor] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [assessment, setAssessment] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [conError, setConError] = useState(false);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingError, setUpdatingError] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    axios.get('http://localhost/result-sheet-system/assessment_db.php')
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
    setCourseId(assessments[rowNum].Course_id);
    setAssessmentId(assessments[rowNum].Ass_id);
    setAssessment(assessments[rowNum].Assessment);
    setSupervisor(assessments[rowNum].Supervisor_id);
    setAssessor(assessments[rowNum].Assessor_id);
    setScheduledDate(assessments[rowNum].Scheduled_date);
    setLoginCode(assessments[rowNum].Ass_login_code);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }
  const timeFotmat = (e) => {
    e.preventDefault();
    let tempDate = e.target.value;
    const myArr = tempDate.split("T");
    let date = myArr[0] + " " + myArr[1];
    // console.log(date);
    setScheduledDate(date);
  }

  const updateAssessmentDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('course', courseId)
    form.append('assessmentId', assessmentId)
    form.append('assessCode', loginCode)
    form.append('assessment', assessment)
    form.append('supervisor', supervisor)
    form.append('assessor', assessor)
    form.append('schedDate', scheduledDate)

    axios.post('http://localhost/result-sheet-system/update_assessment.php', form)
      .then(res => {
        console.log(res.data);
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
  const handleDelete = (e) => {
    e.preventDefault();
    let rowNum = e.currentTarget.getAttribute('id');
    setCourseId(assessments[rowNum].Course_id);
    setAssessmentId(assessments[rowNum].Ass_id);
    // console.log(tempStId);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteData(true);
  }
  const deleteFromDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('course', courseId)
    form.append('assessment', assessmentId)

    axios.post('http://localhost/result-sheet-system/delete_assessmentDB.php', form)
      .then(res => {
        console.log('Success');
        // console.log(res.data);
      })
      .catch(
        (error) => {
          console.log('Database not connected!');

        })

    document.getElementById('app-root').style.filter = 'blur(0)';
    document.getElementById('app-root').style.pointerEvents = "all";
    setDeleteData(false);
    window.location.reload(false);

  }
  const insertAssessment = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('course', courseId)
    form.append('assessmentId', assessmentId)
    form.append('assessCode', loginCode)
    form.append('assessment', assessment)
    form.append('supervisor', supervisor)
    form.append('assessor', assessor)
    form.append('schedDate', scheduledDate)

    axios.post('http://localhost/result-sheet-system/insert_assessmentDB.php', form)
      .then(res => {
        console.log(res.data);
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
      <Backendnavbar />
      <section className="ftco-section" id="app-root">

        <div className="container">

          <div className="row justify-content-center">
            <div className="text-center mb-3">
              <h2 className="heading-section ">Assessment Database</h2>

            </div>
            {!(conError) && <div className='text-left'>
              <button className='mb-1 btn-center  btn-sm btn-outline-primary btn-round' onClick={() => {
                setInsert(true);
                document.getElementById('app-root').style.filter = 'blur(5px)';
                document.getElementById('app-root').style.pointerEvents = "none";
              }}><i className="fas fa-plus"></i> Add New </button>

            </div>}

          </div>
          <div className="row">
            <div className="col-md-12">
              {!(conError) && <div className="table-responsive-sm crudAssessTabel">

                <table className="table table-bordered table-dark table-hover">
                  <thead className='text-center'>
                    <tr>
                      <th className="align-middle">#</th>
                      <th className="align-middle">Course ID</th>
                      <th className="align-middle">Assessment ID</th>
                      <th className="align-middle">Assessment</th>
                      <th className="align-middle">Supervisor ID</th>
                      <th className="align-middle">Assessor ID</th>
                      <th className="align-middle">Scheduled Date</th>
                      <th className="align-middle">Assessment LogIn Code</th>
                      <th className="align-middle">Edit</th>
                      <th className="align-middle">Delete</th>
                    </tr>

                  </thead>
                  <tbody>

                    {assessments.map((result) => {
                      cnt++;
                      return (
                        <tr key={cnt}>
                          <td className='text-center'>{cnt}</td>
                          <td>{result.Course_id}</td>
                          <td>{result.Ass_id}</td>
                          <td >{result.Assessment}</td>
                          <td>{result.Supervisor_id}</td>
                          <td>{result.Assessor_id}</td>
                          <td>{result.Scheduled_date}</td>
                          <td>{result.Ass_login_code}</td>
                          <td className='text-center'><Button type='button' id={cnt - 1} onClick={handleUpdate} className='btn-primary' ><i className="fas fa-edit"></i></Button> </td>
                          <td className='text-center'> <Button className='btn-danger' id={cnt - 1} onClick={handleDelete}  ><i className="far fa-trash-alt"></i></Button> </td>
                        </tr>
                      )

                    })}
                  </tbody>
                </table>
              </div>}

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

              {conError && <h5 className="text-danger text-center">Connection Error!</h5>}
            </div>
          </div>

        </div>
      </section>

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
            <form onSubmit={updateAssessmentDB}>
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
                <input type="text" className="form-control" value={supervisor} name="supervisor" onChange={(e) => setSupervisor(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Assessor ID</label>
                <input type="text" className="form-control" value={assessor} name="assessor" onChange={(e) => setAssessor(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Scheduled Date</label>
                <input type="datetime-local" value={moment(scheduledDate).format("YYYY-MM-DDTHH:mm")} className="form-control" name="schedDate" onChange={timeFotmat} />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Assessor LogIn Code</label>
                <input type="text" className="form-control" maxLength="12" value={loginCode} name="assessCode" onChange={(e) => setLoginCode(e.target.value)} />
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

      {deleteData && <div className="modal-contents display-fixed " id="delete-content" autoFocus="autofocus" style={{ height: 350 }} tabIndex="-1">
        <div className="modal-header border-bottom-0">
          <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
            onClick={() => {
              setDeleteData(false);
              document.getElementById('app-root').style.filter = 'blur(0)';
              document.getElementById('app-root').style.pointerEvents = "all";
            }}><span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-title text-center">
            <h2 className='text-light mt-3'>Delete Assessment ?</h2>
          </div>
          <div className="d-flex flex-column text-center">
            <h6 className='text-light'>All records under this Assessemnt will be deleted. Are you sure you want to delete this Assessment?</h6>
            <br />
            <button type="button" className="btn btn-light btn-info btn-block btn-box"
              onClick={() => {
                setDeleteData(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}>Cancel
            </button>
            <button type="button" onClick={deleteFromDB} className="btn btn-danger btn-info btn-block btn-box">Delete</button>
          </div>
        </div>
      </div>}

      {insert && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 580 }} tabIndex="-1">

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
                <input type="text" className="form-control" placeholder="Course ID" name="course" onChange={(e) => setCourseId(e.target.value)} required />
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
                <input type="datetime-local" placeholder="Scheduled Date" className="form-control" name="schedDate" onChange={timeFotmat} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" maxLength="12" placeholder="Assessor LogIn Code" name="assessCode" onChange={(e) => setLoginCode(e.target.value)} />
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
    </>
  );
}

export default AssessmentDB;