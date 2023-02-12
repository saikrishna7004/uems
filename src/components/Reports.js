import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import NewModal from './NewModal'
import { useState } from 'react'
import PDF from './PDF'

const Reports = ({ token, loginUser }) => {

    function truncateWords(text, maxWords) {
        let truncatedText = text.split(" ").slice(0, maxWords).join(" ");
        if (text.split(" ").length > maxWords) {
            truncatedText += "...";
        }
        return truncatedText;
    }

    const navigate = useNavigate()

    if (!token) {
        navigate('/login')
    }

    const [events, setEvents] = useState([])

    useEffect(() => {
        if (!token) return
        fetch('/api/event/reports', { headers: { 'Authorization': token } }).then(data => data.json()).then(data => {
            setEvents(data.data)
        }).catch(e => {
            console.log(e)
            setEvents([])
        })
    }, [token])

    const handleDownload = async (e, i) => {
        let newWindow = window.open('', i, 'resizable=yes,status=0,toolbar=0,scrollbars=1')
        await newWindow.document.write(`<html><head><title>${e.title}</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></head><body></body>`)
        newWindow.document.body.innerHTML = `<div id="root"></div>`
        const root = await ReactDOM.createRoot(newWindow.document.getElementById('root'));
        await root.render(<PDF data={e} />);
        newWindow.print()
    }

    if (!loginUser.role) return (<div>Not allowed</div>);

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
                        events.map((e, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{e.title}</td>
                                <td>{['Not Selected', 'General', 'Meeting', 'Fest', 'Workshop'][e.type]}</td>
                                <td className="desc">{truncateWords(e.desc)}</td>
                                <td>
                                    <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target={'#myModal' + e._id}><FontAwesomeIcon icon={faInfoCircle} /> Details</button>
                                    <button className="btn btn-success m-1" onClick={() => handleDownload(e, i)}><FontAwesomeIcon icon={faDownload} /> Download</button>
                                    <NewModal data={e} />
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
