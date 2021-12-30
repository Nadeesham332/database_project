import { useParams } from "react-router-dom";
import LoggedNavbar from "../../Components/LoggedNavbar/LoggedNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from '../../Components/Footer/Footer';



const InsertResults = () => {

  let numOfRows = Number(useParams().id);
  const studentIDs = [];
  const studentMarks = [];
  const [courseId, setCourseId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [assessorId, setAssessorId] = useState('');
  const [course, setCourse] = useState('');
  const [assessment, setAssessment] = useState('');
  const [assessor, setAssessor] = useState('');
  const [instructor, setInstructor] = useState('');
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorId, setErrorId] = useState([]);
  const [conError, setConError] = useState(false);


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

  }, [])

  const insertResultsDB = (e) => {
    e.preventDefault();

    let form = new FormData()
    form.append('course', courseId)
    form.append('assessment', assessmentId)
    form.append('student', studentIDs)
    form.append('marks', studentMarks)

    // console.log(courseId)
    // console.log(assessmentId)
    // console.log(studentIDs)
    // console.log(studentMarks)

    axios.post('http://localhost/result-sheet-system/insert_marks.php', form)
      .then(res => {
        // console.log(studentMarks);
        // console.log(res.data);  

        if (res.data === 'Success') {
          setIsSuccess(true);
        }
        else {
          setErrorId(res.data);
          setIsFailed(true);
        }
        document.getElementById('insert-root').style.filter = 'blur(5px)';
        document.getElementById('insert-root').style.pointerEvents = "none";
      })

      .catch(
        (error) => {
          console.log('Database not connected!');
          setConError(true);
        }
      );


  }

  const onChangeStudent = (e) => {
    e.preventDefault();
    let tempIndex = e.currentTarget.getAttribute('id');
    // console.log(tempIndex)
    studentIDs[tempIndex] = e.target.value;
  }
  const onChangeMarks = (e) => {
    e.preventDefault();
    let tempIndex = e.currentTarget.getAttribute('id');
    studentMarks[tempIndex] = Number(e.target.value);
  }

  return (
    <>
      <LoggedNavbar />
      <section className="ftco-section" >
        <div className="container" id="insert-root" >

          <div className="row mx-4">
            <div className="text-center mb-5">
              <h2 className="heading-section">Insert Results</h2>
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

          <br />

          <form onSubmit={insertResultsDB} >
            {!conError && <div className=" table-responsive-sm  crudAssessTabel">
              <table className="table table-bordered table-dark table-hover ">
                <thead className='text-center'>
                  <tr>
                    <th>#</th>
                    <th>Student_reg_no</th>
                    <th>Marks</th>
                  </tr>


                </thead>
                <tbody>
                  {Array.apply(0, Array(numOfRows)).map((x, i) => {
                    return (
                      <tr key={i + 1}>
                        <td className='text-center'>{i + 1}</td>
                        <td>
                          <input type="text" placeholder='Student_Reg_No' id={i} name='student[]' onChange={onChangeStudent} className="form-control" required />
                        </td>
                        <td>
                          <input type="number" max="100" min="0" placeholder='Marks' id={i} name='marks[]' onChange={onChangeMarks} className="form-control" required />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="mt-5 md-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" className="btn btn-dark btn-lg" onClick={() => window.location.href = `/AssessorView`}>Cancel</button>

                <button type="submit" className="btn btn-primary btn-end btn-lg">Submit</button>
              </div>

            </div>}

            {conError && <h5 className="text-primary text-center">Oops.. Connection Error...</h5>}
            <br />
          </form>
          <br />
        </div>

        {isFailed && <div className="modal-contents display-fixed" style={{ height: 420 }} id="delete-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => window.location.href = `/AsseossorView/InsertResults/${numOfRows - errorId[1]}`}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body" >
            <div className="form-title text-center">
              <h2 className='text-danger '>Failed to Insert Std_ID:{errorId[0]}</h2>
            </div>

            <div className="d-flex flex-column text-center">
              {errorId[1] !== 0 && <h6 className='text-primary'>Successfully inserted {errorId[1]} records upto above Std_ID.</h6>}
              <h6 className='text-light'>Something went wrong in above Std_ID.</h6>
              <h6 className='text-light'>How do you like to Continue. Re-enter the rest of records,</h6>

              <button type="button" className="btn btn-primary btn-info btn-block btn-box"
                onClick={() => window.location.href = `/AsseossorView/InsertResults/${numOfRows - errorId[1]}`}>with above Std_ID
              </button>
              {numOfRows - errorId[1] - 1 !== 0 && <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => window.location.href = `/AsseossorView/InsertResults/${numOfRows - errorId[1] - 1}`}>without above Std_ID
              </button>}
              <h6 className='text-light'>or</h6>
              <button type="button" className="btn btn-danger btn-info btn-block btn-box"
                onClick={() => window.location.href = `/AssessorView`}>Quit
              </button>
            </div>
          </div>
        </div>}

        {isSuccess && <div className="modal-contents display-fixed " id="success-content" autoFocus="autofocus" tabIndex="-1">
          <div className="modal-header border-bottom-0">
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"
              onClick={() => window.location.href = `/AssessorView`}><span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title text-center">
              <h2 className='text-primary mt-5'>Successfully Inserted</h2>
            </div>
            <div className="d-flex flex-column text-center">
              <h6 className='text-light'>Successfully inserted {numOfRows} records...</h6>
              <br />
              <button type="button" className="btn btn-light btn-info btn-block btn-box"
                onClick={() => window.location.href = `/AssessorView`}>OK
              </button>
            </div>
          </div>
        </div>}




      </section>
      <Footer></Footer>

    </>

  );
}

export default InsertResults;