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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Images from './Images/Images'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


function LoginPage1({navigation}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // setupDatabase();
    setUserName('');
    setUserPassword('');
    setUserbranch('');
  }, []);
  
const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,userbranch TEXT);',
      [],
      () => {
        console.log('Database table created successfully.');
      },
      (error) => {
        console.log('Error creating database table: ', error);
      }
    );
  });
};

const handleLogin = () => {
  getData();
  setErrortext('')
  setErrortext1('')
  setErrortext2('')
  if(!userbranch){
    setErrortext("*please select branch");
    return false
  };
  if(!username){
    setErrortext1("*please Enter Email");
    return false
  }
  if(!userPassword){
    setErrortext2("*please Enter password")
    return false
  }

  // db.transaction(tx => {
  //   tx.executeSql(
  //     'INSERT INTO Users (username,password,userbranch) VALUES (?, ?,?)',
  //     [username,userPassword,userbranch],
  //     (tx, result) => {
  //       console.log('Data inserted successfully.');
  //       console.log('Inserted row ID: ', result.insertId);
  //     },
  //     error => {
  //       console.error('Error inserting data: ', error);
  //     }
  //   );
  // });

  
  
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Users WHERE username = ? AND password = ? AND userbranch = ?',
      [username,userPassword,userbranch],
      (tx, results) => {
        const rows = results.rows;
        if (rows.length > 0) {
          console.log('Login successful.');
          navigation.navigate("Image Scanner");

        } else {
          console.log('Invalid username or password.');
          Alert.alert("Please Enter Valid Username,Password,branch.")

        }
      },
      (error) => {
        console.log('Error executing SQL query: ', error);
      }
    );
  });
}





  // useEffect(()=>{
  //   if(username!==''&&userPassword!==''&&userbranch!==''){
  //      navigation.navigate("Image Scanner");
  //   }
  // })

   
    const [username, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userbranch,setUserbranch]=useState('');
    const [errortext, setErrortext] = useState("");
    const [errortext1, setErrortext1] = useState("");
    const [errortext2, setErrortext2] = useState("");
    let [userData1, setUserData] = useState([]);
    const [success, setSuccess] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
const [login,setLogin] = useState(false);
    // const [Branch,setUserbranch]
    const passwordInputRef = createRef();
    // const isFocused = useIsFocused();
    

    const [isFocus, setIsFocus] = useState(false);
    console.log(userData1,'used')
    console.log(userbranch)
    

    // useEffect(() => {
    //   const backAction = () => {
    //     if (login) {
    //       AsyncStorage.setItem('credentials', 'true'); // Store login status as 'true'
    //       BackHandler.exitApp(); // Close the app
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   };
    
    //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    //   return () => backHandler.remove(); // Clean up the event listener
    
    // }, [login]);
    // 192.168.250.23
    
//     useEffect(()=>{
//  fetch(`http://192.168.2.146:4000/users/${userbranch}/${username}`)
//       .then(response => response.json())
//       .then(response => 
        
      
//        setUserData(response))
//  },[])



async function getData(){
try{
  const response =  await fetch(`http://192.168.2.146:4000/users/${userbranch}/${username}`,{
            method:'get'})
            const jsn=await response.json();
            console.log(jsn,'jsn');
            setUserData(jsn);
          
}
catch(err){
  console.log(err)
}
}

    

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

const getInputs = async () => {
  getData();
    setErrortext('')
    setErrortext1('')
    setErrortext2('')
    if(!userbranch){
      setErrortext("*please select branch");
      return false
    };
    if(!username){
      setErrortext1("*please Enter Email");
      return false
    }
    if(!userPassword){
      setErrortext2("*please Enter password")
      return false
    }

  // setLogin(true);
  // return navigation.navigate("Image Scanner");


  
//   try {
//     const credentials = JSON.stringify({ userbranch,username,userPassword });
//     await AsyncStorage.setItem('credentials', credentials);
//     console.log('Credentials stored successfully.');
//     setLogin(true)
//     navigation.navigate("Image Scanner")
//   } catch (error) {
//     console.log('Error storing credentials: ', error);
//   }
};

