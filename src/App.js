import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Events from './components/Events';
import Home from './components/Home';
import Login from './components/Login';
import 'bootstrap/js/dist/carousel'
import Requests from './components/Requests';
import Schedule from './components/Schedule';
import Reports from './components/Reports';
import AboutUs from './components/AboutUs';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function App() {

	const BACKEND_URL = process.env.NODE_ENV=="development"?"":"https://uems-usdl.onrender.com"
	
	const [token, setToken] = useState('')
	const [loginUser, setLoginUser] = useState({})
	const navigate = useNavigate()

	const Logout = ({to}) => {
		localStorage.removeItem('token')
		setToken('')
		setLoginUser({})
		return <Navigate to={to} />
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const getData = localStorage.getItem("token");
			console.log(getData)
			setToken(getData)
		}
		if (token) {
			async function test() {
				try {
					let res = await fetch(BACKEND_URL+'/api/verify', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							token: token
						})
					})
					let data = await res.json()
					console.log(data)
					if(data.success && data.user) setLoginUser(data.user)
					if (data.message === 'jwt expired') {
						Swal.fire(
							'Login Expired',
							'The Login session has expired. Please Login again.',
							'error'
						).then(res=>{
							setToken('')
							setLoginUser({})
							navigate('/login')
						})
					}
					if (!data.success) localStorage.setItem('token', '')
				} catch (error) {
					console.log(error.message)
				}
			}
			test()
		}
	}, [token])

	return <>
		<Navbar token={token} loginUser={loginUser}/>
		<Routes setToken={setToken}>
			<Route exact path="/" element={<Home token={token} />}/>
			<Route exact path="/events" element={<Events token={token} />}/>
			<Route exact path="/login" element={<Login token={token} setToken={setToken} />}/>
			<Route exact path="/requests" element={<Requests token={token} loginUser={loginUser} />}/>
			<Route exact path="/schedule" element={<Schedule token={token} />}/>
			<Route exact path="/reports" element={<Reports token={token} loginUser={loginUser} />}/>
			<Route exact path="/aboutus" element={<AboutUs token={token} />}/>
			<Route exact path="/logout" element={<Logout
				to={{
					pathname: `/login`
				}}
			/>} />
		</Routes>
		<Footer/>
	</>
}

export default App;
