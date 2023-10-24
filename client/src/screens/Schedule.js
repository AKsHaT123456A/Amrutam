import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import CommonBtn from '../components/CommonBtn';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Schedule = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [medicine, setMedicine] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState('');
  const [open, setOpen] = useState(false);
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Email', value: 'email' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'SMS', value: 'sms' },
    { label: 'Phone Call', value: 'phone' }
  ]);
  const handleDateSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date.dateString);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(date.dateString);
    }
  };

  const handleTimeSelect = (time) => {
    const selectedTime = new Date(time);

    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');

    const time24Hours = `${hours}:${minutes}`;

    setSelectedTimes(time24Hours);
    setTimePickerVisible(false);
  };


  const resetState = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      console.log(id);
      await axios.get(`http://localhost:3000/api/v1/auth/patient/details/${id}`).then((response) => {
        console.log(response.data.message.phones);
        const fetchedEmails = response.data.message.emails || [];
        const fetchedPhones = response.data.message.phones;
        setEmails(fetchedEmails);
        setPhones(fetchedPhones);
      });
      console.log(phones);
      const data = {
        medicineName: name,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        time: selectedTimes,
        method: value,
        description: medicine,
        phone: phones,
        emails
      };
      console.log(data);
      await axios.post(`http://localhost:3000/api/v1/schedule/addSchedule/${id}`, data);
      setName('');
      setMedicine('');
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setSelectedTimes('');
      navigation.navigate('Success');

    } catch (error) {
      console.error('Error:', error);
    }
  };


  const renderDateRangeText = () => {
    if (selectedStartDate && selectedEndDate) {
      return `Start: ${selectedStartDate}\nEnd: ${selectedEndDate}`;
    } else if (selectedStartDate) {
      return `Start: ${selectedStartDate}\nSelect End Date`;
    } else {
      return 'Select Start Date';
    }
  };

  return (
    <View style={styles.container}>
      <Header
        icon={require('../images/back.png')}
        title={'Call Ambulance'}
        onIconPress={() => navigation.navigate('Home')}
      />
      <TextInput
        placeholder="Medicine Name"
        placeholderTextColor="black"
        style={styles.name}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Medicine Details"
        placeholderTextColor="black"
        style={styles.name}
        value={medicine}
        onChangeText={(text) => setMedicine(text)}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder='Select Contact Method'
        dropDownContainerStyle={styles.dropdown}
        setItems={setItems}
        style={styles.name}
      />
      <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
        <View style={styles.scheduleInput}>
          <Text style={styles.scheduleText}>{renderDateRangeText()}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
        <View style={styles.timePickerButton}>
          <Text style={styles.timePickerText}>
            {isTimePickerVisible ? 'Add Time' : selectedTimes === "" ? 'Add Time' : selectedTimes}
          </Text>
        </View>
      </TouchableOpacity>
      <CommonBtn w={200} h={50} txt={'Schedule'} status={true} onClick={resetState} />
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedStartDate]: { startingDay: true, color: 'green' },
          [selectedEndDate]: { endingDay: true, color: 'green' },
        }}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeSelect}
        onCancel={() => setTimePickerVisible(false)}
      />

    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  name: {
    height: 50,
    borderWidth: 0.5,
    color: 'black',
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 20,
  },
  scheduleInput: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scheduleText: {
    color: 'blue',

  },
  dropdown: {
    // height: 50,
    top: 70,
    color: "black",
    "borderColor": 'black',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    color: "black",
    fontSize: 16,
  },
  timePickerButton: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  timePickerText: {
    color: 'green',
  },
});
