import menu from './menu.svg';
import exit from './exit.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import './Navbar.css'
import { useLocation } from "react-router-dom";
const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 992);
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;
    const { hash } = location;
    console.log(hash)

    const updateMedia = () => {
        setDesktop(window.innerWidth >= 992);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (

        <nav className="navbar">
            <div className="container">
                <button type="button" className="btn-link btn-anchor logo">Result<span>Sheet</span>System</button>

                <img id="mobile-cta" onClick={() => setIsOpen(true)} className="mobile-menu" src={menu} alt="Open Navigation" />

                {(isOpen || isDesktop) && <nav>
                    <img id="mobile-exit" onClick={() => setIsOpen(false)} className="mobile-menu-exit" src={exit} alt="Close Navigation" />

                    <ul className="primary-nav">
                        <li className={pathname === "/" ? "font-weight-bold" : ""}><a href="/" onClick={() => { setIsOpen(false) }} >Home</a></li>

                        <li className={hash === "#contact" ? "font-weight-bold" : ""}><a href="/#contact" onClick={() => { setIsOpen(false) }} >Contact</a></li>
                        <li className={pathname === "/About" ? "font-weight-bold" : ""}><a href="/About">About</a></li>
                    </ul>

                    <ul className="secondary-nav">
                        <li><label className='font-weight-bold'>LogIn as</label></li>
                        <li className="go-premium-cta"><a href="/AssessorLogin">Assessor</a></li>
                        <li className="go-premium-cta"><a href="/InstructorLogin">Instructor</a></li>
                    </ul>
                </nav>}
            </div>


        </nav>
    );

}

export default Navbar;