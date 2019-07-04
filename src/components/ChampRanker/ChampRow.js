import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';



class ChampRow extends Component 
{
  constructor(props) {
    super(props);
    this.lookupCostColor = this.lookupCostColor.bind(this);
  }

  render() 
  {
    var champ = this.props.champ;
    var buttonSquare = (champ.selected === true) ? <FaMinusSquare/> : <FaPlusSquare/>;
    var costColor = this.lookupCostColor(champ.cost_number);
    var originColor = (this.props.originSelected) ? '#fff176' : 'white';
    var classColor = (this.props.classSelected) ? '#fff176' : 'white';
    var bgColor = (champ.selected === true) ? '#3e454d' : 'none';

    return (
      <>
        <tr style={{backgroundColor:bgColor}}>
          <td><Button 
            variant='outline-light'
            onClick={this.props.onClick}
            style={{padding:'0 4px 1px 4px', textAlign:'left', border:'none'}} block>
            {buttonSquare} {champ.name_text}
          </Button></td>
          <td>{champ.cost_number}</td>
          <td style={{color:originColor}}>{champ.origin_text}</td>
          <td style={{color:classColor}}>{champ.class_text}</td>
        </tr>
      </>
    );
  }

  lookupCostColor(cost_number) {
    switch(cost_number) {
      case '1':
        return '#bdbdbd';
      case '2':
        return '#a5d6a7';
      case '3':
        return '#90caf9';
      case '4':
        return '#f48fb1';
      case '5':
        return '#ffe082';
      default:
        return 'white';
    }
  }

  lookupOriginColor(cost_number) {
    switch(cost_number) {
      case 'Demon':
        return '#ff5f52';
      case 'Glacial':
        return '#5eb8ff';
      case 'Ninja':
        return '#ae52d4';
      case 'Noble':
        return '#ffd95a';
      case 'Phantom':
        return '#90dfb4';
      case 'Pirate':
        return '#be9c91';
      case 'Robot':
        return '#a49f9a'
      case 'Void':
        return '#e35183';
      case 'Wild':
        return '#aee571';
      case 'Yordle':
        return '#ffa270';
      default:
        return 'white';
    }
  }
}

export default ChampRow;
