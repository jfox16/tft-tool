import React, { Component } from 'react';



class SpacerRow extends Component 
{
  render() 
  {
    if (this.props.spacer === true) {
      return <tr style={{height:'12px', backgroundColor:'#212121'}}>
      </tr>
    }
    else {
      return null;
    }
  }
}

export default SpacerRow;
