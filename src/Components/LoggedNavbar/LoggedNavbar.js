import menu from './menu.svg';
import exit from './exit.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import './LoggedNavbar.css'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 992);
    const [loginAs, setLoginAs] = useState('');
    const [msgBox, setMsgBox] = useState(false);
    const [goHome, setGoHome] = useState(false);
    const [goAbout, setGoAbout] = useState(false);
    const [goContact, setGoContact] = useState(false);


    const updateMedia = () => {
        setDesktop(window.innerWidth >= 992);
    };

    useEffect(() => {
        //get data in the session
        let data = localStorage.getItem('accessorDetails');
        data = JSON.parse(data);
        //  console.log(data)
        if (data === null)
            window.location.href = `/not_found`;
        setLoginAs(data.Logged_as);

        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, []);

    const clearUser = () => {
        localStorage.clear('accessorDetails');
        if (goHome) {
            window.location.href = `/`;
            setGoHome(false);
        }
        if (goAbout) {
            window.location.href = `/About`;
            setGoAbout(false);
        }
        if (goContact) {
            window.location.href = `/#contact`;
            setGoContact(false);
        }
    }

    const logOutFirst = () => {
        setIsOpen(false);
        setMsgBox(true);
    }

    return (


        <nav className="navbar">
            <div className="container">
                <button type="button" className="btn-link btn-anchor logo">Result<span>Sheet</span>System</button>

                <img id="mobile-cta" onClick={() => setIsOpen(true)} className="mobile-menu" src={menu} alt="Open Navigation" />

                {(isOpen || isDesktop) && <nav>
                    <img id="mobile-exit" onClick={() => setIsOpen(false)} className="mobile-menu-exit" src={exit} alt="Close Navigation" />

                    <ul className="primary-nav">

                        <li className="current"><button type="button" className="btn-link btn-anchor" onClick={() => { setGoHome(true); logOutFirst(); }}
                        >Home</button></li>

                        <li><button type="button" className="btn-link btn-anchor" onClick={() => { setGoContact(true); logOutFirst(); }}
                        >Contact</button></li>
                        <li><button type="button" className="btn-link btn-anchor" onClick={() => { setGoAbout(true); logOutFirst(); }} >About</button></li>
                    </ul>

                    <ul className="secondary-nav">
                        <li><label className="font-weight-bold">Logged as {loginAs}</label></li>
                        <li className="go-premium-cta"><a onClick={clearUser} href="/">Log Out</a></li>
                    </ul>
                </nav>}
            </div>

            {msgBox && <div className="modal-contents display-fixed " autoFocus="autofocus" tabIndex="-1">
                <br />
                <div className="modal-body mt-1">
                    <div className="form-title text-center">
                        <h2 className='text-light mt-4 md-4'>Leave this page?</h2>
                    </div>
                    <div className="d-flex flex-column text-center">
                        <h6 className='text-light'>You need to log out first...</h6>
                        <br />
                        <button type="button" className="btn btn-primary btn-info btn-block btn-box" onClick={clearUser}>Log out</button>
                        <button type="button" className="btn btn-light btn-info btn-block btn-box"

                            onClick={() => {
                                setMsgBox(false);
                            }}>Cancel
                        </button>

                    </div>
                </div>
            </div>}


        </nav>
    );

}

export default Navbar;