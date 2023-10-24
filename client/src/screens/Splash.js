import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (token) {
          navigation.navigate('Home');
        } else if (token === null) {
          navigation.navigate('Register');
        } else {
          console.error('authToken is undefined');
          navigation.navigate('Register');
        }
      })
      .catch((error) => {
        console.error('Error checking for token:', error);
        navigation.navigate('Register');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>DoctorApp</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#fff',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 20 },
});
