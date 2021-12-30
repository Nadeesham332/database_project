import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React from "react";
import './Adetails.css';
import Navbar from '../../Components/MainNavbar/Navbar';
import { withRouter } from "react-router";
import Footer from '../../Components/Footer/Footer';

class Adetails extends React.Component {

    // initialize an object's state in a class
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: []
            //    params: useParams()
        }
    }
    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {

        let course = this.props.match.params.id
        let form = new FormData()
        form.append('course', course)
        axios.post('http://localhost/result-sheet-system/aschedule.php', form).then(res => {
            // console.log(res.data);
            this.setState({ data: res.data });
        })
            .catch(
                (error) => {
                    console.log('Database not connected!');
                }
            );

        axios.post('http://localhost/result-sheet-system/rcourse.php', form).then(res2 => {
            // console.log(res2.data);
            this.setState({ data2: res2.data });
        })
            .catch(
                (error) => {
                    console.log('Database not connected!');
                }
            );
    }

    render() {

        const longeur = this.state.data.length;
        let cnt = 0;
        return (
            <>
                <Navbar />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-5">
                                <h2 className="heading-section">Assessments Schedule</h2>
                            </div>

                            {this.state.data2.map((result) => {
                                return (
                                    <div key={result.Course}>
                                        <div className="iname">
                                            <h5 >Course: {result.Course}</h5>
                                            <h5 >Course ID: {this.props.match.params.id}</h5>
                                        </div>
                                        <h5 className="text-left mb-3">Instructor: {result.iname}</h5>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive-sm crudAssessTabel">
                                    {longeur !== 0 && <table className="table table-bordered table-dark table-hover">
                                        <thead className='text-center '>
                                            <tr >
                                                <th >#</th>
                                                <th >Assignment ID</th>
                                                <th className="align-middle">Assignment</th>
                                                <th className="align-middle">Supervisor</th>
                                                <th className="align-middle">Assessor</th>
                                                <th className="align-middle">Scheduled Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.data.map((result) => {
                                                cnt++;
                                                return (
                                                    <tr key={cnt}>
                                                        <td className='text-center '>{cnt}</td>
                                                        <td>{result.Ass_id}</td>
                                                        <td >{result.Assessment}</td>
                                                        <td>{result.Supervisor}</td>
                                                        <td>{result.Assessor}</td>
                                                        <td>{result.Scheduled_date}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>

                                    </table>}
                                    {longeur === 0 && <h5 className="text-danger text-center">No Assessments Scheduled Yet!</h5>}

                                </div>
                                <div className="bcourse text-center">
                                    <a href="/CourseSelection" className="watch-sched-cta">Back to Course Selection</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }
}

export default withRouter(Adetails);

