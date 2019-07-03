import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import champsJSON from '../../data/champs.json';
import ChampRow from './ChampRow';

class ChampRanker extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      champsToDisplay: null,
    }
    this.sortByName = this.sortByName.bind(this);
    this.sortByCost = this.sortByCost.bind(this);
    this.sortByOrigin = this.sortByOrigin.bind(this);
    this.sortByClass = this.sortByClass.bind(this);
  }

  componentDidMount() 
  {
    var champsToDisplay = champsJSON.sort(function(a,b) {
      return a.cost_number - b.cost_number;
    })
    this.setState({
      champsToDisplay: champsToDisplay
    });
  }

  render() 
  {
    if (!this.state.champsToDisplay) {
      return <p>Loading...</p>
    }
    if (this.state.champsToDisplay.length === 0) {
      return <p>No data, dude</p>
    }
    return (
      <Table bordered size='sm' variant='dark'>
        <thead>
          <tr>
            <th><Button variant='secondary' onClick={this.sortByName} style={{width:'100%'}}>Name</Button></th>
            <th><Button variant='secondary' onClick={this.sortByCost} style={{width:'100%'}}>Cost</Button></th>
            <th><Button variant='secondary' onClick={this.sortByOrigin} style={{width:'100%'}}>Origin</Button></th>
            <th><Button variant='secondary' onClick={this.sortByClass} style={{width:'100%'}}>Class</Button></th>
          </tr>
        </thead>
        <tbody> 
          {
            this.state.champsToDisplay.map((champ, i) => {
              return <ChampRow champ={champ} key={i}/>;
            })
          }
        </tbody>
      </Table>
    );
  }

  sortByName() {
    // Sort by name
    var champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
      return a.name_text.localeCompare(b.name_text);
    })
    this.setState({
      champsToDisplay: champsToDisplay
    });
  }

  sortByCost() {
    // Sort by cost
    var champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
      return a.cost_number - b.cost_number;
    })
    this.setState({
      champsToDisplay: champsToDisplay
    });
  }

  sortByOrigin() {
    // First sort by cost, then sort by origin
    var champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
      return a.cost_number - b.cost_number;
    }).sort(function(a,b) {
      return a.origin_text.localeCompare(b.origin_text);
    })
    this.setState({
      champsToDisplay: champsToDisplay
    });
  }
  sortByClass() {
    // First sort by cost, then sort by class
    var champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
      return a.cost_number - b.cost_number;
    }).sort(function(a,b) {
      return a.class_text.localeCompare(b.class_text);
    })
    this.setState({
      champsToDisplay: champsToDisplay
    });
  }
}

export default ChampRanker;
