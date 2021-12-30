import Backendnavbar from '../Components/backend_Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";


import React from "react";

const StudentDB = () => {
  const [students, setStudents] = useState([]);
  const [stdID, setStdID] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [minit, setMinit] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [guardianLoginCode, setGuardianLoginCode] = useState('');
  const [conError, setConError] = useState(false);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingError, setUpdatingError] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  const [guardianName, setGuardianName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [contactNo, setContactNo] = useState('');
  let cnt = 0;

  useEffect(() => {

    axios.get('http://localhost/result-sheet-system/student_db.php')
      .then(res => {
        setStudents(res.data);
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
    setStdID(students[rowNum].Reg_no);
    setFName(students[rowNum].Fname);
    setMinit(students[rowNum].Minit);
    setLName(students[rowNum].Lname);
    setSex(students[rowNum].Sex);
    setDob(students[rowNum].DOB);
    setAddress(students[rowNum].Address);
    setLoginCode(students[rowNum].S_login_code);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }

  const updateStudentDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('stdID', stdID)
    form.append('fName', fName)
    form.append('minit', minit)
    form.append('lName', lName)
    form.append('sex', sex)
    form.append('dob', dob)
    form.append('address', address)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/update_stdDB.php', form)
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
  const handleDelete = (e) => {
    e.preventDefault();
    let tempStId = e.currentTarget.getAttribute('id');
    // console.log(tempStId);
    setStdID(tempStId);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteData(true);
  }
  const deleteFromDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('student', stdID)

    axios.post('http://localhost/result-sheet-system/delete_studentDB.php', form)
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
  const insertAStudent = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('stdID', stdID)
    form.append('fName', fName)
    form.append('minit', minit)
    form.append('lName', lName)
    form.append('sex', sex)
    form.append('dob', dob)
    form.append('address', address)
    form.append('loginCode', loginCode)
    form.append('guardianName', guardianName)
    form.append('relationship', relationship)
    form.append('contactNo', contactNo)
    form.append('gloginCode', guardianLoginCode)

    axios.post('http://localhost/result-sheet-system/insert_studentDB.php', form)
      .then(res => {
        console.log(res.data);
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



        <div className="row justify-content-center">
          <div className="text-center mb-3">
            <h2 className="heading-section ">Student Database</h2>

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
                    <th className="align-middle">Reg_no</th>
                    <th className="align-middle">Fname</th>
                    <th className="align-middle">Minit</th>
                    <th className="align-middle">Lname</th>
                    <th>Sex</th>
                    <th className="align-middle">DOB</th>
                    <th className="align-middle">Address</th>
                    <th className="align-middle">S_login_code</th>
                    <th className="align-middle">Edit</th>
                    <th className="align-middle">Delete</th>
                  </tr>

                </thead>
                <tbody>

                  {students.map((result) => {
                    cnt++;
                    return (
                      <tr key={cnt}>
                        <td className='text-center'>{cnt}</td>
                        <td>{result.Reg_no}</td>
                        <td>{result.Fname}</td>
                        <td className='text-center'>{result.Minit}</td>
                        <td>{result.Lname}</td>
                        <td className='text-center'>{result.Sex}</td>
                        <td>{result.DOB}</td>
                        <td>{result.Address}</td>
                        <td>{result.S_login_code}</td>
                        <td className='text-center'><Button type='button' id={cnt - 1} onClick={handleUpdate} className='btn-primary' ><i className="fas fa-edit"></i></Button> </td>
                        <td className='text-center'> <Button className='btn-danger' id={result.Reg_no} onClick={handleDelete}  ><i className="far fa-trash-alt"></i></Button> </td>
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


      </section>

      {update && <div className="modal-contents display-fixed" id="update-content" style={{ height: 600 }} autoFocus="autofocus" tabIndex="-1">
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
            <h4 className='text-light mt-3'>Update Student DB</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={updateStudentDB}>
              <div className="form-group" >
                <label className="text-light float-left">Registration No</label>
                <input type="text" className="form-control" value={stdID} readOnly />
              </div>
              <div className="form-group">
                <label className="text-light float-left">First Name</label>
                <input type="text" className="form-control" value={fName} name="fName" onChange={(e) => setFName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Minit</label>
                <input type="text" className="form-control" value={minit} name="minit" onChange={(e) => setMinit(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Last Name</label>
                <input type="text" className="form-control" value={lName} name="lName" onChange={(e) => setLName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Sex</label>
                <select value={sex} className="form-control" onChange={(e) => setSex(e.target.value)}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label className="text-light float-left">DOB</label>
                <input type="date" className="form-control" value={dob} name="dob" onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Address</label>
                <textarea type="text" className="form-control" value={address} name="address" onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="text-light float-left">Password</label>
                <input type="text" className="form-control" maxLength="8" value={loginCode} name="loginCode" onChange={(e) => setLoginCode(e.target.value)} required />
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
            <h2 className='text-light mt-3'>Delete Student ?</h2>
          </div>
          <div className="d-flex flex-column text-center">
            <h6 className='text-light'>All records under this student will be deleted. Are you sure you want to delete this student?</h6>
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
            <h4 className='text-light'>Add a Student</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={insertAStudent}>
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Registration No" name="regNo" onChange={(e) => setStdID(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="First Name" name="Fname" onChange={(e) => setFName(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" maxLength="1" placeholder="Minit" name="Minit" onChange={(e) => setMinit(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Last Name" name="Lname" onChange={(e) => setLName(e.target.value)} required />
              </div>
              <div className="form-group">
                <select className="form-control" onChange={(e) => setSex(e.target.value)}>
                  <option value="" hidden>Sex</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="form-group">
                <input type="date" className="form-control" placeholder="DOB:" name="DOB" onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="form-group">
                <textarea type="text" className="form-control" placeholder="Address" name="Address" onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" maxLength="8" placeholder="Student Login Code" name="S_login_code" onChange={(e) => setLoginCode(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Guardian Name" name="Fname" onChange={(e) => setGuardianName(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Relationship" name="Relationship" onChange={(e) => setRelationship(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Guardian's Contact No" name="ContactNumber" onChange={(e) => setContactNo(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" maxLength="8" placeholder="Guardian Login Code" name="G_login_code" onChange={(e) => setGuardianLoginCode(e.target.value)} />
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

export default StudentDB;