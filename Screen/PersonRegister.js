/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import axios from 'axios';
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {serverIP} from '../app.json';

const PersonRegister = props => {
  let [personId, setPersonId] = useState('');
  let [personName, setPersonName] = useState('');
  let [personEmail, setPersonEmail] = useState('');
  let [personPassword, setPersonPassword] = useState('');
  let [grade, setGrade] = useState('');
  let [personSection, setPersonSection] = useState('');
  let [gender, setGender] = useState('');
  let [personStatus, setPersonStatus] = useState('');
  let [jobType, setJobType] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);


  const handleSubmitButton = () => {
    setErrortext('');
    if (!personId) {
      alert('Please fill Id');
      return;
    }
    if (!personName) {
      alert('Please fill Name');
      return;
    }
    if (!personEmail) {
      alert('Please fill Email');
      return;
    }
    if (!personPassword) {
      alert('Please fill Password');
      return;
    }
    // if (!grade) {
    //   alert('Please fill Class');
    //   return;
    // }
    // if (!personSection) {
    //   alert('Please fill Section');
    //   return;
    // }
    if (!gender) {
      alert('Please fill Gender');
      return;
    }
    if (!jobType) {
      alert('Please fill JobType');
      return;
    }
    //Show Loader
    setLoading(true);
    //---------------------------------------------------------------------------------------------------------------------

    var apiBaseUrl = serverIP + ":9093/person/insert";
    //var apiBaseUrl = "http://192.168.43.235:9093/person/insert";
    // var apiBaseUrl = "http://localhost:9093/utilization/find";
    var self = this;
    var payload =
    {
      "personId": personId,
      "personName": personName,
      "personEmail": personEmail,
      "personPassword": personPassword,
      "grade": grade,
      "personSection": personSection,
      "gender": gender,
      "jobType": jobType

      // "email": this.state.username,
      // "password": this.state.password
    }
    axios.post(apiBaseUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
      //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response));
        if (response.status == 200) {
          if (response.data.status == 'STS008') {
            console.log(response.data.message);
            // self.setState(response.data);
            AsyncStorage.setItem('person_id', response.data.personId);
            props.navigation.navigate('DrawerNavigationRoutes');
            // var uploadScreen = [];
            // uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
            // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
          }
          else if (response.data.status == 'STS007') {

            console.log(response.data.message);
            alert(response.data.message);
          }
          else {
            console.log(response.data.message);
            alert(response.data.message);
          }
        }
        else {
          alert('Invalid HTTP Response');
        }
      }
      )      
      .catch(function (error) {
        setLoading(false);
        alert('Unable To Reach Server');
        console.log(error);
      });

    //-------------------------------------------------------------------------------------------------------------------------
  };
  
  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        {/* <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        /> */}
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={personId => setPersonId(personId)}
            //underlineColorAndroid="#F6F6F7"
            placeholder="Enter ID"
            placeholderTextColor="#F6F6F7"
            selectionColor='red'
            // keyboardType="email-address"
            // ref={ref => {
            //   this._emailinput = ref;
            // }}
            returnKeyType="next"
            //onSubmitEditing={() => this._personIdinput && this._personIdinput.focus()}
            blurOnSubmit={false}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={PersonName => setPersonName(PersonName)}
              //underlineColorAndroid="#FFFFFF"
              placeholder="Enter Name"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              autoCapitalize="sentences"
              returnKeyType="next"
              //onSubmitEditing={() => this._personNameinput && this._personNameinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personEmail => setPersonEmail(personEmail)}
              //underlineColorAndroid="#F6F6F7"
              placeholder="Enter Email"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              // keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              //onSubmitEditing={() => this._personEmailinput && this._personEmailinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personPassword => setPersonPassword(personPassword)}
              //underlineColorAndroid="#F6F6F7"
              placeholder="Enter Password"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              // keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              //onSubmitEditing={() => this._personPasswordinput && this._personPasswordinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={grade => setGrade(grade)}
              //underlineColorAndroid="#F6F6F7"
              placeholder="Enter Class (Optional)"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              // keyboardType="numerical"
              // ref={ref => {
              //   this._gradeinput = ref;
              // }}
              returnKeyType="next"
              //onSubmitEditing={() => this._gradeinput && this._gradeinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personSection => setPersonSection(personSection)}
              //underlineColorAndroid="#F6F6F7"
              placeholder="Enter Section (Optional)"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              //keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              //onSubmitEditing={() => this._personSectioninput && this._personSectioninput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={gender => setGender(gender)}
              //underlineColorAndroid="#F6F6F7"
              placeholder="Enter Gender"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              // keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              //onSubmitEditing={() => this._genderinput && this._genderinput.focus()}
              blurOnSubmit={false}
            />

          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={jobType => setJobType(jobType)}
              //underlineColorAndroid="#FFFFFF"
              placeholder="Enter JobType"
              placeholderTextColor="#F6F6F7"
              selectionColor='red'
              autoCapitalize="sentences"
              // ref={ref => {
              //   this._jobTypeinput = ref;
              // }}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default PersonRegister;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 59,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 28,
    marginRight: 24,
    marginTop: 25,
    marginBottom: 12
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 15,
    fontSize: 22,
    fontWeight: 'bold'
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 15,
    borderColor: 'blue',
    fontSize: 20
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  textInput: {
    flex: 1,
    margin: 23,
    paddingLeft: 6,
    color: 'white',
    fontSize: 20
  }
});