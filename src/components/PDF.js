import React from 'react'

const PDF = ({data}) => {
    return (
        <div className='container my-3'>
            <h3 className='mb-4'>{data.title}</h3>
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
    )
}

export default PDF
