import React , {Component} from 'react';
import { Text } from 'react-vr';

export default class Score extends Component {
  constructor(props){
    super(props);

    this.state ={
      score: 0
    }
  }
  render(){
    return(
        <Text>
          {this.state.score}
        </Text>
    )
  }
}
