import React from 'react'
import 'bootstrap/js/dist/modal';
import MyModal from './MyModal';

const Card = ({title, desc, desc1, id, approve=false}) => {
    return <div className="card box-card">
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <button className="btn btn-primary text-end" data-bs-toggle="modal" data-bs-target={'#myModal'+id}>Show Details</button>
            {approve && <div className="text-end">
                <button className="btn btn-danger text-end mx-1">Decline</button>
                <button className="btn btn-success text-end mx-1">Approve</button>
            </div>}
        </div>
        <MyModal title={title} desc={desc1} id={id}/>
    </div>
}

export default Card
