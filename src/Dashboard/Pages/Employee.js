import Backendnavbar from '../Components/backend_Navbar';
import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";

const EmployeeDB = () => {

  const [employees, setEmployees] = useState([]);
  const [empID, setEmpID] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [minit, setMinit] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [eduacationStatus, setEducationStatus] = useState('');
  const [conError, setConError] = useState(false);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingError, setUpdatingError] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    axios.get('http://localhost/result-sheet-system/employee_db.php')
      .then(res => {
        setEmployees(res.data);
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
    setEmpID(employees[rowNum].E_id);
    setFName(employees[rowNum].Fname);
    setMinit(employees[rowNum].Minit);
    setLName(employees[rowNum].Lname);
    setSex(employees[rowNum].Sex);
    setDob(employees[rowNum].DOB);
    setEmail(employees[rowNum].email);
    setEducationStatus(employees[rowNum].Education_status);
    setLoginCode(employees[rowNum].Password);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }

  const updateEmployeeDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('empID', empID)
    form.append('fName', fName)
    form.append('minit', minit)
    form.append('lName', lName)
    form.append('sex', sex)
    form.append('dob', dob)
    form.append('email', email)
    form.append('eduacationStatus', eduacationStatus)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/update_employeeDB.php', form)
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
    setEmpID(tempStId);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteData(true);
  }
  const deleteFromDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('employee', empID)

    axios.post('http://localhost/result-sheet-system/delete_employeeDB.php', form)
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
  const insertAnEmployee = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('empID', empID)
    form.append('fName', fName)
    form.append('minit', minit)
    form.append('lName', lName)
    form.append('sex', sex)
    form.append('dob', dob)
    form.append('email', email)
    form.append('eduacationStatus', eduacationStatus)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/insert_EmployeeDB.php', form)
      .then(res => {
        // console.log(res.data);
        if (res.data > 0) {
          document.getElementById('app-root').style.filter = 'blur(0)';
          document.getElementById('app-root').style.pointerEvents = "all";
          setInsert(false);
          window.location.reload(false);

        }
        else {
          // setInsert(false);
          setInsertingError(true);
          document.getElementById('insert-content').style.filter = 'blur(5px)';
          document.getElementById('insert-content').style.pointerEvents = "none";

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
            <h2 className="heading-section ">Employee Database</h2>

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
                    <th className="align-middle">Emp_ID</th>
                    <th className="align-middle">Fname</th>
                    <th className="align-middle">Minit</th>
                    <th className="align-middle">Lname</th>
                    <th className="align-middle">Sex</th>
                    <th className="align-middle">DOB</th>
                    <th className="align-middle">email</th>
                    <th className="align-middle">Education status</th>
                    <th className="align-middle">Password</th>
                    <th className="align-middle">Edit</th>
                    <th className="align-middle">Delete</th>
                  </tr>

                </thead>
                <tbody>

                  {employees.map((result) => {
                    cnt++;
                    return (
                      <tr key={cnt}>
                        <td className='text-center'>{cnt}</td>
                        <td>{result.E_id}</td>
                        <td>{result.Fname}</td>
                        <td className='text-center'>{result.Minit}</td>
                        <td>{result.Lname}</td>
                        <td className='text-center'>{result.Sex}</td>
                        <td>{result.DOB}</td>
                        <td>{result.email}</td>
                        <td>{result.Education_status}</td>
                        <td>{result.Password}</td>
                        <td className='text-center'><Button type='button' id={cnt - 1} onClick={handleUpdate} className='btn-primary' ><i className="fas fa-edit"></i></Button> </td>
                        <td className='text-center'> <Button className='btn-danger' id={result.E_id} onClick={handleDelete}  ><i className="far fa-trash-alt"></i></Button> </td>
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
            <h4 className='text-light mt-3'>Update Employee DB</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={updateEmployeeDB}>
              <div className="form-group" >
                <label className="text-light float-left">Employee ID</label>
                <input type="text" className="form-control" value={empID} readOnly />
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
                <label className="text-light float-left">E-mail</label>
                <input type="email" className="form-control" value={email} name="address" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Education Status</label>
                <input type="text" className="form-control" value={eduacationStatus} name="lName" onChange={(e) => setEducationStatus(e.target.value)} />
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
            <h2 className='text-light mt-3'>Delete Employee ?</h2>
          </div>
          <div className="d-flex flex-column text-center">
            <h6 className='text-light'>All references will be NULL. Are you sure you want to delete this employee?</h6>
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

      {insert && <div className="modal-contents display-fixed" id="insert-content" autoFocus="autofocus" style={{ height: 600 }} tabIndex="-1">

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
            <h4 className='text-light'>Add an Employee</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={insertAnEmployee}>
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Employee ID" name="empID" onChange={(e) => setEmpID(e.target.value)} required />
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
                <input type="email" className="form-control" placeholder="E-mail" name="email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Education Status" name="eduStatus" onChange={(e) => setEducationStatus(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" maxLength="8" placeholder="Password" name="pw" onChange={(e) => setLoginCode(e.target.value)} required />
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
              document.getElementById('insert-content').style.filter = 'blur(0)';
              document.getElementById('insert-content').style.pointerEvents = "all";
              // setInsert(true);
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
                document.getElementById('insert-content').style.filter = 'blur(0)';
                document.getElementById('insert-content').style.pointerEvents = "all";
                // setInsert(true);
              }}>Close
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}

export default EmployeeDB;