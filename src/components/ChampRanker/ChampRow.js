import React, { Component } from 'react';

class ChampRow extends Component 
{

  render() 
  {
    var originText = this.props.champ.origin1_text;
    if (this.props.champ.origin2_text !== "") {
      originText += ", " + this.props.champ.origin2_text;
    }
    var classText = this.props.champ.class1_text;
    if (this.props.champ.class2_text !== "") {
      classText += ", " + this.props.champ.class2_text;
    }
    return (
      <tr>
        <td>{this.props.champ.name_text}</td>
        <td>{this.props.champ.cost_number}</td>
        <td>{originText}</td>
        <td>{classText}</td>
      </tr>
    );
  }
}

export default ChampRow;
