import React, { useState, createRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Dropdown } from 'react-native-element-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


                                    

import {  faUserEdit,faIdBadge ,faEnvelope,faKey,faEye} from '@fortawesome/free-solid-svg-icons';


const NewRegister = ({ navigation }) => {
  const [userbranch,setUserbranch]=useState('');
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const[samePassword,setSamepassword]=useState("")
  const [errortext1, setErrortext1] = useState("");
  const [errortext2, setErrortext2] = useState("");
  const [errortext3, setErrortext3] = useState("");
  const [errortext4, setErrortext4] = useState("");
  const [errortext5, setErrortext5] = useState("");
  const [errortext6, setErrortext6] = useState("");
  const [isFocus, setIsFocus] = useState(false);



  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const userinputref=createRef();
  const samePasswordref=createRef();
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

//   const handleSubmitButton = () => {
//     setErrortext("");
//     if (!userName) return alert("Please fill Name");
//     if (!userEmail) return alert("Please fill Email");
//     if (!userPassword) return alert("Please fill Address");

//     auth()
//       .createUserWithEmailAndPassword(
//         userEmail,
//         userPassword
//       )
//       .then((user) => {
//         console.log(
//           "Registration Successful. Please Login to proceed"
//         );
//         console.log(user);
//         if (user) {
//           auth()
//             .currentUser.updateProfile({
//               displayName: userName,
//               photoURL:
//                 "https://aboutreact.com/profile.png",
//             })
//             .then(() => navigation.replace("LoginScreen"))
//             .catch((error) => {
//               alert(error);
//               console.error(error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.code === "auth/email-already-in-use") {
//           setErrortext(
//             "That email address is already in use!"
//           );
//         } else {
//           setErrortext(error.message);
//         }
//       });
//   };

// useEffect(()=>{
//     createUSER()
// },[])
 const validatename=(userName)=>{


// var re1= /^[\w]{2,13}$/;
var reg=/^[A-Z\s]+[a-zA-z\s]{4,29}$/;
return  reg.test(userName)
}
const validatepassword=(userPassword)=>{


  // var re1= /^[\w]{2,13}$/;
  var reg2=/^[a-zA-Z0-9+_!@#$%^&*()]{6,20}$/;
  return  reg2.test(userPassword)
  }
const validateid=(userid)=>{


  // var re1= /^[\w]{2,13}$/;
  var reg1=/^[A-Za-z0-9]{4,10}$/;
  return  reg1.test(userid)
  }
 const validateEmail = (email) => {
  // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var re=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
};
const createUSER = () => {
           console.log('hi everyone');
        
        db.transaction(txn => {

            console.log("tablename");
          txn.executeSql(`CREATE TABLE loginuser(id INTEGER PRIMARY KEY AUTOINCREMENT,UserName VARCHAR(20),Userid VARCHAR(20) UNIQUE, EmailID VARCHAR(50) UNIQUE,Password VARCHAR(30))`,
            [],
            console.log('work'),
            (sqlTxn, res) => {
              console.log(b,'show',res);
               
            },
            error => {
              alert("error on creating tables" + error.message);
            }
          );
        });
      };

      const INSERTuser=()=>{
        setErrortext1("");
        setErrortext2("");
        setErrortext3("");
        setErrortext4("");
        setErrortext5("");
        setErrortext6("");
        if (!userName){
            return setErrortext1("Please fill Name");
        }
        if(!validatename(userName)){
         return setErrortext1("First letter capital letter")
          
        }
        if(!userid) return setErrortext2("please fill userid")
        if(!validateid(userid)){
          return setErrortext2("Only characters and numbers are allowed ")
           
         }
            if (!userEmail) return setErrortext3("Please fill Email");
            if(!validateEmail(userEmail)){
              setErrortext3("Enter correct format email")
              return false
            }
            if (!userPassword) return setErrortext4("Please fill password");
            if(!validatepassword(userPassword)){
              setErrortext4("Password must be atleast 7 characters")
              return false
            }
            if(!samePassword) return setErrortext5("please fill confirm password")
            if(userPassword !== samePassword) {
                 setErrortext5("Password does not match")
                console.log("hellll");
                return false
            }
           
            
            else{

            
        db.transaction(txn => {

           console.log(userName,userid,userEmail,userPassword,"tablename22");
         txn.executeSql(`INSERT INTO loginuser (UserName,Userid,EmailID,Password) VALUES(?,?,?,?)`,
           [userName,userid,userEmail,userPassword],
           (sqlTxn, res) => {
              
             
             setErrortext6("  created successfully");
             alert("Account created successfully");
             setTimeout(() => {
              navigation.navigate("LoginUSER");
              }, 2000);
            
             console.log(res,'insert');
             getData()
           },
           error => {r
             alert("error on creating tables" + error.message);
           }
         );
       });
    }

     }
     var temp = [];
     const getData=()=>{
         db.transaction(txn => {
   
   
           txn.executeSql("SELECT * FROM loginuser",
             [],
             (sqlTxn, results) => {
   
               for (let i = 0; i < results.rows.length; ++i) {
                 temp.push(results.rows.item(i));
   
                 //   console.log(temp,'tables')
               }
               console.log(temp, 'ter1')
            //    setList(temp)
             
             },
             error => {
               alert("error on creating tables" + error.message);
             }
           );
         });
       }

  return (
    <SafeAreaView
      style={{ flex: 1}}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        //   backgroundColor:'blue',
          marginTop:20
        }}
      >
        
        <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
          <FontAwesomeIcon icon={faUserEdit} size={30} style={{
              color: '#3090C7',
              marginTop: 12,
              marginLeft: 7,
              fontWeight: 'bolder',
             
            }} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) =>
                setUserName(UserName)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                userinputref.current &&
                userinputref.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          {errortext1 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext1}{" "}
            </Text>
          ) : null}
          {/* <View style={styles.sectionStyle}>
          <FontAwesomeIcon icon={faIdBadge} size={32} style={{
              color: '#7BCCB5',
              marginTop: 12,
              marginLeft: 7,
              fontWeight: 'bolder',
             
            }} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userid) =>
                setUserid(userid)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter userid"
              placeholderTextColor="#8b9cb5"
              ref={userinputref}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              // secureTextEntry={true}
              
              blurOnSubmit={false}
            />
            </View> */}
              <View style={styles.sectionStyle}>
             <Dropdown
          // itemContainerStyle={{backgroundColor:'red',color:'blue'}}
          itemTextStyle={{color:'#000000'}}
          
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
          value={userbranch}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setUserbranch(item.value);
            setIsFocus(false);
          }}
          
        />
         </View>
              {errortext2 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext2}{" "}
            </Text>
          ) : null}
          
          <View style={styles.sectionStyle}>
          <FontAwesomeIcon icon={faEnvelope} size={30} style={{
              color: '#F98B88',
              marginTop: 12,
              marginLeft: 7,
              fontWeight: 'bolder',
             
            }} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            </View>
              {errortext3 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext3}{" "}
            </Text>
          ) : null}
          
          <View style={styles.sectionStyle}>
          <FontAwesomeIcon icon={faKey} size={30} style={{
              color: 'black',
              marginTop: 12,
              marginLeft: 7,
              fontWeight: 'bolder',
             
            }} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              // secureTextEntry={true}
              onSubmitEditing={() =>
               samePasswordref.current &&
                samePasswordref.current.focus()
              }
              blurOnSubmit={false}
            />
           
          </View>
          {errortext4 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext4}{" "}
            </Text>
          ) : null}
          <View style={styles.sectionStyle}>
          <FontAwesomeIcon icon={faKey} size={30} style={{
              color: 'black',
              marginTop: 12,
              marginLeft: 7,
              fontWeight: 'bolder',
             
            }} />
          
            <TextInput
              style={styles.inputStyle}
              onChangeText={(samePassword) =>
                setSamepassword(samePassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              ref={samePasswordref}
              returnKeyType="next"
              secureTextEntry={false}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext5 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext5}{" "}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={INSERTuser}
          >
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
          {errortext6!= "" ? (
            <Text style={styles.errorTe}>
              {" "}
              {errortext6}{" "}
            </Text>
          ) : null}
          <View style={styles.regist}>
    
    <Text onPress={()=>navigation.navigate("LoginPage1")} style={{fontSize:17,fontWeight:'500',marginTop:10}}>Already have an account? <Text style={{textDecorationLine:'underline',color:'blue'}}> Login here
      </Text>
    </Text>
    </View>
        </KeyboardAvoidingView>
      </ScrollView>
      
     
    </SafeAreaView>
  );
};
export default NewRegister;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    height: 60,
    marginTop: 18,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderWidth:2,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderColor: "#dadae8",
  },
  buttonStyle: {
    backgroundColor: "#C24641",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 60,
    alignItems: "center",
    // borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical:14,
    fontSize: 19,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 11,
    paddingRight: 15,
    fontSize:16,
    // borderWidth: 1,
    // borderRadius: 30,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,

    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "left",
    marginLeft:37,
        fontSize: 14,
  }, regist: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    // padding: 10,
  }, errorTe: {
    color: "blue",
    textAlign: "center",
    // marginRight:10,
        fontSize: 17,
  }, dropdown: {
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
});