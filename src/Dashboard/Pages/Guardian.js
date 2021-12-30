import Backendnavbar from '../Components/backend_Navbar';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";


const GuardianDB = () => {
  const [guardian, setGuardian] = useState([]);
  const [stdID, setStdID] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [conError, setConError] = useState(false);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingError, setUpdatingError] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [insertingError, setInsertingError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    axios.get('http://localhost/result-sheet-system/guardian_db.php')
      .then(res => {
        setGuardian(res.data);
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
    setStdID(guardian[rowNum].Student_reg_no);
    setGuardianName(guardian[rowNum].Guardian_name);
    setRelationship(guardian[rowNum].Relationship);
    setContactNo(guardian[rowNum].ContactNumber);
    setLoginCode(guardian[rowNum].G_login_code);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }

  const updateGuardianDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('stdID', stdID)
    form.append('guardianName', guardianName)
    form.append('relationship', relationship)
    form.append('contactNo', contactNo)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/update_guardianDB.php', form)
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
    // console.log(rowNum);
    setStdID(guardian[rowNum].Student_reg_no);
    setGuardianName(guardian[rowNum].Guardian_name);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteData(true);
  }
  const deleteFromDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('student', stdID)
    form.append('guardianName', guardianName)

    axios.post('http://localhost/result-sheet-system/delete_guardianDB.php', form)
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
  const insertAGuardian = (e) => {
    e.preventDefault();
    let form = new FormData()
    form.append('stdID', stdID)
    form.append('guardianName', guardianName)
    form.append('relationship', relationship)
    form.append('contactNo', contactNo)
    form.append('loginCode', loginCode)

    axios.post('http://localhost/result-sheet-system/insert_guardianDB.php', form)
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
              <h2 className="heading-section ">Guardian Database</h2>

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
                      <th className="align-middle">Student_reg_no</th>
                      <th className="align-middle">Guardian_name</th>
                      <th className="align-middle">Relationship</th>
                      <th className="align-middle">Contact_Number</th>
                      <th className="align-middle">G_login_code</th>
                      <th className="align-middle">Edit</th>
                      <th className="align-middle">Delete</th>
                    </tr>

                  </thead>
                  <tbody>

                    {guardian.map((result) => {
                      cnt++;
                      return (
                        <tr key={cnt}>
                          <td className='text-center'>{cnt}</td>
                          <td>{result.Student_reg_no}</td>
                          <td>{result.Guardian_name}</td>
                          <td>{result.Relationship}</td>
                          <td>{result.ContactNumber}</td>
                          <td>{result.G_login_code}</td>
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

      {update && <div className="modal-contents display-fixed" id="update-content" style={{ height: 620 }} autoFocus="autofocus" tabIndex="-1">
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
            <h4 className='text-light mt-3'>Update Guardian DB</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={updateGuardianDB}>
              <div className="form-group" >
                <label className="text-light float-left">Student Registration No</label>
                <input type="text" className="form-control" value={stdID} readOnly />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Guardian Name</label>
                <input type="text" className="form-control" value={guardianName} name="fName" onChange={(e) => setGuardianName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Realatioship</label>
                <input type="text" className="form-control" value={relationship} name="relationship" onChange={(e) => setRelationship(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="text-light float-left">Contact Number</label>
                <input type="text" className="form-control" value={contactNo} name="contactNo" onChange={(e) => setContactNo(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="text-light float-left">Guardian LogIn Code</label>
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
            <h2 className='text-light mt-3'>Delete Guardian ?</h2>
          </div>
          <div className="d-flex flex-column text-center">
            <h6 className='text-light'>Are you sure you want to delete these details of this guardian?</h6>
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

      {insert && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" style={{ height: 450 }} tabIndex="-1">

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
            <h4 className='text-light'>Add a Guardian</h4>
          </div>

          <div className="d-flex flex-column text-center">
            <form onSubmit={insertAGuardian}>
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Student Registration No" name="regNo" onChange={(e) => setStdID(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Guardian Name" name="Fname" onChange={(e) => setGuardianName(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Relationship" name="Relationship" onChange={(e) => setRelationship(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Contact Number" name="ContactNumber" onChange={(e) => setContactNo(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" maxLength="8" placeholder="Guardian Login Code" name="S_login_code" onChange={(e) => setLoginCode(e.target.value)} required />
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

export default GuardianDB;