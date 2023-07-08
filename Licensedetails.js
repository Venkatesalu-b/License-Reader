import React, { useState, useEffect, createRef, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView, Button, Alert, Dimensions
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import Images from './Images/Images';
import { Dropdown } from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import auth from '@react-native-firebase/auth';

import { faCircleCheck, faAngleLeft, faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import Images from './Images/Images';





function Form({ navigation, route }) {
  const { name, license, Address, frontimage, backimage, image } = route.params;
  // console.log(name,license,Address,'params')
  const [userName, setUserName] = useState(name || '')
  const [addressForm, setAddressForm] = useState(Address || '');
  const [phonenumber, setPhoneNumber] = useState();
  const [showOtp, setShowotp] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [userVechicle, setUserVechicle] = useState('');
  const [licensenum, setLicenseNum] = useState(license || '')

  const [imglic, setImglic] = useState(image);
  const [seconds, setSeconds] = useState(30);
  const [userlic, setUserlic] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [errortext1, setErrortext1] = useState("");
  const [errortext2, setErrortext2] = useState("");
  const [errortext3, setErrortext3] = useState("");
  const [errortext4, setErrortext4] = useState("");
  const [errortext5, setErrortext5] = useState("");
  const [errortext6, setErrortext6] = useState("");
  const [errorotptext,setErrorotptext] = useState("");
  const [verifyotp,setVerifyotp] = useState(true);
  
  const [verificationCode, setVerficationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  var deviceWidth = Dimensions.get('window').width
  var deviceHeight = Dimensions.get('window').height


  // verification code (OTP - One-Time-Passcode)





  const NameInputRef = createRef();
  const AddressInputRef = createRef();
  const Phoneinputref = createRef();
  const Emailref = createRef();
  const validateName = (namelic) => {
    var regname = /^[A-Z\s]+[a-zA-z\s]{2,30}$/;
    return regname.test(namelic)
  }


  const validatePhoneNumber = () => {
    var regexp = /^\d{10}$/;
    return regexp.test(phonenumber)
  }
  const validateEmail = (email) => {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };
  const validateDriving = (lice) => {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var li = /^(TN)(\d{2}|\d{2}\s)(\d{4}|\d{4}\s)(\d{3})(\d{4})$/gm


    return li.test(lice);
  };

  function onAuthStateChanged(user) {
    // console.log(user.uid,'user')
    if (user) {
      //       // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      //       // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      //       // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      //       // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);






  const data = [

    { label: 'Royal Enfield Hunter 350', value: 'Royal Enfield Hunter 350' },
    { label: 'Royal Enfield Classic 350', value: 'Royal Enfield Classic 350' },
    { label: 'Royal Enfield Himalayan', value: 'Royal Enfield Himalayan' },
    { label: 'Royal Enfield Scram 411', value: 'Royal Enfield Scram 411' },
    { label: 'Royal Enfield Bullet 350', value: 'Royal Enfield Bullet 350' },
    { label: 'Royal Enfield Contiental GT350', value: 'Royal Enfield Contiental GT350' },


  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(5);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = async () => {
    console.log('end',phonenumber)
  
  
   await auth().signInWithPhoneNumber(`+91${phonenumber}`)
        .then(confirmResult => {
          console.log('enter')
          setConfirmResult(confirmResult)

        }) .catch(error => {
          Alert.alert(error.message)

          console.log(error)
        })
        setVerficationCode(['', '', '', '', '', ''])
    setMinutes(0);
    setSeconds(30);


  };


  const getOtp = async () => {
    console.log('hello')

    if (validatePhoneNumber()) {

      setShowotp(true)
      // auth().getInstance().getFirebaseAuthSettings().setAppVerificationDisabledForTesting(true);

      // auth().setAppVerificationDisabledForTesting(true)
      auth().signInWithPhoneNumber(`+91${phonenumber}`)
        .then(confirmResult => {
          setConfirmResult(confirmResult)

        })

        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
  }

  const handleChange = (index, value) => {
    console.log(index, value);
    setVerficationCode((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move focus to the next input box
    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to the previous input box on backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };



  const back = () => {
    setAddressForm('');
    setLicenseNum('');
    setUserName('');
    navigation.navigate("Image Scanner",);


  }

  const handleVerifyCode = async () => {
    setVerifyotp(false)
    console.log(verificationCode, 'codeveify', verificationCode.length)
    const Otp = verificationCode.join("")
    console.log(Otp, 'otp')
    try {
      if (Otp.length === 6) {

        console.log('hi')
        const user = await confirmResult.confirm(Otp);
        console.log('Verification successful. User ID:', user.uid);
        // Further actions after successful verification
        Alert.alert(
          'OTP',
          `OTP is verified`,
          [
            {
              text: 'OK',
              onPress: () => {
                setShowotp(false);

                setVerficationCode(['', '', '', '', '', '']);
              }

            },
          ],
        );

      } else {
        Alert.alert('Please enter a 6 digit code.');
      }
    } catch (error) {
      Alert.alert('Please enter a valid verification code.');
      console.log('Verification error:', error);
    }
  };

  const addInput = async () => {
    
    setErrortext1("")
    setErrortext2("")
    setErrortext3("")
    setErrortext4("")
    setErrortext5("")
    setErrortext6("")
   setErrorotptext("")

    if (!licensenum) {
      setErrortext1("Please Enter License No");
      return false
    }

    else if (!validateDriving(licensenum)) {
      setErrortext1("Please Enter Valid License No")
      return false
    }
    else if (!userName) {
      setErrortext2("please Enter Name")
      console.log("inside if")
      return false
    }
    else if (!validateName(userName)) {
      setErrortext2("Enter  Alphbet only ")
      return false
    }
    else if (!addressForm) {
      setErrortext3("Please Enter Address")
      
      return false
    }
    else if (!phonenumber) {
      setErrortext4("Please  Enter Phonenumber")
      
      return false
    }
    else if (verifyotp==true) {
      setErrorotptext("Please verify the Phonenumber")
      
      return false
    }
    else if (!userEmail) {
      setErrortext5("Please Enter Email")
    
      return false
    } else if (!validateEmail(userEmail)) {
      setErrortext5("Enter Correct Format Email")
      return false
    } else if (!userVechicle) {
      setErrortext6("Please Select Vechicle")
    } else {
      console.log(userName, addressForm, licensenum, phonenumber, userEmail, userVechicle, 'inside else worked')

      try {
        await fetch("http://192.168.2.47:3000/users/license", {
          method: 'post',

          body: JSON.stringify({
            "licno": licensenum,
            "ridername": userName,
            "address": addressForm,
            "mobilenumber": phonenumber,
            "email": userEmail,
            "vehicle": userVechicle,
            // firstParam: tablecre,
          }),
          headers: {
            // 'Accept':'application/json',
            // 'content-Type':'application'
            'Content-type': 'application/json; charset=UTF-8',
          },

        })
          .then((response) => response.json())
          .then((data) => {
            console.log("resultsdata", data);

          })
      }
      catch (error) {

        console.log('error', error);
      }

    }


   
  };


  navigation.setOptions({
    headerLeft: () => (
      <Pressable
        onPress={back}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          size={25}
          style={{
            color: 'black',
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
        />
      </Pressable>
    ),
  });

  const userlicense = () => {
    setUserlic(true);
    navigation.navigate("image", { image1: frontimage, image2: backimage })
  }
 

  return (


    
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: deviceHeight*0.02 ,flexDirection:'row',justifyContent:'flex-start',marginLeft:deviceWidth*0.01}}>
        <Image style={[styles.image,{marginLeft:deviceWidth*0.1}]} source={Images.Biketracking_Emblemimage} /> 
          <Text style={{ color: '#383A3B', fontSize: 24, letterSpacing: .8, textAlign: 'center',marginTop:deviceHeight*0.02,marginLeft:deviceWidth*0.03 }}>License Information</Text>

        </View>
        <Text style={{ marginLeft: deviceWidth*0.07, fontSize: 18, marginTop:deviceHeight*0.03, color: 'black' }}>Licence No:
        </Text>
        <View style={[styles.sectionStyle1,{ marginTop: deviceHeight*0.01,
    marginLeft: deviceWidth*0.06,marginRight:deviceWidth*0.05}]}>

          <TextInput
            style={styles.inputStyle}
            value={licensenum}
            onChangeText={(value) =>
              setLicenseNum(value)
            }
            placeholder='Enter LicenseNumber'
            placeholderTextColor="#999999"

            returnKeyType="next"
            onSubmitEditing={() =>
              NameInputRef.current &&
              NameInputRef.current.focus()
            }
            blurOnSubmit={false}
          />


        </View>
        {errortext1 != "" ? (
            <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.09,
    
              marginTop:2}]}>
              {" "}
              {errortext1}{" "}
            </Text>
          ) : null}
        <Text style={{ marginLeft: deviceWidth*0.07, fontSize: 18, marginTop: deviceHeight*0.01, color: 'black' }}>Name
        </Text>
        <View style={[styles.sectionStyle1,{marginTop: deviceHeight*0.01,
    marginLeft: deviceWidth*0.06,marginRight:deviceWidth*0.05}]}>

          <TextInput
            style={styles.inputStyle}
            value={userName}
            onChangeText={(value) =>
              setUserName(value)
            }
            placeholder='Enter Name'
            placeholderTextColor="#999999"
            ref={NameInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              AddressInputRef.current &&
              AddressInputRef.current.focus()
            }
            // secureTextEntry={true}

            blurOnSubmit={false}
          />


        </View>
        {errortext2 != "" ? (
            <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.09,
    
              marginTop:2}]}>
              {" "}
              {errortext2}{" "}
            </Text>
          ) : null}
        <Text style={{  marginLeft: deviceWidth*0.07, fontSize: 18,marginTop: deviceHeight*0.01, color: 'black' }}>Address
        </Text>

        <View
          style={[styles.sectionStyle,{ 
            marginTop: deviceHeight*0.003,
            marginLeft: deviceWidth*0.06,marginRight:deviceWidth*0.05}]}>
          <TextInput
            // editable

            numberOfLines={10}
            maxLength={150}
            value={addressForm}
            onChangeText={(value) =>
              setAddressForm(value)
            }
            placeholder='Enter Address'
            style={{ padding: 5, color: 'black',marginLeft:9 }}
            textAlignVertical='center'
            placeholderTextColor="#999999"

            ref={AddressInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              Phoneinputref.current &&
              Phoneinputref.current.focus()
            }
            blurOnSubmit={false}

          />
        </View>
        {errortext3 != "" ? (
            <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.09,
    
              marginTop:2}]}>
              {" "}
              {errortext3}{" "}
            </Text>
          ) : null}
        <Text style={{ marginLeft: deviceWidth*0.07, fontSize: 16, marginTop: deviceHeight*0.01, color: 'black' }}>PhoneNumber
        </Text>
        <View style={[styles.sectionStyle2,{marginTop: deviceHeight*0.002,
            marginLeft: deviceWidth*0.06,marginRight:deviceWidth*0.05}]}>

          <TextInput
            style={styles.inputStyle1}
            onChangeText={(value) =>
              setPhoneNumber(value)
            }
            placeholder='Enter phonenumber'
            placeholderTextColor="#999999"
            maxLength={10}
            keyboardType="phone-pad"
            ref={Phoneinputref}
            returnKeyType="next"
            onSubmitEditing={() =>
              Emailref.current &&
              Emailref.current.focus()
            }
            blurOnSubmit={false} />
       
          <TouchableOpacity onPress={getOtp} style={[styles.phoneButton,{   marginLeft: deviceWidth*0.03
            ,marginTop:deviceHeight*0.01}]}>
            <Text style={{ marginTop: deviceHeight*0.01, fontSize: 15, color: 'white', textAlign: 'center', }}>Get OTP</Text>
          </TouchableOpacity>
        </View >
        {errortext4 != "" ? (
            <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.09,
    
              marginTop:2}]}>
              {" "}
              {errortext4}{" "}
            </Text>
          ) : null}
          {
            verifyotp?(
              <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.09,
      
                marginTop:2}]}>
                {" "}
                {errorotptext}{" "}
              </Text>
            ) : null
          }
    
        {showOtp ?
          <View>
            <Text style={{ marginTop: deviceHeight*0.02, fontSize: 18, color: 'black', marginLeft: deviceWidth*0.06 }}>Enter the otp:</Text>
            <View style={{ flexDirection: 'row', marginTop: deviceHeight*0.01, padding: 7,marginLeft:deviceWidth*0.02,marginRight:deviceWidth*0.03,justifyContent: 'space-evenly' }}>

              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleChange(index, value)}
                  onKeyPress={(e) => handleKeyDown(index, e)}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                />
              ))}
            </View>
             <TouchableOpacity style={[styles.themeButton, { marginTop: deviceHeight*0.02, marginLeft: deviceWidth*0.25 }]}
                onPress={handleVerifyCode}

              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Verify Code</Text>
              </TouchableOpacity> 
            
            <View style={{ flexDirection: 'row', padding: 10, top: deviceHeight*0.01, justifyContent: 'space-evenly' }}>


              {seconds > 0 || minutes > 0 ? (
                <Text style={{ color: 'black', marginRight:deviceWidth*0.27 }}>
                  Time Remaining: {minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              ) : (
                <Text style={{ color: 'black', marginTop: deviceHeight*0.003 }}>Didn't recieve code?</Text>
              )}


              {seconds > 0 || minutes > 0 ? (<></>) : (
                <TouchableOpacity disabled={seconds > 0 || minutes > 0}
                  onPress={resendOTP} style={{ borderWidth: 0.8, padding: 5, borderColor: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630", borderRadius: 5,marginTop:deviceHeight*-0.001 }}>
                  <View>
                    <Text style={{ color: seconds > 0 || minutes > 0 ? "grey" : "#FF5630" }}>Resend Otp</Text>
                  </View>

                </TouchableOpacity>
              )}

            </View>

          </View> : <></>
        }
        <Text style={{ marginLeft: deviceWidth*0.07, fontSize: 18, marginTop: deviceHeight*0.01, color: 'black' }}>Email
        </Text>
        <View style={[styles.sectionStyle1,{marginTop: deviceHeight*0.01,
            marginLeft: deviceWidth*0.06,marginRight:deviceWidth*0.05}]}>

          <TextInput
            style={styles.inputStyle}
            onChangeText={(value) =>
              setUserEmail(value)
            } placeholder='Enter Email'
            placeholderTextColor="#999999"
            keyboardType="email-address"
            ref={Emailref}
            returnKeyType="next"


            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}



          />

        </View>

        {errortext5 != "" ? (
            <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.09,
    
              marginTop:2}]}>
              {" "}
              {errortext5}{" "}
            </Text>
          ) : null}
        {imglic ? <>
          <Text style={{ marginLeft: 26, fontSize: 18, marginTop: 10, color: 'black' }}>License Image
          </Text>
          <View style={styles.licenseimage}>
            <Text style={{ color: 'grey', marginRight: 140 }}>View the image</Text>
            <View>
              <TouchableOpacity onPress={userlicense} style={{ marginRight: 10 }} >
                <FontAwesomeIcon icon={faImage} color='#5E6162' size={30} /></TouchableOpacity></View>
          </View></> : <></>
        }

        <View style={[styles.container,{marginLeft: deviceWidth*0.02,
    marginTop: deviceHeight*-0.001}]}>
          <Text style={{ fontSize: 18, color: 'black', marginBottom: deviceHeight*0.001 }}>Select Vechicle</Text>
          <Dropdown
            // itemContainerStyle={{backgroundColor:'red'}}
            itemTextStyle={{ color: '#000000' }}
            dropdownPosition='top'
            containerStyle={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#e5e5e5',

              paddingHorizontal: 10,
              paddingVertical: 8,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
            style={[styles.dropdown, isFocus && { borderColor: '#56ccf2' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={170}



            labelField="label"
            valueField="value"
            placeholder="Select Vechicle"
            searchPlaceholder="Search..."
            value={userVechicle}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setUserVechicle(item.label);
              setIsFocus(false);
            }}

          />
          {errortext6 != "" ? (
            <Text style={[styles.errorTextStyle,{ marginLeft:deviceWidth*0.02,
    
              marginTop:2}]}>
              {" "}
              {errortext6}{" "}
            </Text>
          ) : null}
        </View>
        
      </ScrollView>

      <View style={{ marginTop:deviceHeight*0.09 }}>
        <TouchableOpacity style={[styles.button,{ bottom: deviceHeight*0.01,
    left: deviceWidth*0.31,
    
  }]}
          onPress={addInput}
        // onPress={() => navigation.navigate("PhoneSignIn")}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>




    </View>

  )
}

