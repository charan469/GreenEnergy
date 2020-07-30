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
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import { white } from 'material-ui/styles/colors';
import { black } from 'material-ui/styles/colors';

const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
   // var dataToSend = { user_email: userEmail, user_password: userPassword };

    // var apiBaseUrl = "http://localhost:8080/Person-0.0.1-SNAPSHOT/person/login";
    var apiBaseUrl = "http://192.168.0.200:9093/person/login";
    // var apiBaseUrl = "https://aboutreact.herokuapp.com/login.php";
   // var self = this;
    var payload =
    {

      "personId": userEmail,
      "personPassword": userPassword
    }
    axios.post(apiBaseUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
      console.log(JSON.stringify(response));
  
        setLoading(false);
        if (response.status == 200) {
         // alert(response.status);
         // alert(response.data.status);
          if (response.data.status == 'STS001') {
           // alert(response.data.status);
            console.log(response.data.message);
            alert(response.data.message);


          }
          else if (response.data.status == 'STS002') {
            console.log(response.data.message);
            alert(response.data.message);
          }
          else if (response.data.status == 'STS003') {

            console.log(response.data.message);

            AsyncStorage.setItem('person_id', response.data.personId);
            props.navigation.navigate('DrawerNavigationRoutes');

          }
          else{
            console.log(response.data.message);
            alert(response.data.message);
          }
        }
        else

          if (response.status == 500) {
            console.log("PersonId password do not match");

            alert("username password do not match")
          }
          else {
            console.log("Username does not exists");

            alert("Username does not exist");
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('https://aboutreact.herokuapp.com/login.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // }).then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
    //       console.log(responseJson.data[0].user_id);
    //       props.navigation.navigate('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext('Please check your email id or password');
    //       console.log('Please check your email id or password');
    //       props.navigation.navigate('DrawerNavigationRoutes');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>

            <View style={{ alignItems: 'center' }}>
              <Image

                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />

            </View>

             <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor= 'black'//"#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                ref={ref => {
                  this._emailinput = ref;
               }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />

            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor=  'black'//"#F6F6F7"
                keyboardType="default"
                ref={ref => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View> 

           

            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            {/* <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text> */}

            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('PersonRegister')}>
              New Here ? Register Person
            </Text>

          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#307ecc',
    backgroundColor: 'white',
  },
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
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
  },
  registerTextStyle: {
    color:  'black',// '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});