import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoggedNavbar from "../../Components/LoggedNavbar/LoggedNavbar"
import Footer from '../../Components/Footer/Footer';

const Vresult = () => {

    const [results, setResults] = useState([]);
    const [stdID, setStdID] = useState('');
    const [guardian, setGuardian] = useState('');
    const [student, setStudent] = useState('');
    const [conError, setConError] = useState(false);
    let cnt = 0;


    useEffect(() => {

        //get data in the session
        let data = localStorage.getItem('accessorDetails');
        data = JSON.parse(data);
        // console.log(data);

        setStdID(data.Std_id);
        setGuardian(data.Guardian);
        setStudent(data.Std);

        let form = new FormData()
        form.append('student', data.Std_id)

        axios.post('http://localhost/result-sheet-system/view_results.php', form)
            .then(res => {
                setResults(res.data)
                // console.log(res.data);
            })
            .catch(
                (error) => {
                    setConError(true);
                    console.log('Database not connected!');
                }
            );

    }, [])

    return (
        <>
            <LoggedNavbar />
            <section className="ftco-section">

                <div className="container">

                    <div className="row justify-content-center">
                        <div className="text-center mb-5">
                            <h2 className="heading-section">Results Sheet</h2>

                        </div>
                        <div className="iname" display="table">
                            <div>
                                <h5 className="text-left mb-3">Date: {new Date().toLocaleString() + ''}</h5>
                                <h5 className="text-left mb-3">Student ID: {stdID}</h5>
                            </div>
                            <div>

                                <h5 className="text-left mb-3">Student Name: {student}</h5>
                                <h5 className="text-left mb-3">Guardian Name: {guardian}</h5>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            {!(conError) && <div className="table-responsive-sm crudAssessTabel">

                                {results.length !== 0 && <table className="table table-bordered table-dark table-hover">
                                    <thead className='text-center '>
                                        <tr>
                                            <th className="align-middle">#</th>
                                            <th className="align-middle">Course</th>
                                            <th className="align-middle">Assessment</th>
                                            <th className="align-middle">Marks</th>
                                            <th>Course Instructor</th>
                                            <th className="align-middle">Contact Instructor</th>
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {results.map((result) => {
                                            cnt++;
                                            return (
                                                <tr key={cnt}>
                                                    <td className='text-center '>{cnt}</td>
                                                    <td>{result.Course}</td>
                                                    <td>{result.Assessment}</td>
                                                    <td className='text-center '>{result.Marks}</td>
                                                    <td>{result.Course_Instructor}</td>
                                                    <td>{result.email}</td>
                                                </tr>

                                            )

                                        })}
                                    </tbody>

                                </table>}
                                {results.length === 0 && <h5 className="text-danger text-center">No Results to Show!</h5>}

                            </div>}

                            {conError && <h5 className="text-danger text-center">Connection Error!</h5>}
                        </div>
                    </div>

                </div>

            </section>
            <Footer />
        </>
    );
}

export default Vresult;