import React from 'react'
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import { useEffect } from 'react';
import { useState } from 'react';
import NewModal from './NewModal';
import { useNavigate } from 'react-router-dom';

const Requests = ({token, loginUser}) => {

	const BACKEND_URL = process.env.NODE_ENV=="development"?"":"https://uems-usdl.onrender.com"
	
    const navigate = useNavigate()

    if(!token){
        navigate('/login')
    }

	const [events, setEvents] = useState([])
	
	useEffect(() => {
		fetch(BACKEND_URL+'/api/event/requests', {headers: {'Authorization': token}}).then(data=>data.json()).then(data=>{
			setEvents(data.data.reverse())
		}).catch(e=>console.log(e))
	}, [])
	
	if(!loginUser.role || !(loginUser.role==1 || loginUser.role==2)) return (<div>Not allowed</div>);

	const eventStatusUpdate = (e, i, index)=>{
		fetch(BACKEND_URL+'/api/event/requests/status', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify({ e, i })
		}).then(data=>data.json()).then(data=>{
			console.log(data)
			let newEvents = [...events]
			newEvents[index].status = data.status
			setEvents(newEvents)
		}).catch(e=>console.log(e))
	}

    return <div className="container my-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
			<li className="nav-item" role="presentation">
				<button className="nav-link active" id="new-request-tab" data-bs-toggle="tab" data-bs-target="#new-request-tab-pane" type="button"
					role="tab" aria-controls="new-request-tab-pane" aria-selected="true">New Requests</button>
			</li>
			<li className="nav-item" role="presentation">
				<button className="nav-link" id="rejected-tab" data-bs-toggle="tab" data-bs-target="#rejected-tab-pane" type="button"
					role="tab" aria-controls="rejected-tab-pane" aria-selected="false">Rejected Requests</button>
			</li>
		</ul>
		<div className="tab-content border p-4" id="myTabContent">
			<div className="tab-pane fade show active" id="new-request-tab-pane" role="tabpanel" aria-labelledby="new-request-tab" tabIndex="0">
				{
					events.map((e, i)=>{
						return (e.status==1) && (
						<div className="card box-card" key={i}>
							<div className="card-body">
								<h5 className="card-title">{e.title}</h5>
								<p className="card-text">{e.desc}</p>
								<button className="btn btn-primary text-end" data-bs-toggle="modal" data-bs-target={'#myModal'+e._id}>Show Details</button>
								<div className="text-end">
									<button className="btn btn-danger text-end mx-1" onClick={()=>eventStatusUpdate(e._id, 3, i)}>Decline</button>
									<button className="btn btn-success text-end mx-1" onClick={()=>eventStatusUpdate(e._id, 2, i)}>Approve</button>
								</div>							
							</div>
							<NewModal data={e}/>
						</div>
						)
					})
				}
				{
					events.filter(e=>(e.status==1)).length==0 && <>No events to display</>
				}
			</div>
			<div className="tab-pane fade" id="rejected-tab-pane" role="tabpanel" aria-labelledby="rejected-tab" tabIndex="0">
			{
					events.map((e, i)=>{
						return (e.status==3) && (
						<div className="card box-card" key={i}>
							<div className="card-body">
								<h5 className="card-title">{e.title}</h5>
								<p className="card-text">{e.desc}</p>
								<button className="btn btn-primary text-end" data-bs-toggle="modal" data-bs-target={'#myModal'+e._id}>Show Details</button>
							</div>
							<NewModal data={e}/>
						</div>
						)
					})
				}
				{
					events.length==0 && <>No events to display</>
				}
			</div>
		</div>
    </div>

}

export default Requests
