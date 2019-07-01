import React, { Component } from 'react';
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
  }

  componentDidMount() 
  {
    var sortJsonArray = require('sort-json-array');
    var champsToDisplay = sortJsonArray(champsJSON, 'cost_number', 'asc');
    champsToDisplay = champsToDisplay.map((champ) => {
      return <ChampRow champ={champ} key={champ.slug_text}/>;
    });

    this.setState({
      champsToDisplay: champsToDisplay,
    });
  }

  render() 
  {
    if (!this.state.champsToDisplay) {
      return <p>Loading...</p>
    }
    return (
      <Table bordered size='sm' variant='dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
            <th>Origin</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {this.state.champsToDisplay}
        </tbody>
      </Table>
    );
  }
}

export default ChampRanker;
