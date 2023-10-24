import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, Dimensions, RefreshControl } from 'react-native';
import Header from '../components/Header';
import CommonBtn from '../components/CommonBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavigationBar from '../components/BottomNavigation';

const Home = ({ navigation }) => {
  const [scrollY, setScrollY] = useState(0);
  const [data, setData] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    const id = await AsyncStorage.getItem('id');
    console.log('id', id);
    try {
      const response = await axios.post(`https://amrutam.onrender.com/api/v1/auth/caretaker/getCareTaker/${id}`);
      const schedule = await axios.post(`https://amrutam.onrender.com/api/v1/schedule/getSchedule/${id}`);
      if (response.data && response.data.message && schedule.data && schedule.data.message) {
        setData(response.data.message);
        setSchedule(schedule.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollY(offsetY);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} onScroll={handleScroll} scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }>
        <View>
          <View style={styles.headerContainer}>
            <View style={styles.leftContent}>
              <Header title={'DoctorApp'} icon={require('../images/logo.png')} />
            </View>
            <View style={styles.rightContent}>
              <CommonBtn
                w={150}
                h={40}
                txt={'Logout'}
                status={true}
                onClick={() => {
                  AsyncStorage.clear();
                  navigation.navigate('Register');
                }}
              />
            </View>
          </View>
          <Image source={require('../images/banner.jpg')} style={styles.banner} />
          <Text style={styles.heading}>Select Category</Text>
          <View style={{ marginTop: 20 }}>
            {schedule.length === 0 ? <Text style={styles.noCaretakerText}>No Schedule Available</Text> :
              <FlatList
                data={schedule}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity key={index}>
                    <LinearGradient colors={['#009FFD', '#2A2A72']} style={styles.linearGradient}>
                      <Text style={styles.catName}>{`Schedule ${index + 1}`}</Text>
                      <Text style={styles.scheduleDetails}>Medicine: {item.medicineName}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />}

          </View>
          <View style={styles.careTakerSection}>
            <Text style={styles.subHeading}>Care Takers</Text>
            <CommonBtn
              w={150}
              h={40}
              txt={'Add Care Taker'}
              status={true}
              onClick={() => {
                navigation.navigate('BookAppointment');
              }}
            />
          </View>
          <View style={styles.careTakersList}>
            {data.length === 0 ? (
              <Text style={styles.noCaretakerText}>No caretaker available</Text>
            ) : (
              <FlatList
                numColumns={2}
                data={data}
                renderItem={({ item, index }) => (
                  <View style={styles.careTakerItem} key={index}>
                    <Image source={require('../images/doctor.png')} style={styles.docImg} />
                    <Text style={styles.docName}>{`${item.firstName} ${item.lastName}`}</Text>
                    <Text
                      style={[
                        styles.status,
                        {
                          color: index % 2 === 0 ? 'green' : 'red',
                          opacity: 1 - scrollY / 200,
                        },
                      ]}>
                      {index % 2 === 0 ? 'Available' : 'Busy'}
                    </Text>
                    <CommonBtn
                      w={150}
                      h={40}
                      status={index % 2 === 0}
                      txt={'View'}
                      onClick={() => {
                        if (index % 2 === 0) {
                          navigation.navigate('BookAppointment');
                        }
                      }}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  linearGradient: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  catName: {
    color: 'white',
    fontSize: 16,
  },
  subHeading: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
  },
  careTakerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  careTakersList: {
    marginTop: 20,
  },
  noCaretakerText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  careTakerItem: {
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.2,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
  },
  docImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 20,
  },
  docName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginTop: 10,
  },
  status: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
  },
});

export default Home;
