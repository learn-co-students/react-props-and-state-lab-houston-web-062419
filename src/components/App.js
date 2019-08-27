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

onChangeType = (e) =>{
  
  this.setState({
    pets: this.state.pets,
      filters: {
        type: e.target.value
      }
  })
}

onFindPetsClick = () =>{
  console.log("in find" + this.state.filters.type)
  let url = ""
  //debugger
  if (this.state.filters.type == "all")
  {
    url = "/api/pets"
  } else
  {
    url = `/api/pets?type=${this.state.filters.type}`
  }
 
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({pets: json}));
    console.log(this.state.pets)
}

onAdoptPet = ( id) =>{
  console.log("in adopt " + id)
// debugger
 let newpets = this.state.pets
  newpets.forEach(pet => {
     if (pet.id == id) {
         pet.isAdopted = true
     }
   })

  this.setState({pets: newpets})

}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
