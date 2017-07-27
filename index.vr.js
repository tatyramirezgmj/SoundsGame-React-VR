import React from 'react';
import { AppRegistry,  asset, Pano, Text, View, StyleSheet, Model, AmbientLight, SpotLight, MediaPlayerState, VrButton, Mesh, Sound} from 'react-vr';
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
const win_sounds = [
  {id: 1, sound: asset('final_sample/piano_win.wav'), playerState: new MediaPlayerState({})},
  {id: 2, sound: asset('final_sample/acc_guitar_win.wav'), playerState: new MediaPlayerState({})},
  {id: 3, sound: asset('final_sample/drum_win.wav'), playerState: new MediaPlayerState({})},
  {id: 4, sound: asset('final_sample/conga_win.mp3'), playerState: new MediaPlayerState({})},
  {id: 5, sound: asset('final_sample/violin_win.wav'), playerState: new MediaPlayerState({})},
  {id: 6,sound: asset('final_sample/elec_guitar_win.wav'), playerState: new MediaPlayerState({})},
]
const start_sounds = [
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
      rando: 1,
      win_sound: win_sounds,
      start_sound: start_sounds,
      buttonSound: start_sounds[randomNumber()],
      buttonSoundPlay: false,
      score: 0,
      cheerPlayerState: new MediaPlayerState({})
    }
  }

  onInstrumentClicked(index){
    this.state.win_sound.forEach(function(e){e.playerState.pause()});
    this.state.win_sound[index].playerState.play();
    this.setState((prevState, props) => {
      return {
        score: (this.state.start_sound.id === this.state.win_sound.id) ? (Number(prevState.score) + 1000) : (Number(prevState.score) - 1000)
      }
      alert(this.state.score);
    }, () => {
      if (this.state.start_sound.id === this.state.win_sound.id) {
        setTimeout(
          (playerState) => {
            playerState.play()
          },
          3000,
          this.state.cheerPlayerState
        )
      }
    })
  }

  newInstrumentClicked(index) {
    console.log('new index ' + index);
    let buttonSound = this.state.start_sound[index]
    console.log('setting state')
    // this.setState({buttonSound: buttonSound, buttonSoundPlay: true})
    console.log('set state')
    this.setState((prevState, props) => {
      return {
        buttonSound: buttonSound,
        buttonSoundPlay: true
      }
    });
  }

  startGame() {
    globalVariable = randomNumber()
    this.newInstrumentClicked(globalVariable);
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
        obj: asset('BabyGrandPiano1.obj'),
        mtl: asset('BabyGrandPiano1.mtl'),
      }}
      style={{
        transform: [{translate: [-3, -2, -7]}, {scale : 0.08},
        {rotateX : 0}, {rotateY: 80}, {rotateZ:0}]
      }}
      lit={true}
      id={1}
      ><Text>Piano</Text></Model>,
      <Model
      source={{
        obj:asset('guitar.obj'),
        mtl:asset('guitar.mtl')
      }}
      style={{
        transform: [{translate: [-15 , 0 , -3 ]}, {scale : 0.009 },
        {rotateX : 0}, {rotateY: 60}, {rotateZ:0}]
      }}
      // lit={true}
      id={2}
      ><Text>Accoustic Guitar</Text></Model>,
      <Model
      source={{
        obj: asset('drum1.obj'),
        mtl: asset('drum1.mtl'),
      }}
      style={{
        transform: [{translate: [8 , -2 , -5 ]}, {scale : 0.006 },
        {rotateX : 0}, {rotateY: 20}, {rotateZ:0}]
      }}
      lit={true}
      id={3}
      ><Text>Drums</Text></Model>,
      <Model
      source={{
        obj: asset('conga-hand-drum.obj'),
        mtl: asset('conga-hand-drum.mtl')
      }}
      style={{
        transform: [{ translate: [ 20, -5, 4 ]}, {scale: 5},
        {rotateX : 0}, {rotateY: 5}, {rotateZ:0}]
      }}
      lit={true}
      id={4}
      ><Text>Congas</Text></Model>,
      <Model
      source={{
        obj: asset('violin.obj'),
      }}
      style={{
        transform: [{ translate: [ 3, -5, 15 ]}, {scale: 1},
        {rotateX : 0}, {rotateY: 180}, {rotateZ:0}]
      }}
      texture={'/static_assets/3.bmp'}
      // lit={true}
      id={5}
      ><Text>Violin</Text></Model>,
      <Model
      source={{
        obj: asset('Electric-guitar.obj'),
        mtl: asset('Electric-guitar.mtl')
      }}
      style={{
        transform: [{ translate: [ -10, -8, 20 ]}, {scale: 1},
        {rotateX : 0}, {rotateY: 820}, {rotateZ:0}]
      }}
      texture={'/static_assets/3.bmp'}
      // lit={true}
      id={6}>
      <Text>Electric Guitar</Text></Model>,
    ];
    return (
      <View>
        <Text fontSize="4">{this.state.score}</Text>

        <Pano source={asset('concert1.jpg')}/>

        {/* <AmbientLight color = "rgba(232, 227, 153, 0.8)" intensity={2} angle={90}/> */}

        <Sound
        source={{
          mp3: asset('kids_cheering.mp3'),
        }}
        playerState={this.state.cheerPlayerState}
      />

      <Button
        text="Start Playing"
        onStart={ () => {
          return this.startGame()
        }}
        playerState={this.state.buttonSound.playerState}
        sound={this.state.buttonSound.sound}
        play={this.state.buttonSoundPlay }/>

        <SpotLight color = "rgba(232, 227, 153, 0.8)" intensity={2} angle={90} style={{transform: [{translate: [ 0, 0, -15]}]}} />

        {instruments.map((instrument, index) => {
          return (
            <SoundInstrument
              key={index + 1}
              onClick={ () => ( (index == globalVariable) ? this.onInstrumentClicked(index) : null)}
              sound={this.state.win_sound[index].sound}
              playerState={this.state.win_sound[index].playerState}>
              {instrument}
            </SoundInstrument>
          );
        })}
      </View>
    );
  }
};

AppRegistry.registerComponent('SoundsGame', () => SoundsGame);

const styles = StyleSheet.create({
  piano: {

  }
})
