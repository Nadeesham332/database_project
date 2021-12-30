import './About.css'
import Navbar from '../../Components/MainNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const About = () => {
    return (
        <div className="about_body">
            <Navbar></Navbar>

            <div className="image-aboutus-banner mt-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="lg-text">About Us</h1>

                            <p className="image-aboutus-para">Welcome to Result Sheet System of Engineering Foundation Institute.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="aboutus-secktion paddingTB60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="strong">Who we are and<br />what we do</h1>

                            <p className="lead">Handle all course assessments<br />easily and quickly </p>
                        </div>
                        <div className="col-md-6">
                            <p>We handle all course assessment activities with providing guardian result viewing facility. This is the side site of <b>Engineering Foundation Institute</b>. If you are not registered yet please try by <button type="button" className="btn-link btn-anchor">home site</button>.</p>
                            <p>By this system, <br />
                                • Students and guardians can see there/student’s results. <br />
                                • Assessors can insert, update or delete there responsible assessment results from database.<br />
                                • Course instructors can handle (add, edit, remove) there responsible course’s assignment details.<br />
                                • Anyone can see assessment details (assessment, scheduled date, etc.).<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default About;
