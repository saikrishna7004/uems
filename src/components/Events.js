import React from 'react'
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import { useState } from 'react';
import { useEffect } from 'react';
import NewModal from './NewModal';

const Events = ({token}) => {

	const [events, setEvents] = useState([])

	useEffect(() => {
		fetch('/api/event').then(data=>data.json()).then(data=>{
			setEvents(data.data.reverse().filter((e)=>e.status==2))
		}).catch(e=>console.log(e))
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
					events.length==0 && <>No events to display</>
				}
			</div>
			<div className="tab-pane fade" id="upcomming-tab-pane" role="tabpanel" aria-labelledby="upcomming-tab" tabIndex="0">
				{/* {
					[5, 6].map((e, i)=>{
						return <Card id={e} key={e+i} title={'Event Test '+e} desc='With supporting text below as a natural lead-in to additional content.' desc1='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus vitae ratione harum, magnam sint et quis iure dolor! Ea incidunt debitis numquam, eius non odit vero fugit impedit cupiditate reiciendis reprehenderit fuga, doloribus beatae, esse repellendus? Cum odio commodi sunt, hic, in voluptates dolorum ut facere similique tenetur accusamus quaerat dolores facilis! Optio a non provident laboriosam explicabo ipsa mollitia voluptas inventore eos atque. Quisquam sint suscipit quod commodi exercitationem eum aliquid asperiores maiores, quasi velit, quo qui vel officia ad doloremque illum, eligendi magnam? Ea consectetur nostrum ipsam ipsa odio veniam tenetur at distinctio explicabo. Facere ullam beatae laboriosam.' />
					})
				} */}
			</div>
			<div className="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="past-tab" tabIndex="0">
				{/* {
					[7, 8, 9].map((e, i)=>{
						return <Card id={e} key={e+i} title={'Event Test '+e} desc='With supporting text below as a natural lead-in to additional content.' desc1='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus vitae ratione harum, magnam sint et quis iure dolor! Ea incidunt debitis numquam, eius non odit vero fugit impedit cupiditate reiciendis reprehenderit fuga, doloribus beatae, esse repellendus? Cum odio commodi sunt, hic, in voluptates dolorum ut facere similique tenetur accusamus quaerat dolores facilis! Optio a non provident laboriosam explicabo ipsa mollitia voluptas inventore eos atque. Quisquam sint suscipit quod commodi exercitationem eum aliquid asperiores maiores, quasi velit, quo qui vel officia ad doloremque illum, eligendi magnam? Ea consectetur nostrum ipsam ipsa odio veniam tenetur at distinctio explicabo. Facere ullam beatae laboriosam.' />
					})
				} */}
			</div>
		</div>
	</div>
}

export default Events
