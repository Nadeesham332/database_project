import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/MainNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Home.css';
import illustration from './illustration.svg';
import exam from './exam-svgrepo-com.svg';
import person1 from './person2.jpg';
import person2 from './person3.jpg';
import person3 from './person4.jpg';
import person4 from './person5.jpg';
import person5 from './person6.jpg';
import person6 from './person7.jpg';
import person7 from './person8.jpg';
import phone from './holding-phone.jpg';


const Home = () => {

    const [instructors, setInstructors] = useState([]);
    const [conError, setConError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const persons=[person1,person2,person3,person4,person5,person6,person7];

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
                {/* <h2 className='float-center' style={{color:'red'}}>Welcome To Engineering Foundation Institute</h2> */}
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
                        {instructors.map((result,key) => {
                            // console.log(key)
                            return (
                                <li key={key}>
                                    <img src={persons[key]} alt={result.iname} />

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

                        <form action='/' method='post' onSubmit={(e)=>{
                            e.preventDefault();
                            alert("Thank you! We'll be in touch soon.");
                            setIsSuccess(true)}
                        }>
                            <label htmlFor="name">Name or ID</label>
                            <input type="text" id="name" name="name" />

                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" cols="30" rows="10"></textarea>

                            <input type="submit" className="send-message-cta" value="Send message" />
                        </form>
                        <img src={phone} alt="Man holding phone"></img>
                    </div>

                </div>
               
               {isSuccess ? window.location.reload(false) : null}

        
            </section>

            <Footer className="cp-home" />

        </>
    );
}

export default Home;
