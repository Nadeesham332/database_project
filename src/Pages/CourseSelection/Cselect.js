import React from 'react';
import { Link } from 'react-router-dom';
import './Cselect.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Axios for get request
import axios from 'axios';
import assessment from './assessment.jpg';
import Navbar from '../../Components/MainNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';

class Cselect extends React.Component {
    // initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        //get request
        axios.get('http://localhost/result-sheet-system/cselect.php').then(res => {
            this.setState({ data: res.data });
        })
            .catch(
                (error) => {
                    console.log('Database not connected!');
                }
            );
    }

    render() {

        return (

            <>
                <Navbar />
                <section id="myModal" className="modal-fade">

                    <div className="modal-dialog modal-login">

                        <div className="modal-content">
                            <div className="modal-header">

                                <div className="avatar">
                                    <img src={assessment} alt="Avatar" />
                                </div>
                                <ul>
                                    <h2 className="modal-title">Assessments Schedule</h2>
                                    <h4 className="modal-title">Course Selection</h4>
                                </ul>

                                <a href='/'><button type="button" className="close" data-dismiss="modal"> <span aria-hidden="true">&times;</span></button></a>
                            </div>

                            <div className="modal-body">
                                <div className="container mb-5 mt-5 text-left">


                                    {this.state.data.map((result) => {

                                        return (

                                            <li key={result.Course_id} className="c-list" >
                                                <Link className="link-light" to={`/AssessmentDetails/${result.Course_id}`}>{result.Course} - {result.Course_id}</Link>

                                            </li>

                                        )
                                    })}


                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <Footer />
            </>

        )
    }

};


export default Cselect;