import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(){
    super()
    this.state = {
      stocks: [],
      sortBy: '',
      filter: '',
    }  
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocks => {
      const updatedStocks = stocks.map(stock => {
        return {...stock, bought: false}
      }) 
      this.setState({
        stocks: updatedStocks
      })
    })
  }

  sortBy = (e) => {
    this.setState({
      sortBy: e.target.value
    })
  }


  filter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }


  findStocks = () => {
    const unsoldStocks = this.state.stocks.filter(stock => stock.bought === false)

    if (!this.state.sortBy)
      return unsoldStocks

    if (this.state.sortBy === "Alphabetically") {
      return unsoldStocks.sort((a, b) => {
       return a.name > b.name ? 1 : -1
      })
    } 

    if (this.state.sortBy === "Price") {
      return unsoldStocks.sort((a, b) => {
        return a.price - b.price
      })
    }
  }

  filterStocks = () => {
    const stocksToFilter = this.findStocks()
    
    switch (this.state.filter) {
      case ("Tech") : return (
        stocksToFilter.filter(stock => stock.type === "Tech")
      )
      case ("Sportswear"): return (
        stocksToFilter.filter(stock => stock.type === "Sportswear")
      )
      case ("Finance"): return (
        stocksToFilter.filter(stock => stock.type === "Finance")
      )   
      default: return stocksToFilter
    }

  }

  findPortfolioStocks = () => {
    return this.state.stocks.filter(stock => stock.bought === true )
  }

  toggleStock = (id) => {
    const updatedStocks = this.state.stocks.map(stock => {
      return stock.id === id ? (stock.bought ? {...stock, bought: false} : {...stock, bought: true}) : stock
    })
    this.setState({
      stocks: updatedStocks
    })
  }

  render() {
    return (
      
      <div>
        <SearchBar sortBy={this.sortBy} sort={this.state.sortBy} filter={this.filter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.filterStocks()} toggleStock={this.toggleStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolioStocks={this.findPortfolioStocks()} toggleStock={this.toggleStock} />

            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;
