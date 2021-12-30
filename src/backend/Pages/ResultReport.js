import Backendnavbar from '../Components/backend_Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
import moment from "moment";

import React from "react";

const ResultReportDB = () => {
  const [results, setResults] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [conError, setConError] = useState(false);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    axios.get('http://localhost/result-sheet-system/results_db.php')
      .then(res => {
        setResults(res.data);
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
    setCourseId(results[rowNum].Course_id);
    setAssessmentId(results[rowNum].Ass_id);
    setUpdatedDate(results[rowNum].Updated_date);
    setStudentId(results[rowNum].Student_reg_no);
    setMarks(results[rowNum].Marks);
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
    setUpdatedDate(date);
  }

  const updateResultDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('course', courseId)
    form.append('assessmentId', assessmentId)
    form.append('student', studentId)
    form.append('marks', marks)
    form.append('upDate', updatedDate)

    axios.post('http://localhost/result-sheet-system/update_resultDB.php', form)
      .then(res => {
        console.log('Success');
        window.location.reload(false);

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
    setCourseId(results[rowNum].Course_id);
    setAssessmentId(results[rowNum].Ass_id);
    setStudentId(results[rowNum].Student_reg_no);
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
    form.append('student', studentId)

    axios.post('http://localhost/result-sheet-system/delete_result.php', form)
      .then(res => {
        console.log('Success');
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
  const insertResult = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('course', courseId)
    form.append('assessmentId', assessmentId)
    form.append('student', studentId)
    form.append('marks', marks)

    axios.post('http://localhost/result-sheet-system/insert_resultDB.php', form)
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
              <h2 className="heading-section ">Results Database</h2>

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
                      <th className="align-middle">Student Reg No</th>
                      <th className="align-middle">Course ID</th>
                      <th className="align-middle">Assessment ID</th>
                      <th className="align-middle">Marks</th>
                      <th className="align-middle">Updated Date</th>
                      <th className="align-middle">Edit</th>
                      <th className="align-middle">Delete</th>
                    </tr>

                  </thead>
                  <tbody>

                    {results.map((result) => {
                      cnt++;
                      return (
                        <tr key={cnt}>
                          <td className='text-center'>{cnt}</td>
                          <td>{result.Student_reg_no}</td>
                          <td>{result.Course_id}</td>
                          <td >{result.Ass_id}</td>
                          <td className='text-center'>{result.Marks}</td>
                          <td>{result.Updated_date}</td>
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

      {update && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 620 }} tabIndex="-1">

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
            <h4 className='text-light mt-3'>Update Results</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={updateResultDB}>
              <div className="form-group">
                <label className="text-light float-left">Student Reg No</label>
                <input type="text" className="form-control" value={studentId} readOnly />
              </div>
              <div className="form-group" >
                <label className="text-light float-left">Course ID</label>
                <input type="text" className="form-control" value={courseId} readOnly />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Assessment ID</label>
                <input type="text" className="form-control" value={assessmentId} readOnly />
              </div>

              <div className="form-group">
                <label className="text-light float-left">Marks</label>
                <input type="number" max="100" min="0" className="form-control" value={marks} name="marks" onChange={(e) => setMarks(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="text-light float-left">Updated Date</label>
                <input type="datetime-local" value={moment(updatedDate).format("YYYY-MM-DDTHH:mm")} className="form-control" name="schedDate" onChange={timeFotmat} />
              </div>

              <button type="submit" className="btn btn-info btn-block btn-round">Submit</button>
              <br />
            </form>
          </div>

        </div>
      </div>}

      {deleteData && <div className="modal-contents display-fixed " id="delete-content" autoFocus="autofocus" tabIndex="-1">
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
            <h2 className='text-light mt-3'>Delete Result ?</h2>
          </div>
          <div className="d-flex flex-column text-center">
            <h6 className='text-light'>Are you sure you want to delete this result?</h6>
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

      {insert && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 410 }} tabIndex="-1">

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
            <h4 className='text-light mt-3'>Insert Result</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={insertResult}>
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Student Reg No" name="sid" onChange={(e) => setStudentId(e.target.value)} required />
              </div>
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Course ID" name="course" onChange={(e) => setCourseId(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Assessment ID" name="assessmentId" onChange={(e) => setAssessmentId(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="number" max="100" min="0" className="form-control" placeholder='Marks' name="marks" onChange={(e) => setMarks(e.target.value)} required />
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

export default ResultReportDB;