const styles = StyleSheet.create({
  sectionStyle1: {
    flexDirection: "row",
    height: hp('7%'),
    // marginTop: 4,
    // marginLeft: 25,
    // marginRight: 25,
    // margin: 10,
    borderWidth: 1,

    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#dadae8",


  }, sectionStyle2: {
    // flex:1,
    width: wp('66%'),
    flexDirection: "row",
    height: hp('7%'),
    // marginTop: 4,
    // marginLeft: 25,
    // marginRight: 25,
    // margin: 10,
    borderWidth: 1,

    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#dadae8",


  }, errorTextStyle: {
    color: "red",
    fontSize: 13,
    // marginLeft:26,
    
    // marginTop:-10
  },

  licenseimage: {
    flexDirection: 'row',
    height: 50,
    width: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#dadae8",
    borderWidth: 1,


  },
  sectionStyle: {
    flexDirection: "row",
    height: hp('8%'),
    // marginTop: 4,
    // marginLeft: 25,
    // marginRight: 25,
    // margin: 10,
    borderWidth: 1,

    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#dadae8",


  },image: {
    // marginBottom: 40,
    width:wp('11%'),
    height:hp('10%'),
    borderRadius:50,
    // resizeMode: 'cover',
    // tintColor: 'blue',
    // borderWidth:0.2,
    // borderColor:'grey'
        
    
  },
  input: {
    width: wp('9.5%'),
    // marginRight: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'black',
    padding: 5,
    textAlign: 'center',
    color: 'black',
    fontSize: 20
  },
  
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    // borderWidth: 1,
    // borderRadius: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",

    borderColor: "#dadae8",
  },
  inputStyle1: {
    width: wp('65%'),
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    // borderWidth: 1,
    // borderRadius: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 1,
    // backgroundColor: "grey",

    borderColor: "#dadae8",
  },
  phoneButton: {
    backgroundColor: '#56ccf6',
  
    width: wp('20%'),
    height: hp('5%'),
  

    borderRadius: 5

    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,


  },
  buttonStyle: {
    // backgroundColor: "#56ccf2",
    // borderWidth: 0,
    // color: "#FFFFFF",
    // borderColor: "#7DE24E",
    // height:hp('6%'),
    // alignItems: "center",
    // // borderRadius: 30,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // marginLeft: 65,
    // marginRight: 65,
    // marginTop: 20,
    // marginBottom: 2,

    alignSelf: 'center',
    width: wp('30%'),
    height: hp('6%'),
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#56ccf2',
    bottom: 40,

    // marginLeft: 5,
  },
  buttonTextStyle: {
    // color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 23,
    textAlign: 'center',
    color: '#ffffff',
    // fontSize: 14,
    fontFamily: 'Lato-Bold',

    // fontFamily:'Roboto-Thinltalic'
  },
  container: {
    // backgroundColor: 'grey',
    padding: 16,
    width: wp('95%'),
   


  }, themeButton: {
    width: wp('50%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5
  },
  dropdown: {
    height: hp('7%'),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

 
  placeholderStyle: {
    fontSize: 16,
    color: '#999999'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    borderRadius: 5

  },
  iconStyle: {
    width: wp('7%'),
    height: hp('1%'),
  },
  button: {
    position: 'absolute',

    // bottom: 10,
    // left: 120,
    // right: 0,
    height: hp('7%'), // Adjust this value according to your button's height
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',


    width: wp('39%'),
    // height: hp('6%'),

    borderRadius: 10,
    backgroundColor: '#56ccf2',

  },
  buttonText: {

    fontSize: 16,

    paddingVertical: 10,
    fontSize: 23,
    textAlign: 'center',
    color: '#ffffff',
    // fontSize: 14,
    fontFamily: 'Lato-Bold',
  },
})


export default Form
