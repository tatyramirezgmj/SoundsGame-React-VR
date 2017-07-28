import React from 'react';
import { AppRegistry,  asset, Pano, Text, View, StyleSheet, Model, AmbientLight, PointLight, SpotLight, MediaPlayerState, VrButton, Sound, Scene} from 'react-vr';
import SoundInstrument from './vr/components/SoundInstrument';
import Button from './vr/components/Button';

const cycle = 0 // random start
const randomNumber = () => {
  if (cycle == 5) {
    cycle = 0
  } else {
    cycle += 1
  }
  return cycle
}
const WIN_SOUNDS = [
  {id: 1, sound: asset('final_sample/piano_win.wav'), playerState: new MediaPlayerState({})},
  {id: 2, sound: asset('final_sample/acc_guitar_win.wav'), playerState: new MediaPlayerState({})},
  {id: 3, sound: asset('final_sample/drum_win.wav'), playerState: new MediaPlayerState({})},
  {id: 4, sound: asset('final_sample/conga_win.mp3'), playerState: new MediaPlayerState({})},
  {id: 5, sound: asset('final_sample/violin_win.wav'), playerState: new MediaPlayerState({})},
  {id: 6,sound: asset('final_sample/elec_guitar_win.wav'), playerState: new MediaPlayerState({})},
]
const START_SOUNDS = [
  {id: 1, sound: asset('start_sample/piano_samp.wav'), playerState: new MediaPlayerState({})},
  {id: 2, sound: asset('start_sample/acc_guitar_samp.wav'), playerState: new MediaPlayerState({})},
  {id: 3, sound: asset('start_sample/drums_samp.wav'), playerState: new MediaPlayerState({})},
  {id: 4, sound: asset('start_sample/conga_samp.mp3'), playerState: new MediaPlayerState({})},
  {id: 5, sound: asset('start_sample/violin_samp.wav'), playerState: new MediaPlayerState({})},
  {id: 6, sound: asset('start_sample/elec_guit_samp.wav'), playerState: new MediaPlayerState({})},
]

