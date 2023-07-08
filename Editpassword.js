import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,SafeAreaView ,ScrollView,KeyboardAvoidingView ,Keyboard} from 'react-native';
  import React, {createRef, useEffect, useState} from 'react';
 
  import {useNavigation, useRoute} from '@react-navigation/native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
// import { faUserEdit } from '@fortawesome/free-solid-svg-icons/faPlus'
import {useIsFocused} from '@react-navigation/native';


  const Editpassword = ({navigation}) => {
    const route = useRoute();
    
    // console.log(route.params.user,"username");
    // const navigation = useNavigation();
    const [newpassword, setNewpassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [errortext11, setErrortext11] = useState("");
    const [errortext22, setErrortext22] = useState("");
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
   
    const isFocused = useIsFocused();
    // const[edtable,setEDTable]=useState();
    const passwordInputRef= createRef();

    const validatepassword1=(userPassword)=>{
var reg2=/^[a-zA-Z0-9+_!@#$%^&*()]{6,20}$/;
      return  reg2.test(userPassword)
      }
    

    const updateUsers= () => {
      setErrortext11('')
      if(!newpassword){
       return setErrortext11("Enter new password")
      }
      if(!validatepassword1(newpassword)){
       return setErrortext11("Password length alteast 7 characters")
        
      }
      if(!confirmpassword){
        return setErrortext22("Enter confirm Password")
      }
      if(newpassword !== confirmpassword){
        return setErrortext22('password does not same')
      }
      else{
    
    //   console.log('good');
    //   db.transaction(tx => {
    //     tx.executeSql(
    //       `UPDATE  loginuser   set  Password=? where UserName=?`,
    //       [newpassword, route.params.user],
    //       (tx, results) => {
    //         console.log('Results', results.rowsAffected);
    //         if (results.rowsAffected > 0) {
    //           Alert.alert(
    //             'Success',
    //             'User updated successfully',
    //             [
    //               {
    //                 text: 'Ok',
    //                 onPress: () => navigation.navigate('LoginUSER'),
    //               },
    //               {
    //                 text:'no'
    //               }
    //             ],
    //             {cancelable: false},
    //           );
    //         } else alert('Updation Failed');
    //       },
    //     );
    //   });
    }
    };


    // useEffect(() => {
    
    //   // var a='a';
    //   // var b=a.concat(route.params.Tabless)
    //  if(route.params.user!==null)
    //  {
    //     console.log('worked')
      
    //     db.transaction(txn => {
    //         txn.executeSql(
    //           `SELECT * FROM  loginuser`,
    //           [],
    //           (sqlTxn, res) => {
    //             console.log("input retrived successfully");
    //             let len = res.rows.length;
    //             if (len >= 0) {
    //               let results = [];
    //               for (let i = 0; i < len; i++) {
    //                 let item = res.rows.item(i);
    //                 if(item.UserName===route.params.user){
                        
                        
    //                     setNewpassword(item.Password)
                    
                    
                        
                        
                        
    //                 }
    //               }
                  
                  
    //             }
    //           },
    //           error => {
    //             console.log("error on gettin input" + error.message);
    //           }
    //         )
    //       })
        
       
    //  }
    // }, [isFocused]);
  
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
        }}
      >
       <KeyboardAvoidingView enabled>
      <View>
        {/* backgroundColor:#BFC9CA */}
        
        <View style={{width:350,marginLeft:20,height:400,backgroundColor:'#EBF5FB',borderBottomLeftRadius:14,borderBottomRightRadius:14,borderTopRightRadius:10,borderTopLeftRadius:10,marginTop:30,borderColor:'lightgrey',borderWidth:1}}>
        <Text style={{marginTop:25,marginLeft:23,fontSize:20,fontWeight:'500'}}>Newpassword</Text>
        <View style={{marginTop:-22}}>
          
        <View style={styles.sectionStyle1}>

<TextInput
  style={styles.inputStyle}
  onChangeText={(newPassword) =>
    setNewpassword(newPassword)
  }
  autoComplete="off"
  placeholder="Enter NewPassword"
  placeholderTextColor="#8b9cb5"
  keyboardType="default"
  onSubmitEditing={() =>
    passwordInputRef.current &&
    passwordInputRef.current.focus()
  }
  
  blurOnSubmit={false}
  secureTextEntry={false}
  underlineColorAndroid="#f000"
  returnKeyType="next"


/>
</View>
{errortext11 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext11}{" "}
            </Text>
          ) : null}


<View >
<Text style={{marginTop:10,marginLeft:23,fontSize:20,fontWeight:'500'}}>Confirmpassword</Text>
<View style={styles.sectionStyle2}>

<TextInput
              style={styles.inputStyle}
              onChangeText={(confirmpassword) =>
                setConfirmpassword(confirmpassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={isPasswordSecure}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
             <TouchableOpacity
                onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}>
                <FontAwesomeIcon icon={isPasswordSecure ? faEyeSlash : faEye} size={30} style={{
                  color: 'grey',
                  marginTop: 12,
                  marginRight: 7,
                  fontWeight: 'bolder',
                }} />



              </TouchableOpacity>
          </View>
          {errortext22 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext22}{" "}
            </Text>
          ) : null}
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={updateUsers}
          >
            <Text style={styles.buttonTextStyle}>
              Reset Password
            </Text>
          </TouchableOpacity>
          </View>
</View>
       
{/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            // onPress={INSERTuser}
          >
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity> */}
        
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Editpassword;
  const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: "center",
      // backgroundColor: "#E5E4E2",
      // backgroundColor:'yellow',
      backgroundColor:'white',
      
      alignContent: "center",
      // marginTop:10
      // marginBottom:100,
  
    },
    sectionStyle1: {
      flexDirection: "row",
      height: 60,
      marginTop: 30,
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
  
  
  
    },sectionStyle2: {
      flexDirection: "row",
      height: 60,
      marginTop: 10,
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
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: "white",
  
      borderColor: "#dadae8",
    },
    registerTextStyle: {
      color: "black",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 17,
      alignSelf: "center",
      cursorColor: "blue"
      // padding: 10,
    },
    errorTextStyle: {
      color: "red",
      fontSize: 16,
      marginLeft:24,
      marginBottom:2
    },
  });