// import backendNavbar from './backend_Navbar';
import Backendnavbar from '../Components/backend_Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";


import React from "react";

const CourseDB = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState('');
  const [instructor, setInstructor] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [conError, setConError] = useState(false);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingError, setUpdatingError] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    axios.get('http://localhost/result-sheet-system/course_db.php')
      .then(res => {
        setCourses(res.data);
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
    setCourseId(courses[rowNum].Course_id);
    setCourse(courses[rowNum].Course);
    setInstructor(courses[rowNum].Instructor_id);
    setLoginCode(courses[rowNum].Ass_crud_code);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }

  const updateCourseDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('courseId', courseId)
    form.append('course', course)
    form.append('instructor', instructor)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/update_courseDB.php', form)
      .then(res => {
        // console.log(res.data);
        if (res.data > 0) {
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setUpdate(false);
          window.location.reload(false);

        }
        else {
          setUpdate(false);
          setUpdatingError(true);
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
    let temp = e.currentTarget.getAttribute('id');
    // console.log(tempStId);
    setCourseId(temp);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteData(true);
  }
  const deleteFromDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('courseId', courseId)

    axios.post('http://localhost/result-sheet-system/delete_CourseDB.php', form)
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
  const insertACourse = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('courseId', courseId)
    form.append('course', course)
    form.append('instructor', instructor)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/insert_CourseDB.php', form)
      .then(res => {
        // console.log(res.data);
        if (res.data > 0) {
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
        }
      )
  }


  return (
    <>
      <Backendnavbar />
      <section className="ftco-section" id="app-root">

        <div className="container">

          <div className="row justify-content-center">
            <div className="text-center mb-3">
              <h2 className="heading-section ">Courses Database</h2>

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
                      <th className="align-middle">Course_id</th>
                      <th className="align-middle">Course</th>
                      <th className="align-middle">Instructor_id</th>
                      <th className="align-middle">Course LogIn Code</th>
                      <th className="align-middle">Edit</th>
                      <th className="align-middle">Delete</th>
                    </tr>

                  </thead>
                  <tbody>

                    {courses.map((result) => {
                      cnt++;
                      return (
                        <tr key={cnt}>
                          <td className='text-center'>{cnt}</td>
                          <td>{result.Course_id}</td>
                          <td>{result.Course}</td>
                          <td>{result.Instructor_id}</td>
                          <td>{result.Ass_crud_code}</td>
                          <td className='text-center'><Button type='button' id={cnt - 1} onClick={handleUpdate} className='btn-primary' ><i className="fas fa-edit"></i></Button> </td>
                          <td className='text-center'> <Button className='btn-danger' id={result.Course_id} onClick={handleDelete}  ><i className="far fa-trash-alt"></i></Button> </td>
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

      {update && <div className="modal-contents display-fixed" id="update-content" style={{ height: 550 }} autoFocus="autofocus" tabIndex="-1">
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
            <h4 className='text-light mt-3'>Update Course DB</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={updateCourseDB}>
              <div className="form-group" >
                <label className="text-light float-left">Course ID</label>
                <input type="text" className="form-control" value={courseId} readOnly />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Course</label>
                <input type="text" className="form-control" value={course} name="course" onChange={(e) => setCourse(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Instructor ID</label>
                <input type="text" className="form-control" value={instructor} name="instructor" onChange={(e) => setInstructor(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="text-light float-left">Course LogIn Code</label>
                <input type="text" className="form-control" maxLength="16" value={loginCode} name="loginCode" onChange={(e) => setLoginCode(e.target.value)} />
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
            <h2 className='text-light mt-3'>Delete Course ?</h2>
          </div>
          <div className="d-flex flex-column text-center">
            <h6 className='text-light'>All records under this course will be deleted. Are you sure you want to delete this course?</h6>
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

      {insert && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 400 }} tabIndex="-1">

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
            <h4 className='text-light'>Add a Course</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={insertACourse}>
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Course ID" name="Course_id" onChange={(e) => setCourseId(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Course" name="Course" onChange={(e) => setCourse(e.target.value)} required />
              </div>

              <div className="form-group">
                <input type="text" className="form-control" placeholder="Instructor ID" name="Instructor_id" onChange={(e) => setInstructor(e.target.value)} required />
              </div>

              <div className="form-group">
                <input type="text" className="form-control" maxLength="16" placeholder="Course Login Code" name="Ass_crud_code" onChange={(e) => setLoginCode(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-info btn-block btn-round">Submit</button>
              <br />
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

export default CourseDB;