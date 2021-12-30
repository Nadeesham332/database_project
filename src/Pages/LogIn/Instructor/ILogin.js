import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from '../../../Components/MainNavbar/Navbar';
import './ILogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../../../Components/Footer/Footer';

const ILogin = () => {

  const history = useHistory();
  const [accessors, setAccessors] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [pw, setPw] = useState('');
  const [empPw, setEmpPw] = useState('');
  const [isValidUser, setIsValidUser] = useState(false);
  const [openErrorMsg, setOpenErrorMsg] = useState(false);
  const [conError, setConError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/result-sheet-system/log_as_instructor.php')
      .then(res => {
        // console.log(res.data);
        setAccessors(res.data);
      })
      .catch(
        (error) => {
          console.log('Database not connected!');
          setConError(true);
        }
      );
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    accessors.forEach(accessor => {

      if (courseId === accessor.Course_id && pw === accessor.Ass_crud_code && instructorId === accessor.Instructor_id
        && empPw === accessor.Password) {

        setIsValidUser(true);
        console.log("Login success!");

        //Session object
        let accessorDetails = {
          Course_id: accessor.Course_id,
          Course: accessor.Course,
          Instructor_id: accessor.Instructor_id,
          Instructor: accessor.iname,
          Logged_as: 'Instructor'
        }


        //Add the session
        localStorage.setItem('accessorDetails', JSON.stringify(accessorDetails));
        //get data in the session
        // let data = localStorage.getItem('accessorDetails');
        // data = JSON.parse(data);	
        // console.log(data);
      }
      else {
        setOpenErrorMsg(true);
        document.getElementById('app-root').style.filter = 'blur(5px)';
        document.getElementById('app-root').style.pointerEvents = "none";
      }
    })
  }

  return (
    <>
      <Navbar />
      <section className='form-instructor'>

        <div className="modal-content" id="app-root">
          <div className="modal-header border-bottom-0">

            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => history.goBack()}>
              <span aria-hidden="true">&times;</span>
            </button>

          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h4 className='text-light '>Login as Instructor</h4>
            </div>
            {!conError && <div className="d-flex flex-column text-center">
              <form onSubmit={onSubmit} method="post">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Course ID..." onChange={(e) => setCourseId(e.target.value)} name="courseId" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" maxLength="16" placeholder="Course LogIn Code..." onChange={(e) => setPw(e.target.value)} name="pw" required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Your ID..." onChange={(e) => setInstructorId(e.target.value)} name="instructorId" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" maxLength="8" placeholder="Your Password..." onChange={(e) => setEmpPw(e.target.value)} name="emppw" required />
                </div>


                <button type="submit" className="btn btn-info btn-block btn-round">Login</button>

              </form>

              {isValidUser ? <Redirect to="/InstructorView" /> : null}
            </div>}
            {conError && <h5 className="text-light mt-5 text-center">Oops.. Connection Error...</h5>}
          </div>
        </div>
        {openErrorMsg && <div className="modal-contents display-fixed " id="error-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setOpenErrorMsg(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-danger mt-5'>LogIn Failed!</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Something went wrong. Please try again!</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => {
                  setOpenErrorMsg(false);
                  document.getElementById('app-root').style.filter = 'blur(0)';
                  document.getElementById('app-root').style.pointerEvents = "all";
                }}>Close
              </button>
            </div>
          </div>
        </div>}
      </section>
      <Footer></Footer>
    </>
  );
}

export default ILogin;