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

    var originText = champ.origin1_text;
    if (champ.origin2_text !== "") {
      originText += ", " + champ.origin2_text;
    }
    var classText = champ.class1_text;
    if (champ.class2_text !== "") {
      classText += ", " + champ.class2_text;
    }

    return (
      <tr style={{color:color, height:'5px'}}>
        <td>{champ.name_text}</td>
        <td>{champ.cost_number}</td>
        <td>{originText}</td>
        <td>{classText}</td>
      </tr>
    );
  }
}

export default ChampRow;
