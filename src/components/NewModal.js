import React from 'react'

const NewModal = ({ data }) => {
    return <div className="modal fade" id={'myModal' + data._id} tabIndex="-1" aria-labelledby={"exampleModalLabel" + data._id} aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={"exampleModalLabel" + data._id}>{data.title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h3 className='mb-4'>Event Details</h3>
                    <div className="my-3 col-lg-6 fs-5">
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
                    <h3 className='mt-4'>Notes</h3>
                    <div className="mb-3">
                        <div className='my-2'>{data.notes}</div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
}

export default NewModal
