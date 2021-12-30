import './CRUDresults.css'
import LoggedNavbar from "../../Components/LoggedNavbar/LoggedNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Footer from '../../Components/Footer/Footer';

const CRUDresults = () => {

  const [results, setResults] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [assessorId, setAssessorId] = useState('');
  const [course, setCourse] = useState('');
  const [assessment, setAssessment] = useState('');
  const [assessor, setAssessor] = useState('');
  const [instructor, setInstructor] = useState('');
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState('');
  const [update, setUpdate] = useState(false);
  const [insert, setInsert] = useState(false);
  const [noOfRecords, setNoOfRecords] = useState('')
  const [deleteResult, setDeleteResult] = useState(false);
  const [conError, setConError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    //get data in the session
    let data = localStorage.getItem('accessorDetails');
    data = JSON.parse(data);
    // console.log(data);

    setCourseId(data.Course_id);
    setAssessmentId(data.Assessment_id);
    setAssessorId(data.Assessor_id);
    setCourse(data.Course);
    setAssessor(data.Assessor);
    setInstructor(data.Instructor);
    setAssessment(data.Assessment);


    let form = new FormData()
    form.append('course', data.Course_id)
    form.append('assessment', data.Assessment_id)

    axios.post('http://localhost/result-sheet-system/crud_result.php', form)
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
    setStudentId(results[rowNum].Student_reg_no);
    setMarks(results[rowNum].Marks);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setUpdate(true);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    let tempStId = e.currentTarget.getAttribute('id');
    // console.log(tempStId);
    setStudentId(tempStId);
    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setDeleteResult(true);
  }
  const handleInsert = (e) => {
    e.preventDefault();

    document.getElementById('app-root').style.filter = 'blur(5px)';
    document.getElementById('app-root').style.pointerEvents = "none";
    setInsert(true);
  }

  const updateResults = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('course', courseId)
    form.append('assessment', assessmentId)
    form.append('student', studentId)
    form.append('marks', marks)

    axios.post('http://localhost/result-sheet-system/update_marks.php', form)
      .then(res => {
        console.log('Success');
      })

    document.getElementById('app-root').style.filter = 'blur(0)';
    document.getElementById('app-root').style.pointerEvents = "all";
    setUpdate(false);
    window.location.reload(false);

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

    document.getElementById('app-root').style.filter = 'blur(0)';
    document.getElementById('app-root').style.pointerEvents = "all";
    setUpdate(false);
    window.location.reload(false);

  }

  return (

    <>
      <LoggedNavbar />
      <section className="ftco-section" >
        <div className="container" id="app-root" >

          <div className="row justify-content-center">
            <div className="text-center mb-5">
              <h2 className="heading-section">CRUD Results</h2>
            </div>
            <div className="iname" display="table">
              <div>
                <h5 className="text-left mb-3">Date: {new Date().toLocaleString() + ''}</h5>

                <h5 className="text-left mb-3">Assessment ID: {assessmentId}</h5>
                <h5 className="text-left mb-3">Assessment: {assessment}</h5>
                <h5 className="text-left mb-3">Assessor ID: {assessorId}</h5>
                <h5 className="text-left mb-3">Assessor: {assessor}</h5>
              </div>
              <div>

                <h5 className="text-left mb-3">Course ID: {courseId}</h5>
                <h5 className="text-left mb-3">Course: {course}</h5>
                <h5 className="text-left mb-3">Instructor: {instructor}</h5>

              </div>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive-sm">

                {results.length !== 0 && <table className="table table-bordered table-dark table-hover">
                  <thead className='text-center'>
                    <tr>
                      <th>#</th>
                      <th>Student_reg_no</th>
                      <th>Marks</th>
                      <th>Updated_date</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>

                  </thead>
                  <tbody>
                    {results.map((result) => {
                      cnt = cnt + 1;
                      return (
                        <tr key={cnt}>
                          <td className='text-center'>{cnt}</td>
                          <td>{result.Student_reg_no}</td>
                          <td className='text-center'>{result.Marks}</td>
                          <td>{result.Updated_date}</td>
                          <td className='text-center'><Button type='button' id={cnt - 1} className='btn-primary' onClick={handleUpdate}><i className="fas fa-edit"></i></Button> </td>
                          <td className='text-center'> <Button className='btn-danger' id={result.Student_reg_no} onClick={handleDelete}><i className="far fa-trash-alt"></i></Button> </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>}
              </div>

              {!conError && <div className='text-center'>
                <button className='mt-5 btn-link btn-lg btn-outline-primary btn-round' onClick={handleInsert}><i className="fas fa-plus"></i></button>
                <div className='mt-1 text-primary'><button className='btn btn-link' onClick={handleInsert}>Add New</button></div>
              </div>}
              {conError && <h5 className="text-dark mt-5 text-center">Oops.. Connection Error...</h5>}
            </div>

          </div>
        </div>

        {update && <div className="modal-contents display-fixed" id="update-content" autoFocus="autofocus" tabIndex="-1">
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
              <form method="post" onSubmit={updateResults}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder={studentId} readOnly />
                </div>
                <div className="form-group">
                  <input type="number" max="100" min="0" className="form-control" placeholder={'Marks: ' + marks} name="marks" onChange={(e) => setMarks(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-info btn-block btn-round">Submit</button>
              </form>
            </div>

          </div>
        </div>}

        {deleteResult && <div className="modal-contents display-fixed " id="delete-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => {
                setDeleteResult(false);
                document.getElementById('app-root').style.filter = 'blur(0)';
                document.getElementById('app-root').style.pointerEvents = "all";
              }}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-light mt-3'>Delete Result</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Are you sure you want to delete this record?</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => {
                  setDeleteResult(false);
                  document.getElementById('app-root').style.filter = 'blur(0)';
                  document.getElementById('app-root').style.pointerEvents = "all";
                }}>Cancel
              </button>
              <button type="button" onClick={deleteFromDB} className="btn btn-danger btn-info btn-block btn-box">Delete</button>
            </div>
          </div>
        </div>}

        {insert && <div className="modal-contents display-fixed" id="insert-content" autoFocus="autofocus" tabIndex="-1">
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
              <h4 className='text-light mt-3'>Insert Results</h4>
            </div>

            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>How many records you willing to insert?</h6>

              <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/AsseossorView/InsertResults/${noOfRecords}` }}>
                <div className="form-group">
                  <input type="number" min="1" className="form-control" placeholder='# of Insertings' name="noOfRecords" onChange={(e) => setNoOfRecords(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-info btn-block">Continue</button>
                <button type="button" className="btn btn-info btn-block btn-light"
                  onClick={() => {
                    setInsert(false);
                    document.getElementById('app-root').style.filter = 'blur(0)';
                    document.getElementById('app-root').style.pointerEvents = "all";
                  }}>Cancel
                </button>
              </form>
            </div>

          </div>
        </div>}
      </section>
      <Footer></Footer>
    </>
  );
}

export default CRUDresults;