export default class SoundsGame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      winSounds: WIN_SOUNDS,
      startSounds: START_SOUNDS,
      startButtonSound: START_SOUNDS[randomNumber()],
      startButtonSoundPlay: false,
      score: 0,
      cheerPlayerState: new MediaPlayerState({})
    }
  }

  onInstrumentClicked(index){
    console.log('onInstrumentClicked')
    this.state.winSounds.forEach(function(e){e.playerState.pause()});
    this.state.winSounds[index].playerState.play();

    this.setState((prevState, props) => {
      console.log('selected sound', index)
      console.log('correct sound', this.state.correct_sound)
      console.log('score', prevState.score)
      console.log('Props', props);
      console.log("New score:",(index === this.state.correct_sound) ? (Number(prevState.score) + 1000) : (Number(prevState.score) - 1000));
      return {
        score: (index === this.state.correct_sound) ? (Number(prevState.score) + 1000) : (Number(prevState.score) - 1000)
      }
    }, () => {
      console.log('HELLOOOOO', this.state.score);
      if (index === this.state.correct_sound) {
        if (this.state.cheerTimeout) {
          clearInterval(this.state.cheerTimeout);
        }
        this.state.cheerTimeout = setTimeout(
          (playerState) => {
            playerState.play()
          },
          3000,
          this.state.cheerPlayerState
        )
      }
    })
  }

  componentDidUpdate(){
    this.state.score
  }

  newInstrumentClicked(index) {
    let startSound = this.state.startSounds[index]
    this.setState({
        startButtonSound: startSound,
        startButtonSoundPlay: true
    });
  }

  startGame() {
    this.state.correct_sound = randomNumber()
    this.newInstrumentClicked(this.state.correct_sound);
  }

  // componentDidMount(){
  //   fetch('/url', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       score: this.state.score
  //     })
  //   })
  //   .then((data)=> {
  //     console.log(data);
  //   })
  // }

  render() {
    const instruments=[
      <Model
        source={{
          obj: asset('Piano.obj'),
          mtl: asset('Piano.mtl'),
        }}
        style={{
          transform: [{translate: [-16.3, -6.1, -4.7]}, {scale : 0.3},
          {rotateX : 0}, {rotateY: 30}, {rotateZ:0}], layoutOrigin: [0.3, 0.3]
        }}
        lit={true}
        id={1}
      ></Model>,
      <Model
        source={{
          obj:asset('guitar.obj'),
          mtl:asset('guitar.mtl')
        }}
        style={{
          transform: [{translate: [-15.5 , -5.7 , -4.7 ]}, {scale : 0.0007 },
          {rotateX : 0}, {rotateY: -20 }, {rotateZ:0}]
        }}
        lit={true}
        id={2}
      ></Model>,
      <Model
        source={{
          obj: asset('drum1.obj'),
        }}
        style={{
          transform: [{translate: [-15 , -7 , -9  ]}, {scale : 0.0015 },
          {rotateX : 0}, {rotateY: 0}, {rotateZ:0}], layoutOrigin: [0.3, 0.3]
        }}
        texture={'/static_assets/drum_kit_diffuse.jpg'}
         
        id={3}
      ></Model>,
      <Model
        source={{
          obj: asset('conga-hand-drum.obj'),
          mtl: asset('conga-hand-drum.mtl')
        }}
        style={{
          transform: [{ translate: [ -15.5, -7, -10 ]}, {scale: 0.6},
          {rotateX : 0}, {rotateY: 5}, {rotateZ:0}], layoutOrigin: [0.5, 0.5]
        }}
        lit={true}
        id={4}
      ></Model>,
      <Model
        source={{
          obj: asset('violin.obj'),
        }}
        style={{
          transform: [{ translate: [ -17.4, -7, -9 ]}, {scale: 0.15},
          {rotateX : 0}, {rotateY: 40}, {rotateZ:0}]
        }}
        texture={'/static_assets/3.bmp'}
        lit={true}
        id={5}>
      </Model>,
      <Model
        source={{
          obj: asset('Electric-guitar.obj'),
          mtl: asset('Electric-guitar.mtl')
        }}
        style={{
          transform: [{ translate: [ -14, -7.5, -8 ]}, {scale: 0.13},
          {rotateX : 0}, {rotateY: -80}, {rotateZ:0}]
        }}
        texture={'/static_assets/3.bmp'}
        lit={true}
        id={6}>
      </Model>
  ];
  return (
    <View>
      <Scene style={{transform: [{translate: [-15, -7, -3]}, {rotateY: 0}]}} />

      <Text
        style={styles.score}>
        {this.state.score}</Text>

      <Pano source={asset('sky.jpg')}/>

      <AmbientLight color = "rgba(232, 227, 153, 0.8)" intensity={1.5} angle={90}/>

      <Sound source={{ mp3: asset('kids_cheering.mp3')}} playerState={this.state.cheerPlayerState} />

      <Model source={{
        obj: asset('assets.obj'),
        mtl: asset('assets.mtl')
      }}style={{transform: [{ translate: [ 0, -10, 0 ]},
      {rotateX : 0}, {rotateY: 5}, {rotateZ:0}], layoutOrigin: [0.5, 0.5]}} lit={true}/>

      <Model source={{
        obj: asset('tree.obj'),
        mtl: asset('tree.mtl')
      }}style={{transform: [{ translate: [ 2, 0, -1 ]},
      {rotateX : 0}, {rotateY: 5}, {rotateZ:0}], layoutOrigin: [0.5, 0.5]}} lit={true}/>


      <Model source={{
        obj: asset('stage.obj'),
        mtl: asset('stage.mtl')
      }} style={{transform: [{ translate: [ -14,-10, -14 ]}, {scale: 0.7  },
      {rotateX : 0}, {rotateY: 0}, {rotateZ:0}], layoutOrigin: [0.5, 0.5]}} />

      <Button
        text="Start Playing"
        onStart={ () => this.startGame() }
        playerState={this.state.startButtonSound.playerState}
        sound={this.state.startButtonSound.sound}
        play={this.state.startButtonSoundPlay }/>

      <SpotLight color = "rgba(232, 227, 153, 0.8)" intensity={0.7} angle={180} style={{transform: [{translate: [ -15, 0, -14]}]}} />

      {instruments.map((instrument, index) => {
        return (
          <SoundInstrument
            key={index + 1}
            onClick={ () => ( (index == this.state.correct_sound) ? this.onInstrumentClicked(index) : null)}
            sound={this.state.winSounds[index].sound}
            playerState={this.state.winSounds[index].playerState}>
            {instrument}
          </SoundInstrument>
        );
      })}
    </View>
  );
}
};

const styles = StyleSheet.create({
  score:{
    fontSize: 0.7,
    transform:[
      {translate: [-14, -6, -6]}
    ]
  },
});


AppRegistry.registerComponent('SoundsGame', () => SoundsGame);
