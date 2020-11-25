import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderPortfolioStocks = () => {
    return this.props.portfolioStocks.map(stock => {
     return <Stock {...stock} key={stock.id} toggleStock={this.props.toggleStock}/>
    })
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>

        { this.renderPortfolioStocks() }

      </div>
    );
  }

}

export default PortfolioContainer;
