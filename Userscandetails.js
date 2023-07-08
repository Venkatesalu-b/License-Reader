import React, {useState,useEffect} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
    Alert,
    Platform,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Image,
    Pressable,
    ToastAndroid,Dimensions,ActivityIndicator,Modal
  } from 'react-native';
  import ImagePicker from 'react-native-image-crop-picker';
 
  import RNFS from 'react-native-fs';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

  import { faCircleCheck, faUser,faXmark } from '@fortawesome/free-solid-svg-icons';
  import { faCamera,faFolder,faPlus ,faArrowLeft,faX,faIdCard,faImages} from '@fortawesome/free-solid-svg-icons';
  import {launchImageLibrary}  from 'react-native-image-picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Images from './Images/Images'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });



  const API_KEY = "AIzaSyAeTSG83riQObixjI65HsUl6gi_by1WDc0";
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  
  
  
      // var db = openDatabase({ name: 'UserDatabase.db' });

  
  
  function generateBody(image) {
    const body = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };
    return body;
  
  }

  const Scanner = ({navigation})=>{

    const [images, setImages] = useState('');
    const [image1, setImage1] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const[text3,setText3] = useState([]);
    const[text4,setText4] = useState('');
    const[a1,setA1] = useState('');
    const[a2,setA2] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

  
    const[imageuploadgallery,setImageuploadgallery] = useState(false);
    const[imageuploadcamera1,setImageuploadCamera1] = useState(false);
    const[waitcamera,setWaitcamera] = useState(true);
const[condition,setCondition] = useState(false)
   
  
    const [show, setShow] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

console.log(deviceHeight,'heig',deviceWidth,'devivew')


  
const handleLogout = () => {
  navigation.navigate("LoginPage1")
  setCondition(false)

  // db.transaction((tx) => {
  //   tx.executeSql(
  //     'DELETE FROM Users',
  //     [],
  //     () => {
  //       setIsLoggedIn(false);
  //     },
  //     (error) => {
  //       console.log('Error deleting user: ', error);
  //     }
  //   );
  // });
};
   
  
  
  
  
  
    const CallGoogleVisionAsync = async (image) => {
  
      const body = generateBody(image);
      // console.log('gocall')
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      // console.log(result,'call');
      const detectedText = result.responses[0].fullTextAnnotation;
      setText1(detectedText.text);
      console.log(detectedText.text, 'data');
      let d = detectedText.text.split('\n')
      console.log(d, 'split')
      const val1 = d.find((item) => (
        item === "Address" || item === "Present Address" || item === "Permanent Address"
      ));
      console.log(val1, 'some');

      const licenseNumberRegex = /\b[A-Z]{2}\d{2}\s\d{4}\s\d{7}\b/;
      const alternateRegex = /\b[A-Za-z]{3}\s\b[A-Za-z]{2}\s\b[A-Za-z]{2}\d{2}\s\d{11}\b/
      const licencse2 = /\b[A-Za-z]{2}\d{2}\s\d{11}\b/
      var dlNumber = licencse2.exec(d);
      var licenseNum = licenseNumberRegex.exec(d);
      var licenseNum2 = alternateRegex.exec(d);
      const dlnum = dlNumber ? dlNumber[0] : null;
    
      console.log(dlnum, 'lic no', typeof (dlnum));
      console.log(licenseNum2, 'lic no2');
      
    
    
    
    
    
      const licenseNumber1 = licenseNum ? licenseNum[0] : null;

      const frontimgname = d.find(element => /^[A-Z]+\s[A-Z]$/.test(element));
      const frontimgname1 = d.find(element => /^[A-Z]+\s[A-Z]+\s[A-Z]$/.test(element));
      console.log(frontimgname,frontimgname1,'imagessssss');

    

      if(frontimgname==undefined && frontimgname1==undefined){
        setWaitcamera(true)

        Alert.alert('Take the image name side  name is not recognizable.')
        return
      }

      if(licenseNumber1==undefined && dlnum==undefined){
        setWaitcamera(true)

        Alert.alert('Take the image again Licensenumber is not recognizable.')
        return
      }
  
      if (!val1) {
        setWaitcamera(true)
        Alert.alert(
          'Info',
          'Take the license other side',
          [
            // {
            //   text: 'Cancel',
            //   onPress: () => Alert.alert('Take the license back side')

            // },
            {
              text: 'OK', 
              onPress: () =>   openCamera1()
            },
          ],
          {cancelable: false},
        );
        
      
  
      }
      if (val1) {
        
        setImageuploadCamera1(true)
      
        return
      }
  
  
  
  
      // openCamera1()
  
  
    }
  
    const CallGoogleVisionAsync1 = async (image) => {
  
      const body = generateBody(image);
      // console.log('gocall')
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setWaitcamera(true)
      // console.log(result,'call');
      const detectedText = result.responses[0].fullTextAnnotation;
      setText2(detectedText.text);
      // setImageuploadCamera1(true)
      console.log(detectedText, 'data')
      let e = detectedText.text.split('\n');



  
      const imgaddress = e.find((item) => (
        item === "Address" || item === "Present Address" || item === "Permanent Address"
      ));
      console.log(imgaddress, 'some');
      if(!imgaddress){
        setWaitcamera(true)
        Alert.alert(
          'Info',
          'Take the image again address is not recognizable.',
        [
          {
            text: 'OK', 
            onPress: () =>  openCamera1()
          },
        ],
        );
return
      }
      setImageuploadCamera1(true)
  
  
    }


  
    const CallGoogleVisionAsync3 = async (image) => {
  
      const body = generateBody(image);
      // console.log('gocall')
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setImageuploadgallery(true);
      // console.log(result,'call');
      const detectedText = result.responses[0].fullTextAnnotation;
      setA1(detectedText.text);
      console.log(detectedText, 'data')
  
  
    }
    const CallGoogleVisionAsync4 = async (image) => {
  
      const body = generateBody(image);
      // console.log('gocall')
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      // console.log(result,'call');
      const detectedText = result.responses[0].fullTextAnnotation;
      setA2(detectedText.text);
      console.log(detectedText, 'data')
  
  
    }
    console.log(a1,'list..');


    const opencamerafront =()=>{
      if(imageuploadcamera1==false){

      Alert.alert(
        'Info',
        'Take the Front Side of the License.',
      [
        {
          text: 'OK', 
          onPress: () =>  setTimeout(()=>{
            opencamera()
          },500)
        },
            {
              text: 'Cancel',

            },
      ],
      );
      
      }
      else{
        Alert.alert('Please remove the image');

      }
    }
  
    const opencamera = () => {
      if(imageuploadcamera1==true){
        Alert.alert('Please remove the image');
        return
      }
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        compressImageQuality:1,
        enableRotationGesture:true,
        showCropFrame:false
      }).then(async image => {
     
        const imageFile = await RNFS.readFile(image.path, 'base64');
        setImages(image.path);
        console.log('images', imageFile);
        const result = CallGoogleVisionAsync(imageFile);
        setWaitcamera(false);
        console.log(result, 'test');
  
  
  
      }).catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          Alert.alert('Image capture canceled', 'Could not pick image');
        } else {
          Alert.alert('Image capture error', error.message);
        }
      });
    };
  
    console.log(images,'path of the image');


    function openCamera1() {
  
      setShow(true)
      ImagePicker.openCamera({
        // cropping: true,
        multiple: true,
        compressImageQuality: 0.8,
  
  
      }).
      
      then(async image => {
  
  
        const imageFile1 = await RNFS.readFile(image.path, 'base64');
        setImage1(image.path)
        console.log('images', imageFile1);
        const result1 = CallGoogleVisionAsync1(imageFile1);
        setWaitcamera(false);
        console.log(result1, 'test');
  
      });
  
  
  
  
    }
  
  console.log(image1,'other image path');
  
    console.log("text1", text1);
    console.log("text2", text2)
    let c = text1.split('\n');
    console.log(c);
    let d = text2.split('\n');
    console.log(d);
  
  
  
  
    const openlibrary = () =>{
      ImagePicker.openPicker({
      
          cropping: true,
          // maxFiles:1,
          multiple:true,
        
          compressImageQuality:0.8,
  
        }).then(async image => {
  console.log(image,'path');
          image.map(async list=>{
            text3.push(
           
              list.path,
             
            )
            console.log(text3[0],'idt');
            const imageFile1 = await RNFS.readFile(text3[0], 'base64');
            const result =  CallGoogleVisionAsync3(imageFile1);
  
            console.log(imageFile1,'00000');
            const imageFile2 = await RNFS.readFile(text3[1], 'base64');
  
            console.log('images',imageFile1,imageFile2);
            const result1 =  CallGoogleVisionAsync4(imageFile2);
            console.log(result1,'test1');
  
           console.log(result,'test');
          })
  
         
        });
  }
  
  console.log(a1,'a1');
  console.log(a2,'a2');
  
  
  
  
  let e = a1.split('\n');   
  console.log(e,'a1list');
  let f = a2.split('\n');
  console.log(f,'a2list');
  
  
  let addressDetailsforlibrary1 = '';
  
  for (let i = 0; i < e.length; i++) {
    if (e[i] === "Address" || e[i] === "Present Address") {
      addressDetailsforlibrary1 = e[i + 1] + ', ' + e[i + 2] + ', ' + e[i + 3];
  
    }
  }
  
  console.log("Address Detailslibrary:", addressDetailsforlibrary1);
  let addressDetailsforlibrary2 = '';
  
  for (let i = 0; i < f.length; i++) {
    if (f[i] === "Address" || f[i] === "Present Address") {
      addressDetailsforlibrary2 = f[i + 1] + ', ' + f[i + 2] + ', ' + f[i + 3];
  
    }
  }
  
  console.log("Address Detailslibrary:", addressDetailsforlibrary2);
  
  
  const nameElementforlib = e.find(element => /^[A-Z]+\s[A-Z]$/.test(element));
  const nameElementforlib1 = e.find(element => /^[A-Z]+\s[A-Z]+\s[A-Z]$/.test(element));
  
  console.log(nameElementforlib, 'name1');
  console.log(nameElementforlib1, 'names');
  
  
  const licenseNumberRegexforlib = /\b[A-Z]{2}\d{2}\s\d{4}\s\d{7}\b/;
  const alternateRegexforlib = /\b[A-Za-z]{3}\s\b[A-Za-z]{2}\s\b[A-Za-z]{2}\d{2}\s\d{11}\b/
  const licencse2forlib = /\b[A-Za-z]{2}\d{2}\s\d{11}\b/
  var dlNumberforlib = licencse2forlib.exec(e);
  var licenseNumforlib = licenseNumberRegexforlib.exec(e);
  // var licenseNum2forlib = alternateRegexforlib.exec(e);
  const dlnumforlib = dlNumberforlib ? dlNumberforlib[0] : null;
  
  

  
  console.log(dlnumforlib, 'lic no', typeof (dlnumforlib));
  console.log(licenseNumforlib, 'lic no2');
  
  
  
  
  
  const licenseNumber2forlib = licenseNumforlib ? licenseNumforlib[0] : null;
  
  console.log(licenseNumber2forlib, 'match')
  
  
  var finallib = '';
  if (dlnumforlib) {
    finallib = dlnumforlib;
  }
  else if (licenseNumber2forlib) {
    finallib = licenseNumber2forlib;
  }
  var finalnamelib = '';
  if (nameElementforlib) {
    finalnamelib = nameElementforlib;
  }
  else if (nameElementforlib1) {
    finalnamelib = nameElementforlib1;
  }
  
  
  console.log(finallib,finalnamelib, 'finalsss');

  const Removedata = async()=>{
    try {
      await AsyncStorage.removeItem('credentials');
      console.log('Credentials removed successfully.');
      navigation.navigate("LoginPage1")
    } catch (error) {
      console.log('Error removing credentials: ', error);
    }
  
  }

  navigation.setOptions({
    headerStyle: {
      backgroundColor: condition ?  'rgba(0, 0, 0,.3)'
      : 'white',
    },
    
    headerLeft: () => (
      <Pressable
      
      onPress={() =>    {setModalVisible(!modalVisible);setCondition(true);}
      }>
   
        <FontAwesomeIcon
          icon={faUser}
          size={30}
          style={{
            color: 'grey',
            marginTop: 5,
            marginLeft: 10,
            fontWeight: 'bolder',
          }}
        />
      </Pressable>
    ),
  });
  
  
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => reader()}
        >
          <FontAwesomeIcon
            icon={faCircleCheck}
            size={33}
            style={{
              color: '#14AEB8',
              marginTop: 5,
              marginLeft: 1,
              marginRight: 10,
              fontWeight: 'bolder',
            }}
          />
        </Pressable>
      ),
    });
  
  
  
  
    // let d = img.split('\n');
    // console.log(d,'cam2');
  
    let addressDetails = '';
  
    for (let i = 0; i < c.length; i++) {
      if (c[i] === "Address" || c[i] === "Present Address") {
        addressDetails = c[i + 1] + ', ' + c[i + 2] + ', ' + c[i + 3];
  
      }
    }
  
    console.log("Address Details:", addressDetails);
    let addressDetails1 = '';
  
    for (let i = 0; i < d.length; i++) {
      if (d[i] === "Address" || d[i] === "Present Address") {
        addressDetails1 = d[i + 1] + ', ' + d[i + 2] + ', ' + d[i + 3];
  
      }
    }
  
    console.log("Address Details:", addressDetails1);
  
  
    const nameElement = c.find(element => /^[A-Z]+\s[A-Z]$/.test(element));
    const nameElement1 = c.find(element => /^[A-Z]+\s[A-Z]+\s[A-Z]$/.test(element));
  
    console.log(nameElement1, 'name1');
    console.log(nameElement, 'names');
  
  
    const licenseNumberRegex = /\b[A-Z]{2}\d{2}\s\d{4}\s\d{7}\b/;
    const alternateRegex = /\b[A-Za-z]{3}\s\b[A-Za-z]{2}\s\b[A-Za-z]{2}\d{2}\s\d{11}\b/
    const licencse2 = /\b[A-Za-z]{2}\d{2}\s\d{11}\b/
    var dlNumber = licencse2.exec(c);
    var licenseNum = licenseNumberRegex.exec(c);
    var licenseNum2 = alternateRegex.exec(c);
    const dlnum = dlNumber ? dlNumber[0] : null;
  
    console.log(dlnum, 'lic no', typeof (dlnum));
    console.log(licenseNum2, 'lic no2');
  
  
  
  
  
    const licenseNumber1 = licenseNum ? licenseNum[0] : null;
  
    console.log(licenseNumber1, 'match')
  
  
  
  
    var final = '';
    if (dlnum) {
      final = dlnum;
    }
    else if (licenseNumber1) {
      final = licenseNumber1;
    }
    var finalname = '';
    if (nameElement) {
      finalname = nameElement;
    }
    else if (nameElement1) {
      finalname = nameElement1;
    }
  
  
    console.log(final, 'finalsss');
  
    const reader = () => {
      if(imageuploadcamera1==false){
        Alert.alert('Take the License image')
        return
      }
    
   
      if(final==''){
        Alert.alert('Image is not clear license number is not recognizable')
        return
      }
      if(finalname==''||null){
        Alert.alert('Image is not clear name is not recognizable')
        return
      }
      if(addressDetails1==''&&addressDetails==''){
        Alert.alert('Image is not clear address s not recognizable')
        return
      }
      navigation.navigate("Form", { name: finalname||finalnamelib, license: final||finallib, Address: addressDetails1 || addressDetails ||addressDetailsforlibrary1||addressDetailsforlibrary2,frontimage:images,backimage:image1,image:true})
  
    
  }
  
    // let arr = [];
   const Details = () =>{
    navigation.navigate("Form", { name: '', license: '', Address: '',image:false})
  
  }
  
