import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';

const PlayerControls = props => {
  const {onPlay, onPause, playing, skipBackwards, skipForwards} = props;

  const height = Dimensions.get('window').width;
  const width = Dimensions.get('window').height;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <Image
          source={require('../assets/icons/forwardBtn.png')}
          style={{
            width: (width * 4) / 100,
            height: (width * 4) / 100,
            transform: [{scaleX: -1}],
            tintColor : '#fff'
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
           <Image
           source={require('../assets/icons/pauseBtn.png')}
           style={{
             width: (width * 5) / 100,
             height: (width * 5) / 100,
             tintColor : '#fff'
           }}
         />
        ) : (
            <Image
            source={require('../assets/icons/playBtn.png')}
            style={{
              width: (width * 5) / 100,
              height: (width * 5) / 100,
              tintColor : '#fff'
            }}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <Image
          source={require('../assets/icons/forwardBtn.png')}
          style={{
            width: (width * 4) / 100,
            height: (width * 4) / 100,
            tintColor : '#fff'
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});
