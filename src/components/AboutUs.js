import React from 'react'
import Data from '../sample.json'

const AboutUs = () => {
    return (
        <div className='container my-3'>
            <h3 className='my-3'>Data from JSON</h3>
            <table className="table table-hover my-3">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Data && Data.map((e, i) => {
                            return <tr key={i}>
                                <th scope="row">{e.id}</th>
                                <td>{e.name}</td>
                                <td>{e.lati}</td>
                                <td>{e.lon}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default AboutUs