const r1 = ()=>{
  setTimeout(() => {
    setImageuploadCamera1(false)

  },500);
}


const remove = () =>{
   
  finalname='',
  final='',
  addressDetails='',
  addressDetails1=''
  c='',
  d=''
  r1()
// setImageuploadCamera1(false)

}

const close = ()=>{
  setModalVisible(!modalVisible)
  setCondition(false)
}
 

    
  const removeCredentials = async () => {
    try {
      await AsyncStorage.removeItem('credentials');
      console.log('Credentials removed successfully.');
      navigation.navigate("LoginPage1")
    } catch (error) {
      console.log('Error removing credentials: ', error);
    }
  };

    return(
      <>
<View  style={[ condition ? styles.bgstyle1 : styles.bgtyle2,{flex:1}]}>
      <ScrollView >
        <View style={[styles.itemContainer,{marginTop:deviceHeight*0.07,flex:1,}]}>
          
      
        <Text style={styles.text}>Take a License image</Text>
        
            
            <View style={{height:hp('40%'),width:wp('93%'),marginLeft:deviceWidth*0.03}}>
            <View style={{ height: hp('20%'), width: wp('93%'), flexDirection: 'row', justifyContent: 'space-around', marginTop:deviceHeight*0.01 }}>
{waitcamera?
              
            <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#67696A', borderRadius: 50, height: 50, width: 50,marginTop:deviceHeight*0.01 }}>
                <TouchableOpacity onPress={opencamerafront} style={{marginLeft:deviceWidth*0.02}}>
                  <FontAwesomeIcon icon={faCamera} size={35} color='#67696A' />
                  </TouchableOpacity>
                  </View>:<View style={{alignItems:'center',marginTop:8}}><Text><ActivityIndicator size="large"  /></Text>
                  <Text style={{color:'grey',marginRight:10}}>Please wait</Text></View>}
             </View>
              <View style={{flexDirection:'row',justifyContent:'center',marginTop:deviceHeight*-0.07}}>
                  {
         imageuploadcamera1?<><View style={{height:50,width:280,backgroundColor:'#F2F8F8',marginLeft:10,marginTop:-9,flexDirection:'row',
         justifyContent:'center',alignItems:'center',borderRadius:10,}}><View style={{flexDirection:'row'}}><TouchableOpacity onPress={()=>{remove()}}><Text style={{textAlign:'center',color:'green'}}>Images Uploaded  Successfully    <FontAwesomeIcon icon={faX} color='#9E1010' size={15} /></Text>
      </TouchableOpacity></View>
      </View></>:<></>
         }
         
         </View> 
              
         <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:deviceHeight*0.01 }}>
            <View style={{ flex: 1, height: hp('0.1%'), backgroundColor: '#CECECE',marginTop:deviceHeight*0.01 }} />
            <View>
              <Text style={{
                textAlign: 'center', fontSize: 20,color:'black'
              }}>Or</Text>
            </View>
            <View style={{ flex: 1, height:hp('0.1%'),backgroundColor: '#CECECE',marginTop:deviceHeight*0.01 }} />
          </View>
          <View style={{ height:hp('9%'), width:wp('90%'), flexDirection: 'row', marginTop: deviceHeight*0.05}}>
            <Text style={{ fontSize: 18, letterSpacing: .8, marginLeft:deviceWidth*0.10,color:'black' }}>Enter the License Details</Text>
            <TouchableOpacity 
            style={{ marginLeft: deviceWidth*0.07 }}
             onPress={Details}>
              <FontAwesomeIcon icon={faPlus} color='#0B3E5D' size={30} />
            </TouchableOpacity>
          </View>


        
         
       
    </View>
  
  <Modal
    animationType='slide'
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, ]}
              onPress={() => close()}>
