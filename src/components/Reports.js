import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const Reports = ({token, loginUser}) => {

    const navigate = useNavigate()

    if(!token){
        navigate('/login')
    }

	if(!loginUser.role) return (<div>Not allowed</div>);

    return <div className="container my-4">
        <h2 className="my-4">Filter Reports</h2>
        <div>
            <div className="row">
                <div className="my-2 col-lg-7">
                    <div className="input-group">
                        <span className="input-group-text">From date</span>
                        <input type="date" className="form-control" i="date-from" name="date-from" />
                        <span className="input-group-text">To date</span>
                        <input type="date" className="form-control" i="date-to" name="date-to" />
                    </div>
                </div>
                <div className="my-2 col-lg-auto align-self-center">(OR)</div>
                <div className="my-2 col-lg-3">
                    <div className="input-group">
                        <span className="input-group-text">Year</span>
                        <input type="number" className="form-control" i="date-year" name="date-year" min="2020" max="9999" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="my-2 col-lg-4">
                    <div className="input-group">
                        <label htmlFor="desc" className="input-group-text">Event Type</label>
                        <select className="form-select" aria-label="Type of Event" name="type" i="type">
                            <option value="0">-- Select --</option>
                            <option value="1">General</option>
                            <option value="2">Meeting</option>
                            <option value="3">Fest</option>
                            <option value="4">Workshop</option>
                        </select>
                    </div>
                </div>
                <div className="my-2 col-lg-4">
                    <input type="text" className="form-control" placeholder="Search Keywords" aria-label="Search keywords" />
                </div>
                <div className="my-2 col-lg-4">
                    <button className="btn btn-primary">Search</button>
                </div>
            </div>
        </div>
        <h3 className="my-4">Search Results</h3>
        <div className="table my-4" style={{ overflowX: 'auto' }}>
            <table className="table table-hover" style={{ minWidth: '600px' }}>
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Event name</th>
                        <th scope="col">Event Type</th>
                        <th scope="col">Event Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [1, 2, 3].map((e, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>Event {e}</td>
                                <td>Meeting</td>
                                <td className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex repudiandae odit, pariatur velit ipsam sed voluptas quisquam quae maxime fuga nemo enim ad autem tempore non! Velit deleniti animi exercitationem.</td>
                                <td>
                                    <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target={'#myModalNew' + i}><FontAwesomeIcon icon={faInfoCircle}/> Details</button>
                                    <button className="btn btn-success m-1"><FontAwesomeIcon icon={faDownload}/> Download</button>
                                    <div className="modal fade" id={'myModalNew' + i} tabIndex="-1" aria-labelledby={"exampleModalLabel" + i} aria-hidden="true">
                                        <div className="modal-dialog modal-xl modal-dialog-scrollable">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id={"exampleModalLabel" + i}>Event {e}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi praesentium recusandae rem hic accusantium aliquid quis! Sequi natus, soluta harum quas debitis, accusamus quia nulla porro vero placeat possimus ullam!
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default Reports
