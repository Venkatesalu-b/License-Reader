import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { openDatabase } from 'react-native-sqlite-storage';

import LoginPage1 from './android/app/src/Loginpage';
import LicenceScanner from './android/app/src/Licenseinfo';
import CameraCaptureScreen from './android/app/src/Capture';
import Form from './android/app/src/Licensedetails';
import Scanner from './android/app/src/Userscandetails';
import Userimage from './android/app/src/Image';
import PhoneSignIn from './android/app/Phonenumber';
import Mappage from './android/app/src/Mappage';
import Signup from './android/app/src/Signup';

var db = openDatabase({ name: 'UserDatabase.db' });

const Stack = createStackNavigator();

function App() {
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Users',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            setLogin("Image Scanner");
            console.log('Login successful.');
          } else {
            setLogin("LoginPage1");
            console.log('Please login.');
          }
          setLoading(false);
        },
        (error) => {
          console.log('Error executing SQL query: ', error);
          setLoading(false);
        }
      );
    });
  };

  if (loading) {
    return null; // Render a loading indicator or splash screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={login}>


     <Stack.Screen name='LoginPage1' component={LoginPage1}
      options={{ headerShown: false }}
 />
<Stack.Screen name='Image Scanner' component={Scanner} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="image" component={Userimage} />
        <Stack.Screen name="Location" component={Mappage} />
        <Stack.Screen name='SignUp' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
