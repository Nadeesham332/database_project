import axios from "axios";
import { useState, useEffect } from "react";
import LoggedNavbar from "../../Components/LoggedNavbar/LoggedNavbar";
import Footer from "../../Components/Footer/Footer";

const Vassessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [course, setCourse] = useState('');
  const [assessment, setAssessment] = useState('');
  const [assessor, setAssessor] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [instructor, setInstructor] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [schedDate, setSchedDate] = useState('');
  const [conError, setConError] = useState(false);
  let cnt = 0;

  useEffect(() => {

    //get data in the session
    let data = localStorage.getItem('viewAssessment');
    data = JSON.parse(data);
    // console.log(data);

    setCourseId(data.Course_id);
    setInstructorId(data.Instructor_id);
    setCourse(data.Course);
    setInstructor(data.Instructor);
    setAssessmentId(data.Assessment_id);
    setAssessment(data.Assessment);
    setSupervisor(data.Supervisor);
    setAssessor(data.Assessor);
    setSchedDate(data.Sched_Date);



    let form = new FormData()
    form.append('courseId', data.Course_id)
    form.append('AssessmentId', data.Assessment_id)

    axios.post('http://localhost/result-sheet-system/view_assessment.php', form)
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

  return (
    <>
      <LoggedNavbar />
      <section className="ftco-section" >
        <div className="container" id="app-root" >

          <div className="row justify-content-center">
            <div className="text-center mb-5">
              <h2 className="heading-section">View Assessment</h2>
            </div>
            <div className="iname" display="table">
              <div>
                <h5 className="text-left mb-3">Course ID: {courseId}</h5>
                <h5 className="text-left mb-3">Course: {course}</h5>
                <h5 className="text-left mb-3">Assessment ID: {assessmentId}</h5>
                <h5 className="text-left mb-3">Assessment: {assessment}</h5>
                <h5 className="text-left mb-3">Supervisor: {supervisor}</h5>
                <h5 className="text-left mb-3">Assessor: {assessor}</h5>
              </div>
              <div>

                <h5 className="text-left mb-3">Instructor ID: {instructorId}</h5>
                <h5 className="text-left mb-3">Instructor: {instructor}</h5>
                <h5 className="text-left mb-3">Scheduled Date: {schedDate}</h5>
              </div>
            </div>

          </div>

          <hr />

          <div className="row ">
            <div className="col-md-12 ">
              <div className=" table-responsive-sm  crudAssessTabel">

                {assessments.length !== 0 && <table className="table table-bordered table-dark table-hover">
                  <thead className='text-center '>
                    <tr>

                      <th>#</th>
                      <th>Student_reg_no</th>
                      <th>Marks</th>
                      <th>Updated_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((result) => {
                      cnt = cnt + 1;
                      return (
                        <tr key={cnt}>
                          <td className='text-center '>{cnt}</td>
                          <td >{result.Student_reg_no}</td>
                          <td className='text-center '>{result.Marks}</td>
                          <td>{result.Updated_date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>}
              </div>
            </div>
          </div>
          {conError && <h5 className="text-danger mt-5 text-center">Oops.. Connection Error...</h5>}
          <div className="bcourse text-center mt-5">
            <a href="/InstructorView" className="watch-sched-cta">Go Back</a>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default Vassessment;