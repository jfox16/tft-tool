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
      sortedBy: 'cost_number'
    }
    this.sortByName = this.sortByName.bind(this);
    this.sortByCost = this.sortByCost.bind(this);
    this.sortByOrigin = this.sortByOrigin.bind(this);
    this.sortByClass = this.sortByClass.bind(this);
    this.sortBy = this.sortBy.bind(this);
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
    this.sortBy('name_text');
  }

  sortByCost() {
    this.sortBy('cost_number');
  }

  sortByOrigin() {
    this.sortBy('origin_text');
  }

  sortByClass() {
    this.sortBy('class_text');
  }

  sortBy(field_to_sort_by) 
  {
    var champsToDisplay;
    var sortedBy = '';

    switch(field_to_sort_by) 
    {
      case 'name_text':
        if (this.state.sortedBy !== 'name_text') {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.name_text.localeCompare(b.name_text);
          });
          sortedBy = 'name_text';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(b,a) {
            return a.name_text.localeCompare(b.name_text);
          });
        }
        break;

      case 'cost_number':
        if (this.state.sortedBy !== 'cost_number') {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.cost_number - b.cost_number;
          });
          sortedBy = 'cost_number';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(b,a) {
            return a.cost_number - b.cost_number;
          });
        }
        break;

      case 'origin_text':
        if (this.state.sortedBy !== 'origin_text') {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.cost_number - b.cost_number;
          }).sort(function(a,b) {
            return a.origin_text.localeCompare(b.origin_text);
          });
          sortedBy = 'origin_text';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.cost_number - b.cost_number;
          }).sort(function(b,a) {
            return a.origin_text.localeCompare(b.origin_text);
          });
        }
        break;

      case 'class_text':
        if (this.state.sortedBy !== 'class_text') {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.cost_number - b.cost_number;
          }).sort(function(a,b) {
            return a.class_text.localeCompare(b.class_text);
          });
          sortedBy = 'class_text';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.cost_number - b.cost_number;
          }).sort(function(b,a) {
            return a.class_text.localeCompare(b.class_text);
          });
        }
        break;

      default:
        break;
    }

    this.setState({
      champsToDisplay: champsToDisplay,
      sortedBy: sortedBy
    });
  }
}

export default ChampRanker;
