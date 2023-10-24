import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonBtn from '../components/CommonBtn';
import { Icon } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging'; 

const Register = ({ navigation }) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'Patient',
    passwordVisible: false,
  });

  const togglePasswordVisibility = () => {
    setData({ ...data, passwordVisible: !data.passwordVisible });
  };


  const handleRegistration = async () => {
    try {
      console.log('Registering...',data);
        const response = await axios.post(
          'https://amrutam.onrender.com/api/v1/auth/patient/register',
          data
        );

        console.log('Registration success:', response.data);

        await AsyncStorage.setItem('authToken', response.data.token);
        await AsyncStorage.setItem('id', response.data.id);

        navigation.navigate('Home');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#777"
          style={styles.input}
          onChangeText={(text) => setData({ ...data, firstName: text })}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#777"
          style={styles.input}
          onChangeText={(text) => setData({ ...data, lastName: text })}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          onChangeText={(text) => setData({ ...data, email: text })}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#777"
          style={styles.input}
          onChangeText={(text) => setData({ ...data, phone: text })}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            style={styles.passwordInput}
            secureTextEntry={!data.passwordVisible}
            onChangeText={(text) => setData({ ...data, password: text })}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon
              name={data.passwordVisible ? 'eye' : 'eye-slash'}
              type="font-awesome"
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        <CommonBtn w={200} h={50} txt="Register" status={true} onClick={handleRegistration} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: 'black',
    paddingLeft: 20,
  },
  eyeIcon: {
    padding: 10,
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 20,
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#000',
    marginTop: 20,
  },
});

export default Register;
