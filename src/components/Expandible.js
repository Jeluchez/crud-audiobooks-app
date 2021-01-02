import React from 'react'

export const Expandible = ({ record }) => {
    console.log(record);
    return (

        <div className="card mb-3">
            <div className="card-outer-image">
                <img src={record.cover} className="card-img-top img-fluid" alt="..." />
            </div>
            <div className="card-body">
                <h5 className="card-title">Title</h5>
                <p className="card-text">{record.title}</p>
                <p className="card-text"><small className="text-muted"><span>Duration: </span>{record.duration}</small></p>
                <p className="card-text"><small className="text-muted"><span>Cost: </span>{record.cost_per_play}</small></p>
                <p>Narrators</p>
                {
                    record.narrators.map((n, i) => (
                        <p key={i}>{n}</p>
                    ))
                }
                <p>Authors</p>
                {
                    record.authors.map((a, i) => (
                        <p key={i} style={{ color: "black" }}>{a}</p>
                    ))
                }
            </div>
        </div>
    )
}
