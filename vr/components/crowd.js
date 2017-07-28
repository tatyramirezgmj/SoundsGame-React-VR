import React from 'react';
import {asset, Model, View} from 'react-vr';

export default {{style}} => (
  <View style={style}>
    <Model
      source={{obj: asset('William_ODonnell_Family.obj'), mtl: asset('William_ODonnell_Family.mtl')}}
      lit={true}
      style={{
        transform: [{scale: [0.6, 1, 0.6]}],
      }}
    />
    <
  </View>
);
