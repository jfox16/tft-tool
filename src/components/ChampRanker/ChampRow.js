import React, { Component } from 'react';



class ChampRow extends Component 
{

  render() 
  {
    var champ = this.props.champ;

    var color;
    switch(champ.cost_number) {
      case '1':
        color = '#bdbdbd';
        break;
      case '2':
        color = '#a5d6a7';
        break;
      case '3':
        color = '#90caf9';
        break;
      case '4':
        color = '#f48fb1';
        break;
      case '5':
        color = '#ffe082';
        break;
      default:
        color = 'white';
        break;
    }

    return (
      <tr>
        <td style={{color:color}}>{champ.name_text}</td>
        <td style={{color:color}}>{champ.cost_number}</td>
        <td>{champ.origin_text}</td>
        <td>{champ.class_text}</td>
      </tr>
    );
  }
}

export default ChampRow;
