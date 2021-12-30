
import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


const Admin = () => {

	const [adminId, setAdminId] = useState("");
	const [pw, setPw] = useState('');
	const [openErrorMsg, setOpenErrorMsg] = useState(false);

	const onChangePw = (e) => {
		setPw(e.target.value);
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (adminId === 'admin' && pw === '1111') {

			// setIsValidUser(true);
			console.log("Login success!");
			//Session object
			let accessorDetails = {
				Logged_as: 'admin'
			}
			//Add the session
			localStorage.setItem('accessorDetails', JSON.stringify(accessorDetails));
			window.location.href = "/admin/Student";
		}
		else {
			setOpenErrorMsg(true);
		}
	}

	const handleToClose = () => {
		setOpenErrorMsg(false);
	};

	return (

		<>
			<nav className="navbar">
				<button type="button" className="btn-link btn-anchor mx-auto logo">Result<span>Sheet</span>System</button>
			</nav>
			<section className="Adminlogin-sec">
				<div className="container">
					<div className="d-flex justify-content-center h-100">
						<div className="card mt-3 mb-3">
							<div className="card-header">
								<h3>Admin LogIn</h3>
							</div>
							<div className="card-body">
								<form className="login-form" onSubmit={onSubmit} method="post">
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-user"></i></span>
										</div>
										<input type="text" className="form-control" autoComplete="off" placeholder="Username" variant="success" onChange={(e) => setAdminId(e.target.value)} name="adminId" required />

									</div>
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-key"></i></span>
										</div>
										<input type="password" maxLength="8" className="form-control" variant="success" onChange={onChangePw} placeholder="Password" name="pw" required />
									</div>

									<div className="form-group">
										<input type="submit" value="LogIn" variant="success" className="btn float-right login_btn" />
									</div>

								</form>

								{/* {console.log({loginAs})	} */}
								<div stlye={{ background: 'gray' }}>
									<Dialog stlye={{ background: 'gray' }} open={openErrorMsg} onClose={handleToClose}>
										<DialogTitle className="text-center mt-2">{"LogIn Failed!"}</DialogTitle>
										<DialogContent>
											<DialogContentText className="text-danger">
												Invalid Username or Password. Please try again!
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

							</div>

						</div>
					</div>
				</div>
			</section>

		</>
	);
};

export default Admin;