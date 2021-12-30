import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from '../../../Components/MainNavbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import './ALogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, Redirect } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const ALogin = () => {

  const history = useHistory();
  const [accessors, setAccessors] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [assessorId, setAssessorId] = useState('');
  const [pw, setPw] = useState('');
  const [empPw, setEmpPw] = useState('');
  const [isValidUser, setIsValidUser] = useState(false);
  const [openErrorMsg, setOpenErrorMsg] = useState(false);
  const [conError, setConError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/result-sheet-system/log_as_assessor.php')
      .then(res => {
        // console.log(res.data);
        setAccessors(res.data)
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

      if (courseId === accessor.Course_id && pw === accessor.Ass_login_code && assessmentId === accessor.Ass_id &&
        assessorId === accessor.Assessor_id && empPw === accessor.Password) {

        setIsValidUser(true);
        console.log("Login success!");

        //Session object
        let accessorDetails = {
          Course_id: accessor.Course_id,
          Course: accessor.Course,
          Assessment_id: accessor.Ass_id,
          Assessment: accessor.Assessment,
          Assessor_id: accessor.Assessor_id,
          Assessor: accessor.aname,
          Instructor: accessor.iname,
          Logged_as: 'Assessor'
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
      }
    })
  }

  return (
    <>
      <Navbar />
      <section className='form-assessor'>

        <div className="modal-content">
          <div className="modal-header border-bottom-0">

            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => history.goBack()}>
              <span aria-hidden="true">&times;</span>
            </button>

          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h4 className='text-light'>Login as Assessor</h4>
            </div>
            {!conError && <div className="d-flex flex-column text-center">
              <form onSubmit={onSubmit} method="post">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Course ID..." onChange={(e) => setCourseId(e.target.value)} name="courseId" required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Assessment ID..." onChange={(e) => setAssessmentId(e.target.value)} name="assessmentId" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" maxLength="12" placeholder="Assessment LogIn Code..." onChange={(e) => setPw(e.target.value)} name="pw" required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Your ID..." onChange={(e) => setAssessorId(e.target.value)} name="assessorId" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" maxLength="8" placeholder="Your Password..." onChange={(e) => setEmpPw(e.target.value)} name="Emppw" required />
                </div>


                <button type="submit" className="btn btn-info btn-block btn-round">Login</button>

              </form>

              {isValidUser ? <Redirect to="/AssessorView" /> : null}

              <div stlye={{}}>
                <Dialog open={openErrorMsg} onClose={() => setOpenErrorMsg(false)}>
                  <DialogTitle >{"LogIn Failed!"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText className="text-danger">
                      Something went wrong. Please try again!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenErrorMsg(false)}
                      color="primary" autoFocus>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>


            </div>}
            {conError && <h5 className="text-primary mt-5 text-center">Oops.. Connection Error...</h5>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ALogin;