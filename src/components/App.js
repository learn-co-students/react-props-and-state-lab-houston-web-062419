import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = () => {
    let typeUrl = '/api/pets?type='
    if(this.state.filters.type === 'all'){
      fetch('/api/pets')
    .then(res => res.json())
    .then(pets => {
      this.setState({
        pets: pets
      })
    })
    }
    else{
      fetch(typeUrl + this.state.filters.type)
    .then(res => res.json())
    .then(pets => {
      this.setState({
        pets: pets
      })
    })
    }


    
  }

  changeFilter = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  adoptPet =(id) => {

  }


  render() {
    return (
      <div className="ui container">
      {this.fetchPets()}
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters changeFilter={this.changeFilter} fetchPets={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adopt={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
