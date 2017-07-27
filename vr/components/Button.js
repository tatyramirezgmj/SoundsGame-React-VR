import React, { Component } from 'react';
import { Sound, asset, VrButton, Text, StyleSheet} from 'react-vr';


export default class Button extends Component {
 constructor(props){
   super(props);

   this.styles = StyleSheet.create({
     button :{
       height:0.4,
       margin:0.05,
       // textAlign: 'center',
       backgroundColor: 'rgba(242, 240, 244, 0.67)',
       transform: [{translate: [0, 0, -2]}]
     },
     text: {
       fontSize: 0.8,
       textAlign: 'center',
       paddingLeft: 1,
       margin: 0,
       color: 'black',
       transform: [{translate: [0, -0.03, -2]}]
     }
   })
 }

 playStatusChanged(event) {
   console.log('play status changed')
   console.log(event.nativeEvent.playStatus)
   if (event.nativeEvent.playStatus === 'ready') {
     console.log('ready!')
     console.log(this.props)
     if (this.props.play) {
       this.props.playerState.seekTo(0)
       this.props.playerState.play()
     }
   }
 }

 render(){
   // let { startGame } = this.props;
   console.log('button render props')
   console.log(this.props)
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
