import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomNavigationBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          navigation.navigate('Completed');
        }}>
        <Image source={require('../images/completed.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          navigation.navigate('Pending');
        }}>
        <Image source={require('../images/pending.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          navigation.navigate('CallAmb');
        }}>
        <Image source={require('../images/ambulance.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default BottomNavigationBar;
