import illustration from './illustration.svg';
import exam from './exam-svgrepo-com.svg';
import person from './person.jpg';
import phone from './holding-phone.jpg';
import { useState, useEffect } from 'react';
import Navbar from '../../Components/MainNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import './Home.css'


const Home = () => {

    const [instructors, setInstructors] = useState([]);
    const [conError, setConError] = useState(false);

    let cnt = 0;

    useEffect(() => {

        axios.get('http://localhost/result-sheet-system/course_instructors.php')
            .then(res => {
                setInstructors(res.data);
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
            <Navbar />
            <section className="hero">
                {/* <h2 className='float-left'>Welcome To</h2>
                <br />
                <br />
                <h2 className='float-left'>Engineering Foundation Institute</h2> */}
                <div className="container">

                    <div className="left-col">

                        <h1>VIEW YOUR / YOUR STUDENT'S RESULTS</h1>
                        <a href="/StudentGuardianLogIn" className="primary-cta btn-info ">Click here!</a>
                        <a href="/CourseSelection" className="watch-sched-cta "  >
                            <img src={exam} alt="exam calender" />Assessments Schedule
                        </a>
                    </div>
                    <img src={illustration} className="hero-img" alt="Illustration" />
                </div>
            </section>


            <section className="testimonials-section">
                <div className="container">
                    <h2>Course Instructors</h2>
                    <div className="instruct">
                        {instructors.map((result) => {
                            cnt++;
                            return (
                                <li key={cnt}>
                                    <img src={person} alt="Person" />

                                    <blockquote>{result.iname}</blockquote>
                                    <hr />
                                    <cite>- {result.Education_status}</cite>
                                </li>
                            )
                        })}

                    </div>
                </div>
                {conError && <h5 className="text-dark text-center">Oops.. Connection Error...</h5>}
            </section>

            <section className="contact-section" id="contact">
                <div className="container">
                    <div className="contact-left">
                        <h2>Contact</h2>

                        <form action="">
                            <label htmlFor="name">Name or ID</label>
                            <input type="text" id="name" name="name" />

                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" cols="30" rows="10"></textarea>

                            <input type="submit" className="send-message-cta" value="Send message" />
                        </form>
                        <img src={phone} alt="Man holding phone"></img>
                    </div>

                </div>
            </section>
            <Footer className="cp-home" />

        </>
    );
}

export default Home;
