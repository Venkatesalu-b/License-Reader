import React, { useState, createRef, useEffect } from "react";
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
  KeyboardAvoidingView,
} from "react-native";





import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

                                    

import {  faUserEdit} from '@fortawesome/free-solid-svg-icons';
// import MaterialCommunityIcons from 'react-native-vector-icons';



const VerifyMAIL = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [errorText,setErrortext]=useState("")
  const[success,setSuccess]=useState("")
  let [userData, setUserData] = useState({});

  

  const passwordInputRef = createRef();
  const isFocused = useIsFocused();

  
//   useEffect(() => {
    
//     // var a='a';
//     // var b=a.concat(route.params.Tabless)
   
   
//       console.log('worked')
    
//       db.transaction(txn => {
//           txn.executeSql(
//             `SELECT * FROM  loginuser`,
//             [],
//             (sqlTxn, res) => {
//               console.log("input  successfully");
//               let len = res.rows.length;
//               if (len >= 0) {
//                 let results = [];
//                 for (let i = 0; i < len; i++) {
//                   let item = res.rows.item(i);
//                   console.log(item);
//                   setUserData(results)
//                   // console.log(userData,'usedata....');
                  
//                   }
//                 }
                
                
//               })
//             },
//             error => {
//               console.log("error on gettin input" + error.message);
//             }
//           )
//         },[isFocused])
      
     
   
  
  

  const getInputs = () => {
    setErrortext('')
    
    setSuccess('')
    //   var a='a';
    //   var b=a.concat(tablename)
    if (!username) {
      setErrortext("**Please fill username");
      return;
    }
    if(username){
        navigation.navigate('Editpassword')
    }
   
    // else {


    //   console.log('hello')
    //   db.transaction(txn => {
    //     txn.executeSql(
    //       `SELECT * FROM loginuser where UserName=? `,
    //       [username],
    //       (sqlTxn, res) => {
    //         console.log("input retrived successfully");
    //         console.log(username, 'details');

    //         var len = res.rows.length;
    //         console.log('len', len);
            
    //         if (len > 0) {

    //           // console.log(res.rows,item(0))

    //           // navigation.navigate("Mainpage");
    //           console.log(res.rows.item(0), 'item');
    //           // console.log(res.rows.EmailID, 'gett');
              
    //           setUserData(res.rows.item(0))
    //           console.log(userData,'userdata');
    //           console.log(userData.UserName);
              


    //         }
    //         if (username !== userData.UserName) {
    //           setErrortext('Invalid Username')
    //           console.log(userData.UserName);
    //           return false

    //         }
         

            
    //         if (username === userData.UserName ) {
    //           setSuccess("UserName is VERIFIED");

    //           setTimeout(() => {
    //             navigation.replace('Editpassword',{user:username});
    //           }, 2000);
            
    //           return false

    //         }
    //         else {
    //           console.log('finish');
    //         }
    //       },
    //       error => {
    //         console.log("error on gettin input" + error.message);
    //       }
    //     )
    //   })
    // }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          //   flex: 1,     
          justifyContent: "center",
          alignContent: "center",
          marginTop: 60,
          // backgroundColor:'blue',
          // borderBottomLeftRadius: 10,
          // borderBottomRightRadius: 10,
          // borderTopLeftRadius: 10,
          // borderTopRightRadius: 10,
        }}
      >
        <View style={{
          // backgroundColor:'grey',
          marginTop:30,  
          

        }}>
        
          <KeyboardAvoidingView enabled>
            <View >
             <Text style={{marginLeft:30,fontSize:18,marginTop:10,color:'black'}}>Username
             </Text>
            <View style={styles.sectionStyle}>
            <FontAwesomeIcon icon={faUserEdit} size={32} style={{
              color: '#3090C7',
              marginTop: 12,
              marginLeft: 10,
              marginRight:6,
              fontWeight: 'bolder',
             
            }} />
            
            
              <TextInput
                style={styles.inputStyle}
                onChangeText={(username) =>
                  setUserName(username)
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
            {errorText != "" ? (
              <Text style={styles.errorTextStyle}>
                {" "}
                {errorText}{" "}
              </Text>
            ) : null}
            
            {success != "" ? (
              <Text style={styles.errorText}>
                {" "}
                {success}{" "}
              </Text>
            ) : null}
           
            
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={getInputs}
            >
              <Text style={styles.buttonTextStyle}>
                Verify
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
              <View style={{ flex: 1, height: 1.2, backgroundColor: '#CECECE' }} />
              <View>
                <Text style={{
                  textAlign: 'center', fontSize: 20,
                }}>Or</Text>
              </View>
              <View style={{ flex: 1, height: 1.2, backgroundColor: '#CECECE' }} />
            </View>
            {/* <View style={styles.logo}>
              <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <TouchableOpacity>
                  <Image style={{ width: 35, height: 35, marginTop: 3, borderRadius: 50, fontSize: 10, }} source={require("./logo1.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={{ width: 35, height: 35, borderRadius: 30, marginTop: 2 }} source={require("./twit1.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={{ width: 35, height: 35, borderRadius: 50 }} source={require("./face1.png")} />
                </TouchableOpacity>
              </View>

            </View> */}


            <View style={{ width: 400, height: 100, marginTop: 4 }}>
              <View style={{ marginTop: 10 }}>

                <Text
                  style={styles.registerTextStyle}
                  onPress={() =>
                    navigation.replace("NewRegister")
                  }
                >
                  Create a new account? <Text style={{color:'blue',fontSize:18,textDecorationLine:'underline'}}>click here</Text>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};
export default VerifyMAIL;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#E5E4E2",
    // backgroundColor:'yellow',
    alignContent: "center",
    // marginTop:10
    // marginBottom:100,

  },
  
  sectionStyle: {
    flexDirection: "row",
    height: 60,
    marginTop: 4,
    marginLeft: 29,
    marginRight: 29,
    margin: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#dadae8",

    backgroundColor:'lightgrey'



  },
  sectionStyle1: {
    flexDirection: "row",
    height: 60,
    marginTop: 1,
    marginLeft: 30,
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
    backgroundColor: "#cb202d",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
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
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    // borderWidth: 1,
    // borderRadius: 30,
    // borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",

    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "grey",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "center",
    cursorColor: "blue",
    
    
    
    // padding: 10,
  },
  errorTextStyle: {
    color: "red",
    fontSize: 16,
    marginLeft:27,
    marginBottom:2
  },
  errorText: {
    color: "blue",
    textAlign: "center",
    fontSize: 14,
  },
  Continue: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 30
  },
  logo: {
    // flexDirection:"row",
    width: 400,
    height: 80,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'space-evenly'
    // backgroundColor:'green',
    // justifyContent:'space-around',
    // marginTop:40




  }
});