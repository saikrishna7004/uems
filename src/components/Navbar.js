import { faHome, faKey, faList, faListCheck, faPaperPlane, faPersonChalkboard, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../logo.png';
import 'bootstrap/js/dist/collapse'

const Navbar = ({loginUser}) => {
	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
			<div className="container-fluid">
				<Link className="navbar-brand d-flex align-items-center" to="/"><img src={logo} alt="Logo" style={{height: "25px", width: "25px"}} />&nbsp;Eventia</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/events"><FontAwesomeIcon icon={faList} /> Events</NavLink>
						</li>
						{(loginUser.role==1 || loginUser.role==2) && <li className="nav-item">
							<NavLink className="nav-link" to="/requests"><FontAwesomeIcon icon={faListCheck} /> Requests</NavLink>
						</li>}
						{(loginUser.role) && <><li className="nav-item">
							<NavLink className="nav-link" to="/schedule"><FontAwesomeIcon icon={faPersonChalkboard} /> Schedule</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/reports"><FontAwesomeIcon icon={faPaperPlane} /> Reports</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/logout"><FontAwesomeIcon icon={faSignOut} /> Logout</NavLink>
						</li></>}
						{Object.keys(loginUser).length==0 && <li className="nav-item">
							<NavLink className="nav-link" to="/login"><FontAwesomeIcon icon={faSignIn} /> Login</NavLink>
						</li>}
					</ul>
					<div className="text-white">{loginUser.name}</div>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
