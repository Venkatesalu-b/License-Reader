import React,{useState,createRef,useEffect} from 'react';
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
  KeyboardAvoidingView,BackHandler, Alert
} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });



const Signup = ({navigation})=>{

    const [branch,setBranch] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isFocus, setIsFocus] = useState(false);

    const passwordInputRef = createRef();


    const data = [
      
        { label: 'T.Nagar', value: 'T.Nagar' },
        { label: 'Ashok Nagar', value: 'Ashok Nagar' },
        { label: 'Thirumangalam', value: 'Thirumangalam' },
        { label: 'Valasaravakkam', value: 'Valasaravakkam' },
        { label: 'Tambaram', value: 'Tambaram' },
        { label: 'Ambattur', value: 'Ambattur' },
        { label: 'Avadi', value: 'Avadi' },
        { label: 'Koyambedu', value: 'Koyambedu' },
        
      ];
      const Signin =()=>{
          db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Users (username,password,userbranch) VALUES (?, ?,?)',
      [username,password,branch],
      (tx, result) => {
        console.log('Data inserted successfully.');
        navigation.navigate("LoginPage1")

        console.log('Inserted row ID: ', result.insertId);
      },
      error => {
        console.error('Error inserting data: ', error);
      }
    );
  });
      }
      

    return(

<SafeAreaView style={styles.mainBody}>
<ScrollView
      contentContainerStyle={{
          flex: 1,     
        justifyContent: "center",
        alignContent: "center",
        
        backgroundColor:'white',
        // backgroundColor:'lightgrey'
      }}>     
      <View style={{marginBottom:'40%'}}>   
         
        <View>
           <Text style={{marginLeft:26,fontSize:18,marginTop:10,color:'black'}}>Username
           </Text>
          <View style={styles.sectionStyle}>
          
            <TextInput
              style={styles.inputStyle}
              onChangeText={(username) =>
                setUsername(username)
              }
              autoComplete="off"
              
              placeholder="Enter Username"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              
            />
          </View></View>
          <Text style={{marginLeft:26,fontSize:18,color:'black'}}>Password
           </Text>
          <View style={styles.sectionStyle1}>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setPassword(UserPassword)
              }
              autoComplete="off"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={isPasswordSecure}
              underlineColorAndroid="#f000"
              returnKeyType="next"


            />
            <TouchableOpacity
              onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}>
              <FontAwesomeIcon icon={isPasswordSecure ? faEyeSlash : faEye} size={30} style={{
                color: 'black',
                marginTop: 12,
                marginRight: 7,
                fontWeight: 'bolder'
              }} />



            </TouchableOpacity>
          </View>
          <View style={styles.container}>
          <Dropdown
          // itemContainerStyle={{backgroundColor:'red',color:'blue'}}
          itemTextStyle={{color:'#000000',}}
          
          style={[styles.dropdown, isFocus && { borderColor: '#56ccf2' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={170}
          
          labelField="label"
          valueField="value"
          placeholder="Select branch"
          searchPlaceholder="Search..."
          value={branch}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setBranch(item.value);
            setIsFocus(false);
          }}
          
        />
</View>
<View>
    <TouchableOpacity onPress={()=>Signin()}>
<View style={{height:55,width:130,justifyContent:'center',backgroundColor:'lightgrey',marginTop:20,
marginLeft:'30%',borderRadius:10}}>
  <Text style={{textAlign:'center',fontSize:20}}>Submit</Text>
  </View></TouchableOpacity></View>

</View>
    </ScrollView>
</SafeAreaView>

    )

}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: "center",
        // backgroundColor: "white",
        // backgroundColor:'yellow',
        alignContent: "center",
        // marginBottom:100,
    
      },
      image: {
        // marginBottom: 40,
        width:wp('100%'),
        height:hp('32%')
        // resizeMode: 'cover',
        // tintColor: 'blue'
        
        
      },
      sectionStyle: {
        flexDirection: "row",
        height: hp('7%'),
        marginTop: 4,
        marginLeft: 25,
        marginRight: 25,
        margin: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#dadae8",
     
    
        // backgroundColor:'red'
    
      },
    
      // },frame_picker2: {
      //   width: '95%',
      //   marginVertical: 10,
      //   padding: 10,
      //   color: "black",
      //   fontSize: 30,
      //   marginLeft: 10,
      //   height: 50,
      //   backgroundColor: 'lightgrey',
      // },
      sectionStyle1: {
        flexDirection: "row",
        height: hp('7%'),
        marginTop: 1,
        marginLeft: 25,
        marginRight: 25,
        margin: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#dadae8",
    
        // backgroundColor:'red'
    
    
    
      },
      buttonStyle: {
        backgroundColor: "#56ccf2",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height:hp('7%'),
        alignItems: "center",
        // borderRadius: 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginLeft: 65,
        marginRight: 65,
        marginTop: 20,
        // marginBottom: 2,
      },
      buttonTextStyle: {
        color: "#FFFFFF",
        paddingVertical: 10,
        fontSize: 23,
        // fontFamily:'Roboto-Thinltalic'
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
      registerTextStyle: {
        color: "grey",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 17,
        alignSelf: "center",
        
        // padding: 10,
      },
      errorTextStyle: {
        color: "red",
        fontSize: 13,
        marginLeft:26,
        marginBottom:0,
        marginTop:-10
      },
      errorText: {
        color: "green",
        textAlign: "center",
        fontSize: 14,
      },
      Continue: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        marginTop: 30
      },
      // logo: {
      //   // flexDirection:"row",
      //   width: 400,
      //   height: 80,
      //   justifyContent:'center',
      //   alignItems:'center',
      //   alignContent:'center',
      //   justifyContent:'space-evenly'
      //   // backgroundColor:'green',
      //   // justifyContent:'space-around',
      //   // marginTop:40
    
    
    
    
      // },
      container: {
        // backgroundColor: 'grey',
        padding: 16,
        width:wp('95%'),
        marginLeft:10,
        marginTop:10
        
        
      },
      dropdown: {
        height: hp('7%'),
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,color:'black'
        
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'black'
        
      },
      iconStyle: {
        width: wp('7%'),
        height: hp('1%'),
      },
})
export default Signup;