// const retrieveCredentials = async () => {
//   try {
//     const credentials = await AsyncStorage.getItem('credentials');
//     if (credentials) {
//       const {userbranch,userName,userPassword  } = JSON.parse(credentials);
//       console.log('Retrieved email:', userbranch);
//       console.log('Retrieved password:', userName);
//       console.log('Retrieved password:', userPassword);

//     } else {
//       console.log('No credentials found.');
//     }
//   } catch (error) {
//     console.log('Error retrieving credentials: ', error);
//   }
// };
// retrieveCredentials()




// ...



   
    // const getInputs = async()=> {
    // await AsyncStorage.setItem('token',username,userPassword,userbranch);
    // if(username!==''&&userPassword!==''&&userbranch!==''){
    //   navigation.navigate("Image Scanner")
    // }
    // else{
    //   console.log('Error');
    // }

  

    //   getData();
    //   setErrortext('')
    //   setErrortext1('')
    //   setErrortext2('')
    //   if(!userbranch){
    //     setErrortext("*please select branch");
    //     return false
    //   };
    //   if(!username){
    //     setErrortext1("*please Enter Email");
    //     return false
    //   }
    //   if(!userPassword){
    //     setErrortext2("*please Enter password")
    //     return false
    //   }

    // setLogin(true);
    // return navigation.navigate("Image Scanner");
  
  
    // }


  // }


  // useEffect(()=>{
  //    const value =  AsyncStorage.getItem('token');
  //    if(value!==null){
  //     navigation.navigate("Image Scanner")
  //    }
  //    else{
  //     console.log('err');
  //    }
  //   },[])
  // const loginscreen = ()=>{
  //   const value =  AsyncStorage.getItem('token');
  //   console.log(value,'yyy');
  //   if(value!==null){
  //        navigation.navigate("Image Scanner")
  //       }
  //       else{
  //        console.log('err');
  //       }
  //      }
  //      loginscreen()
const Signuppage=()=>{
navigation.navigate("SignUp")
}
  
    
  return (
   
    <SafeAreaView style={styles.mainBody}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        //   flex: 1,     
        justifyContent: "center",
        alignContent: "center",
        
        backgroundColor:'white',
        // backgroundColor:'lightgrey'
      }}
    >
      <View>
      <Image style={styles.image} source={Images.Biketracking_Loginimage} /> 
      
      
        <KeyboardAvoidingView enabled>
          <View style={styles.container}>
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
         {errortext != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext}{" "}
            </Text>
          ) : null}
          <View >
           <Text style={{marginLeft:26,fontSize:18,marginTop:10,color:'black'}}>Username
           </Text>
          <View style={styles.sectionStyle}>
          
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
          {errortext1 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext1}{" "}
            </Text>
          ) : null}
          <Text style={{marginLeft:26,fontSize:18,color:'black'}}>Password
           </Text>
          <View style={styles.sectionStyle1}>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
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
          {errortext2 != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext2}{" "}
            </Text>
          ) : null}
         
          {/* {success != "" ? (
            <Text style={styles.errorText}>
              {" "}
              {success}{" "}
            </Text>
          ) : null} */}
          <TouchableOpacity onPress={()=>navigation.navigate("VerifyMAIL")}>
          <Text style={{textAlign:'right',fontSize:15,marginRight:25,color:'#56ccf2',marginTop:errortext2?-19:0}}>Forgot  Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleLogin}
          >
            <Text style={styles.buttonTextStyle}>
              LOGIN
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CECECE' }} />
            <View>
              <Text style={{
                textAlign: 'center', fontSize: 20,
              }}>Or</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CECECE' }} />
          </View>
          

        


          <View style={{  marginTop: 4 }}>
            <View style={{ marginTop: 18 }}>
              <TouchableOpacity onPress={()=>Signuppage()}>

              <Text
                style={styles.registerTextStyle}
              
              >
                Don't have an account ?<Text>  </Text><Text style={{color:'#56ccf2'}}>Create account</Text>
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>

  </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    // backgroundColor:'yellow',
    alignContent: "center",
    marginTop:10
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
  // inputSearchStyle: {
  //   height: 50,
  //   fontSize: 16,
    
  // },
});

export default LoginPage1