<FontAwesomeIcon icon={faXmark} size={25} style={{marginLeft:5,backgroundColor:'lightgrey'}} />
            </Pressable>
            <View style={{height:40,width:140,backgroundColor:'black',marginTop:50,}}>
              <Pressable onPress={()=>handleLogout()}>
            <Text style={styles.modalText}>Logout</Text></Pressable></View>
       
          </View>
        </View>

  </Modal>
 


    <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <FontAwesomeIcon icon={faImages} size={130} color='#CCD0D2' style={{opacity:0.4}}/>
            {/* <Image style={{height:hp('50%'),width:wp('93%'),resizeMode:'cover'}} source={Images.Biketracking_Bikeimage} />  */}
            </View>
               </View>
  
        </ScrollView>
        </View>
        </>
    )
  }

  const styles = StyleSheet.create({
    header1:{},
    bgstyle1:{
      
      backgroundColor: 'rgba(0, 0, 0,.3)'
    },
   bgtyle2:{

   },
  
    image: {
      width: 300,
      height: 200,
borderRadius:10,
      marginTop:1,
      borderColor:'black',
      borderWidth:1
    },
    text:{
      fontSize: 19,
      color: '#0B1C32',
      letterSpacing: 1.5,
      textAlign: 'center'
    },  modalView: {
      height:130,
      width:150,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      borderWidth:1,
      borderColor:'grey',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

  
    button: {
      borderRadius: 10,
      padding:5,
      marginLeft:10,
      position:'absolute',
      },
  
    buttonClose: {
      backgroundColor: 'white',
    },
    modalText:{
      marginTop:5,
      fontSize:18,
      fontWeight:'500',
      textAlign:'center',
      color:'white'
    }
  });
  export default Scanner