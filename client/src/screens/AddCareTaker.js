import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import CommonBtn from '../components/CommonBtn';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCareTaker = ({ navigation }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [apiError, setApiError] = useState('');

  const priorities = ['High', 'Medium', 'Low'];

  const handleAddCareTaker = async () => {
    let valid = true;

    if (!firstName) {
      setFirstNameError('First Name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last Name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

    if (!phone) {
      setPhoneNumberError('Phone Number is required');
      valid = false;
    } else {
      setPhoneNumberError('');
    }

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid Email Address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!role) {
      setRoleError('Role is required');
      valid = false;
    } else {
      setRoleError('');
    }

    if (!selectedPriority) {
      // Ensure a priority is selected
      valid = false;
    }

    if (valid) {
      // Prepare data for the API call
      const data = {
        firstName,
        lastName,
        phone,
        email,
        role,
        priority: selectedPriority,
        schedule:" "
      };
      console.log(data);
      try {
        const id = await AsyncStorage.getItem('id');
        console.log(id);
        const response = await axios.post(
          `https://amrutam.onrender.com/api/v1/auth/caretaker/addCareTaker/${id}`,
          data
        );
        console.log(response.data.message);
        if (response.status === 201) {
          // Successful API call
          console.log('CareTaker added successfully:', response.data);
          navigation.navigate('Success');
        }
      } catch (error) {
        console.log('Error adding caretaker:', error);
        // Handle API call error
        setApiError('Failed to add caretaker. Please try again.,error:', error.message);
      }
    }
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Function to handle the back button press
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Header
          icon={require('../images/back.png')}
          title={'Book Appointment'}
          onBackPress={handleGoBack}
        />
        <Image source={require('../images/doctor.png')} style={styles.docImg} />
        <Text style={styles.name}>Caretaker 1</Text>
        <Text style={styles.spcl}></Text>

        <Text style={styles.heading}>First Name</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Enter Your First Name'}
          placeholderTextColor={'black'}
          onChangeText={setFirstName}
        />
        <Text style={styles.errorText}>{firstNameError}</Text>

        <Text style={styles.heading}>Last Name</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Enter Your Last Name'}
          placeholderTextColor={'black'}
          onChangeText={setLastName}
        />
        <Text style={styles.errorText}>{lastNameError}</Text>

        <Text style={styles.heading}>Phone Number</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Enter Your Phone Number'}
          placeholderTextColor={'black'}
          onChangeText={setPhone}
        />
        <Text style={styles.errorText}>{phoneNumberError}</Text>

        <Text style={styles.heading}>Enter Email</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Enter Your Email'}
          placeholderTextColor={'black'}
          onChangeText={setEmail}
        />
        <Text style={styles.errorText}>{emailError}</Text>

        <Text style={styles.heading}>Select Role</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Enter Role'}
          placeholderTextColor={'black'}
          onChangeText={setRole}
        />
        <Text style={styles.errorText}>{roleError}</Text>

        <Text style={styles.heading}>Select Priority</Text>
        <View style={styles.priorityButtons}>
          {priorities.map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                selectedPriority === priority && styles.selectedPriority,
              ]}
              onPress={() => setSelectedPriority(priority)}
            >
              <Text style={styles.priorityText}>{priority}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.errorText}>{apiError}</Text>

        <View style={styles.btnView}>
          <CommonBtn
            w={300}
            h={45}
            txt={'Add'}
            status={true}
            onClick={handleAddCareTaker}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddCareTaker;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  docImg: {
    width: 100,
    height: 100,
    marginTop: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#000',
    marginTop: 10,
  },
  spcl: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    color: 'green',
    padding: 5,
    borderRadius: 10,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  nameInput: {
    borderRadius: 10,
    marginTop: 10,
    color: 'black',
    width: '94%',
    height: 45,
    borderWidth: 0.5,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  priorityButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  selectedPriority: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  priorityText: {
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
  },
  btnView: { marginTop: 20, marginBottom: 20 },
});
