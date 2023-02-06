import React, { useState } from 'react'
import '../Schedule.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Schedule = ({token}) => {

    const navigate = useNavigate()

    if(!token){
        navigate('/login')
    }

    const [data, setData] = useState({title: '', type: 0, desc: '', datetime: '', venue: 0, crowd: '', items: [false, false, false, false], itemsCount: ['', '', '', ''], notes: ''})
    const [step, setStep] = useState(1);
    
    const handleChangeText = (e)=>{
        if(e.target.name==='title' || e.target.name==='desc' || e.target.name==='crowd' || e.target.name==='notes' || e.target.name==='type' || e.target.name==='venue' || e.target.name==='datetime')
        setData({...data, [e.target.name]: e.target.value})
        else if(e.target.name.startsWith('item')){
            let i = e.target.name.slice(-1)
            let d = data.items
            d[i-1] = !d[i-1]
            setData({...data, items: d})
        }
        else if(e.target.name.startsWith('count')){
            let i = e.target.name.slice(-1)
            let d = data.itemsCount
            d[i-1] = e.target.value
            setData({...data, itemsCount: d})
        }
    }

	const submitData = ()=>{
		let newEvents = {...data}
        let newItems = []
        for (let i = 0; i < data.items.length; i++) {
            if(data.items[i]){
                newItems.push([['Samosa', 'Curry Puff', 'Sprite', 'ThumbsUp'][i], data.itemsCount[i]])
            }
        }
        newEvents.items = newItems
        delete newEvents.itemsCount
		fetch('/api/event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': token
			},
			body: JSON.stringify({
				...newEvents
			})
		}).then(data=>data.json()).then(data=>{
			console.log(data)
            new Swal('Success', 'Event saved successfully', 'success').then(d=>{navigate('/events')})
		}).catch(e=>{
            console.log(e)
            new Swal('Error', 'An error occured', 'error')
        })
	}

    return <div className="container my-3">
        <div className="row justify-content-center">
            <div className="p-0 mt-3 mb-2">
                <div className="px-0 pt-4 pb-0 mt-3 mb-3">
                    <form className="container-fluid" id="form">
                        <ul className="p-1 text-center" id="progressbar">
                            <li id="step1" className="prog active"><strong className="d-sm-block d-none">Event Details</strong></li>
                            <li id="step2" className={"prog "+((step>1)?'active':'')}><strong className="d-sm-block d-none">Slot Info</strong></li>
                            <li id="step3" className={"prog "+((step>2)?'active':'')}><strong className="d-sm-block d-none">Refreshments</strong></li>
                            <li id="step4" className={"prog "+((step>3)?'active':'')}><strong className="d-sm-block d-none">Review and Submit</strong></li>
                        </ul>
                        {(step===1) &&
                            <fieldset>
                            <h2>Event Details</h2>
                            <div className="my-4 col-lg-6">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Event Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={data.title} onChange={handleChangeText} required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Type of Event</label>
                                    <select className="form-select" aria-label="Type of Event" name="type" id="type" value={data.type} onChange={handleChangeText}>
                                        <option value="0">-- Select --</option>
                                        <option value="1">General</option>
                                        <option value="2">Meeting</option>
                                        <option value="3">Fest</option>
                                        <option value="4">Workshop</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea className="form-control" id="desc" name="desc" rows="3" placeholder="Description" value={data.desc} onChange={handleChangeText} required={true}></textarea>
                                </div>
                            </div>
                            <input type="button" name="next-step" className="mt-4 btn btn-primary next-step" value="Next Step" onClick={()=>setStep(step+1)} />
                            </fieldset>
                        }
                        {(step===2) &&
                            <fieldset>
                                <h2>Slot Info</h2>
                                <div className="my-4 col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="datetime" className="form-label">Date and Time</label>
                                        <input type="datetime-local" className="form-control" id="datetime" name="datetime" value={data.date} onChange={handleChangeText} min={new Date().toISOString().split('T')[0]+'T00:00'} required={true} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="venue" className="form-label">Event Venue</label>
                                        <select className="form-select" aria-label="Event Venue" name="venue" id="venue" value={data.venue} onChange={handleChangeText} required={true}>
                                            <option value="0">-- Select --</option>
                                            <option value="1">Auditorium</option>
                                            <option value="2">Mini Auditorium</option>
                                            <option value="3">Block - E</option>
                                            <option value="4">Ground</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="crowd" className="form-label">Expected Crowd</label>
                                        <input type="number" className="form-control" id="crowd" placeholder="No. of People Expected" name="crowd" min="10" value={data.crowd} onChange={handleChangeText} required={true} />
                                    </div>
                                </div>
                                <input type="button" name="previous-step" className="mt-4 btn btn-primary previous-step" value="Previous Step" onClick={()=>setStep(step-1)} />
                                <input type="button" name="next-step" className="mt-4 btn btn-primary next-step" value="Next Step" onClick={()=>setStep(step+1)} />
                            </fieldset>
                        }
                        {(step===3) &&
                            <fieldset>
                                <h2>Refreshments</h2>
                                <div className="row justify-content-between">
                                    <div className="my-4 col-lg-6">
                                        <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="item-1" id="item-1" checked={data.items[0]} onChange={handleChangeText} />
                                                <label className="form-check-label" htmlFor="item-1">Samosa</label>
                                            </div>
                                            <div className="col-sm-auto col-4">
                                                <input className="form-control" type="number" name="count-1" id="count-1" placeholder="Count" min="0" disabled={!data.items[0]} value={data.itemsCount[0]} onChange={handleChangeText} />
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="item-2" id="item-2" checked={data.items[1]} onChange={handleChangeText} />
                                                <label className="form-check-label" htmlFor="item-2">Curry Puff</label>
                                            </div>
                                            <div className="col-sm-auto col-4">
                                                <input className="form-control" type="number" name="count-2" id="count-2" placeholder="Count" min="0" disabled={!data.items[1]} value={data.itemsCount[1]} onChange={handleChangeText} />
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="item-3" id="item-3" checked={data.items[2]} onChange={handleChangeText} />
                                                <label className="form-check-label" htmlFor="item-3">Sprite</label>
                                            </div>
                                            <div className="col-sm-auto col-4">
                                                <input className="form-control" type="number" name="count-3" id="count-3" placeholder="Count" min="0" disabled={!data.items[2]} value={data.itemsCount[2]} onChange={handleChangeText} />
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="item-4" id="item-4" checked={data.items[3]} onChange={handleChangeText} />
                                                <label className="form-check-label" htmlFor="item-4">ThumbsUp</label>
                                            </div>
                                            <div className="col-sm-auto col-4">
                                                <input className="form-control" type="number" name="count-4" id="count-4" placeholder="Count" min="0" disabled={!data.items[3]} value={data.itemsCount[3]} onChange={handleChangeText} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-3 col-lg-5">
                                        <label htmlFor="notes" className="form-label">Notes</label>
                                        <textarea className="form-control" id="notes" name="notes" rows="7" placeholder="Notes" value={data.notes} onChange={handleChangeText}></textarea>
                                    </div>
                                </div>
                                <input type="button" name="previous-step" className="mt-4 btn btn-primary previous-step" value="Previous Step" onClick={()=>setStep(step-1)} />
                                <input type="button" name="next-step" className="mt-4 btn btn-primary next-step" value="Preview" onClick={()=>setStep(step+1)} />
                            </fieldset>
                        }
                        {(step===4) && 
                            <fieldset>
                                <h2>Preview and Submit</h2>
                                <h3 className='my-4'>Event Details</h3>
                                <div className="my-3 col-lg-6 fs-5">
                                    <div className="mb-3">
                                        <b>Event Title: </b>
                                        <span>&nbsp;{data.title}</span>
                                    </div>
                                    <div className="mb-3">
                                        <b>Event Type: </b>
                                        <span>&nbsp;{['Not Selected', 'General', 'Meeting', 'Fest', 'Workshop'][data.type]}</span>
                                    </div>
                                    <div className="mb-3">
                                        <b>Description: </b>
                                        <span>{data.desc}</span>
                                    </div>
                                </div>
                                <h3 className='my-4'>Slot Info</h3>
                                <div className="my-3 col-lg-6 fs-5">
                                    <div className="mb-3">
                                        <b>Date and Time: </b>
                                        <span>&nbsp;{data.datetime}</span>
                                    </div>
                                    <div className="mb-3">
                                        <b>Event Venue: </b>
                                        <span>&nbsp;{['Not Selected', 'Auditorium', 'Mini Auditorium', 'Block - E', 'Ground'][data.venue]}</span>
                                    </div>
                                    <div className="mb-3">
                                        <b>Expected Crowd: </b>
                                        <span>{data.crowd}</span>
                                    </div>
                                </div>
                                <h3 className='my-4'>Refreshments</h3>
                                <div className="my-3 col-lg-6 fs-5">
                                    <div className="mb-3">
                                        <b>Items and Quantity: </b>
                                        <div className='my-2'>
                                            {
                                                data.items.map((e, i)=>{
                                                    return e?<div className='my-2' key={i}>{['Samosa', 'Curry Puff', 'Sprite', 'ThumbsUp'][i]+' - '+(data.itemsCount[i]?data.itemsCount[i]:0)}</div>:''
                                                })
                                            }
                                            {data.items.includes(true)?'':'-'}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <b>Notes: </b>
                                        <div className='my-2'>{data.notes}</div>
                                    </div>
                                </div>
                                <input type="button" name="previous-step" className="mt-4 btn btn-primary previous-step" value="Previous Step" onClick={()=>setStep(step-1)} />
                                <input type="button" className="mt-4 btn btn-primary next-step" value="Submit" onClick={submitData}  />
                            </fieldset>
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Schedule
