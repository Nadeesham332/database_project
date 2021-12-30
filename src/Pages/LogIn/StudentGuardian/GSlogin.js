import './GSlogin.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Navbar from '../../../Components/MainNavbar/Navbar';
import Footer from '../../../Components/Footer/Footer';

const GSlogin = () => {

	const [accessors, setAccessors] = useState([]);
	const [stdId, setStdId] = useState(false);
	const [pw, setPw] = useState('');
	const [isValidUser, setIsValidUser] = useState(false);
	const [openErrorMsg, setOpenErrorMsg] = useState(false);
	const [conError, setConError] = useState(false);

	const onChangeStdID = (e) => {
		setStdId(e.target.value);
	}

	const onChangePw = (e) => {
		setPw(e.target.value);
	}

	useEffect(() => {
		axios.get('http://localhost/result-sheet-system/log_to_view_result.php')
			.then(res => {
				console.log(res.data)
				setAccessors(res.data)
			})
			.catch(
				(error) => {
					console.log('Database not connected!');
					setConError(true);
				}
			);
	}, []);



	const onSubmit = (e) => {
		e.preventDefault();

		accessors.forEach(accessor => {

			if (stdId === accessor.Reg_no && (pw === accessor.S_login_code || pw === accessor.G_login_code)) {

				setIsValidUser(true);
				console.log("Login success!");

				//Session object
				let accessorDetails;

				if (pw === accessor.G_login_code) {
					accessorDetails = {
						Std_id: accessor.Reg_no,
						Std: accessor.sname,
						Guardian: accessor.Guardian_name,
						Logged_as: 'Guardian'
					}
				}
				else {
					accessorDetails = {
						Std_id: accessor.Reg_no,
						Std: accessor.sname,
						Guardian: accessor.Guardian_name,
						Logged_as: 'Student'
					}
				}

				//Add the session
				localStorage.setItem('accessorDetails', JSON.stringify(accessorDetails));
				//get data in the session
				// let data = localStorage.getItem('accessorDetails');
				// data = JSON.parse(data);	

			}
			else {
				setOpenErrorMsg(true);
			}

		})
	}

	const handleToClose = () => {
		setOpenErrorMsg(false);
	};

	return (

		<>
			<Navbar />
			<section className="GSlogin-sec">
				<div className="container">
					<div className="d-flex justify-content-center h-100">
						<div className="card">
							<div className="card-header">
								<h3>View Results</h3>
							</div>
							{!conError && <div className="card-body">
								<form className="login-form" onSubmit={onSubmit} method="post">
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-user"></i></span>
										</div>
										<input type="text" className="form-control" placeholder="Student ID" variant="success" onChange={onChangeStdID} name="stdId" required />

									</div>
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-key"></i></span>
										</div>
										<input type="password" maxLength="8" className="form-control" variant="success" onChange={onChangePw} placeholder="LogIn Code" name="pw" required />
									</div>

									<div className="form-group">
										<input type="submit" value="View" variant="success" className="btn float-right login_btn" />
									</div>

								</form>
								{isValidUser ? <Redirect to="./ViewResult" /> : null}
								{/* {console.log({loginAs})	} */}
								<div stlye={{}}>
									<Dialog open={openErrorMsg} onClose={handleToClose}>
										<DialogTitle >{"LogIn Failed!"}</DialogTitle>
										<DialogContent>
											<DialogContentText className="text-danger">
												Invalid Srudent ID or LogIn code. Please try again!
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleToClose}
												color="primary" autoFocus>
												Close
											</Button>
										</DialogActions>
									</Dialog>
								</div>

							</div>}
							{conError && <h5 className=" mt-5 text-center">Connection Error!</h5>}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default GSlogin;