import React from 'react'

const MyModal = ({title, desc, id}) => {
    return <div className="modal fade" id={'myModal'+id} tabIndex="-1" aria-labelledby={"exampleModalLabel"+id} aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={"exampleModalLabel"+id}>{title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {desc}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
}

export default MyModal
