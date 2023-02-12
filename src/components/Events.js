import React from 'react'
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import { useState } from 'react';
import { useEffect } from 'react';
import NewModal from './NewModal';
import { List } from 'react-content-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

const Events = ({token}) => {

	const BACKEND_URL = process.env.NODE_ENV=="development"?"":"https://uems-usdl.onrender.com"
	
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(false)

	const loadData = ()=>{
		setLoading(true)
		setEvents([])
		fetch(BACKEND_URL+'/api/event').then(data=>data.json()).then(data=>{
			setEvents(data.data.reverse().filter((e)=>e.status==2))
			setLoading(false)
		}).catch(e=>{console.log(e); setLoading(false)})
	}

	useEffect(() => {
		loadData()
	}, [])

	return <div className="container my-3">
		<ul className="nav nav-tabs" id="myTab" role="tablist">
			<li className="nav-item" role="presentation">
				<button className="nav-link active" id="ongoing-tab" data-bs-toggle="tab" data-bs-target="#ongoing-tab-pane" type="button"
					role="tab" aria-controls="ongoing-tab-pane" aria-selected="true">Ongoing</button>
			</li>
			<li className="nav-item" role="presentation">
				<button className="nav-link" id="upcomming-tab" data-bs-toggle="tab" data-bs-target="#upcomming-tab-pane" type="button"
					role="tab" aria-controls="upcomming-tab-pane" aria-selected="false">Upcomming</button>
			</li>
			<li className="nav-item" role="presentation">
				<button className="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past-tab-pane" type="button"
					role="tab" aria-controls="past-tab-pane" aria-selected="false">Past</button>
			</li>
			<li className="nav-item" role="presentation" style={{marginLeft: 'auto'}}>
				<button className='btn' onClick={loadData}><FontAwesomeIcon icon={faRefresh}/></button>
			</li>
		</ul>
		<div className="tab-content border p-4" id="myTabContent">
			<div className="tab-pane fade show active" id="ongoing-tab-pane" role="tabpanel" aria-labelledby="ongoing-tab" tabIndex="0">
				{
					events.map((e, i)=>{
						return (
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
					!loading && events.length==0 && <>No events to display</>
				}
				{loading && <List />}
			</div>
			<div className="tab-pane fade" id="upcomming-tab-pane" role="tabpanel" aria-labelledby="upcomming-tab" tabIndex="0">
				
			</div>
			<div className="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="past-tab" tabIndex="0">
				
			</div>
		</div>
	</div>
}

export default Events
