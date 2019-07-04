import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import HashMap from 'hashmap';
import { MdSwapVert } from "react-icons/md";

import champsJSON from '../../data/champs.json';
import ChampRow from './ChampRow';
import SpacerRow from './SpacerRow';

import './index.css';

class ChampRanker extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      champsToDisplay: null,
      sortedBy: 'cost_number',
      reversed: true,
      originSelectedMap: null,
      classSelectedMap: null
    }
    this.sortByName = this.sortByName.bind(this);
    this.sortByCost = this.sortByCost.bind(this);
    this.sortByOrigin = this.sortByOrigin.bind(this);
    this.sortByClass = this.sortByClass.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.toggleChampSelected = this.toggleChampSelected.bind(this);
  }

  componentDidMount() 
  {
    var originSelectedMap = new HashMap();
    var classSelectedMap = new HashMap();

    var champsToDisplay = champsJSON.map(function(champ) 
    {
      champ.selected = false;
      if (!originSelectedMap.get(champ.origin_text)) {
        originSelectedMap.set(champ.origin_text, 0);
      }
      if (!classSelectedMap.get(champ.class_text)) {
        classSelectedMap.set(champ.class_text, 0);
      }
      return champ;
    });
    champsToDisplay = champsToDisplay.sort(function(a,b) {
      return a.cost_number - b.cost_number;
    });
    this.setState({
      champsToDisplay: champsToDisplay,
      originSelectedMap: originSelectedMap,
      classSelectedMap: classSelectedMap
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
      <div style={{maxWidth:'800px'}}>
        <Table bordered size='sm' variant='dark' block>
          <thead>
            <tr>
              <th><Button variant='secondary' onClick={this.sortByName} style={{width:'100%'}}>
                Name <MdSwapVert/> 
              </Button></th>
              <th><Button variant='secondary' onClick={this.sortByCost} style={{width:'100%'}}>
                Cost <MdSwapVert/> </Button>
              </th>
              <th><Button variant='secondary' onClick={this.sortByOrigin} style={{width:'100%'}}>
                Origin <MdSwapVert/>
              </Button></th>
              <th><Button variant='secondary' onClick={this.sortByClass} style={{width:'100%'}}>
                Class <MdSwapVert/>
              </Button></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.champsToDisplay.map((champ, i) => {
                var spacer = false;
                if (i !== 0 
                  && this.state.sortedBy !== 'name_text' 
                  && this.state.champsToDisplay[i-1][this.state.sortedBy] !== champ[this.state.sortedBy]) 
                {
                  spacer = true;
                }

                if (i !== 0 && this.state.champsToDisplay[i-1].selected !== champ.selected) {
                  spacer = true;
                }

                return (
                  <>
                    <SpacerRow spacer={spacer} key={'spacer' + i}/>
                    <ChampRow 
                      champ={champ} 
                      key={champ.slug_text + i} 
                      originSelected={this.state.originSelectedMap.get(champ.origin_text) !== 0}
                      classSelected={this.state.classSelectedMap.get(champ.class_text) !== 0}
                      onClick={() => this.toggleChampSelected(i)}/>
                  </>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }

  sortByName() {
    this.sortBy('name_text', true);
  }

  sortByCost() {
    this.sortBy('cost_number', true);
  }

  sortByOrigin() {
    this.sortBy('origin_text', true);
  }

  sortByClass() {
    this.sortBy('class_text', true);
  }

  sortBy(field_to_sort_by, reverse_if_same_field) 
  {
    var champsToDisplay;
    var sortedBy = this.state.sortedBy;
    var reversed = false;

    switch(field_to_sort_by)
    {
      case 'name_text':
        if (this.state.sortedBy !== 'name_text' || this.state.reversed === true || !reverse_if_same_field) {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.name_text.localeCompare(b.name_text);
          });
          sortedBy = 'name_text';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(b,a) {
            return a.name_text.localeCompare(b.name_text);
          });
          reversed = true;
        }
        break;

      case 'cost_number':
        if (this.state.sortedBy !== 'cost_number' || this.state.reversed === true || !reverse_if_same_field) {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.cost_number - b.cost_number;
          });
          sortedBy = 'cost_number';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(b,a) {
            return a.cost_number - b.cost_number;
          });
          reversed = true;
        }
        break;

      case 'origin_text':
        if (this.state.sortedBy !== 'origin_text' || this.state.reversed === true || !reverse_if_same_field) {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.origin_text.localeCompare(b.origin_text);
          });
          sortedBy = 'origin_text';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(b,a) {
            return a.origin_text.localeCompare(b.origin_text);
          });
          reversed = true;
        }
        break;

      case 'class_text':
        if (this.state.sortedBy !== 'class_text' || this.state.reversed === true || !reverse_if_same_field) {
          champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
            return a.class_text.localeCompare(b.class_text);
          });
          sortedBy = 'class_text';
        }
        else {
          champsToDisplay = this.state.champsToDisplay.sort(function(b,a) {
            return a.class_text.localeCompare(b.class_text);
          });
          reversed = true;
        }
        break;

      default:
        break;
    }
    
    champsToDisplay = this.state.champsToDisplay.sort(function(a,b) {
      if (a.selected === true && b.selected === false) return -1;
      else if (a.selected === false && b.selected === true) return 1;
      else return 0;
    });

    this.setState({
      champsToDisplay: champsToDisplay,
      sortedBy: sortedBy,
      reversed: reversed
    });
  }

  toggleChampSelected(i) {
    var champsToDisplay = this.state.champsToDisplay;
    var originSelectedMap = this.state.originSelectedMap;
    var classSelectedMap = this.state.classSelectedMap;
    var champOrigin = champsToDisplay[i].origin_text;
    var champClass = champsToDisplay[i].class_text;

    champsToDisplay[i].selected = !champsToDisplay[i].selected;
    if (champsToDisplay[i].selected === true) {
      originSelectedMap.set(champOrigin, originSelectedMap.get(champOrigin)+1);
      classSelectedMap.set(champClass, classSelectedMap.get(champClass)+1);
    }
    else {
      originSelectedMap.set(champOrigin, originSelectedMap.get(champOrigin)-1);
      classSelectedMap.set(champClass, classSelectedMap.get(champClass)-1);
    }
    this.setState({
      originSelectedMap: originSelectedMap,
      classSelectedMap: classSelectedMap
    })
    console.log(this.state);
    this.sortBy(this.state.sortedBy, false);
  }
}

export default ChampRanker;
