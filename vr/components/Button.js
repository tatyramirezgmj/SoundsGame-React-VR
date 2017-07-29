import React, { Component } from 'react';
import { Sound, asset, VrButton, Text, StyleSheet} from 'react-vr';


export default class Button extends Component {
  constructor(props){
    super(props);

    this.styles = StyleSheet.create({
      button :{
        height:0.6,
        backgroundColor: 'rgba(242, 240, 244, 0.67)',
        borderRadius: 0.01,
        borderColor: 'rgb(63, 230, 220)',
        transform: [{translate: [-16, -5.2, -6]}]
      },
      text: {
        fontSize: 0.4,
        fontWeight: '400',
        textAlign: 'center',
        paddingLeft: 0.2,
        paddingRight:0.2,
        color: 'black',
        textAlignVertical: 'center',
      }
    })
  }


  playStatusChanged(event) {
    if (event.nativeEvent.playStatus === 'ready') {
      if (this.props.play) {
        this.props.playerState.seekTo(0)
        this.props.playerState.play()
      }
    }
  }

  render(){
    // let { startGame } = this.props;
    return(
      <VrButton style={this.styles.button}
        onClick={()=> this.props.onStart()}>
        <Sound playerState={this.props.playerState} source={this.props.sound} onPlayStatusChange={this.playStatusChanged.bind(this)}/>
        <Text style={this.styles.text}>
          {this.props.text}
        </Text>
      </VrButton>
    );
  }
}
