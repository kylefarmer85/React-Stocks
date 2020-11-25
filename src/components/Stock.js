import React from 'react'

const Stock = ({id, name, price, toggleStock}) => (
  <div>

    <div className="card" onClick={() => toggleStock(id)}>
      <div className="card-body">
        <h5 className="card-title">{
            name
          }</h5>
        <p className="card-text">{
            price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
