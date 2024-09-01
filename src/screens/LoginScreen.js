import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter a username and password');
      return;
    }

    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const userData = storedUserData ? JSON.parse(storedUserData) : null;

      if (
        userData &&
        username === userData.email &&
        password === userData.password
      ) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error retrieving data', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <ImageBackground
          source={require('../assets/images/backimages.jpg')}
          style={styles.backgroundImage}>
          <View
            style={{width: 380, height: 200, marginRight: 50, marginTop: 200}}>
            <Text style={{fontSize: 40, color: 'black'}}>Welcome Back!</Text>
            <Text style={{fontSize: 17, color: 'gray', marginLeft: 6}}>
              Lorem ispum dolor sit amet, consectetur adipiscing elit pharetra
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={{marginTop: 60, alignItems: 'center'}}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Email"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}>
            <Image
              source={require('../assets/images/eye.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 255,
            color: 'rgba(15, 105, 241, 1)',
          }}>
          forgot password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 400,
          height: 75,
          backgroundColor: '#0F69F1',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 46,
        }}
        onPress={handleLogin}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            lineHeight: 75,
          }}>
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 500,
          height: 75,
          backgroundColor: 'white',
          alignSelf: 'center',
          marginTop: 45,
        }}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={{fontSize: 18, alignSelf: 'center', marginTop: 30}}>
          <Text style={{color: 'gray'}}>Don't have an account? </Text>
          <Text
            style={{
              color: 'rgba(15, 105, 241, 1)',
              textDecorationLine: 'underline',
            }}>
            Create an account
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    width: 500,
    height: 300,
    backgroundColor: 'blue',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'rgba(15, 105, 241, 0.08)',
    padding: 15,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: 400,
    backgroundColor: 'rgba(15, 105, 241, 0.08)',
  },
  backgroundImage: {
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: 450,
    height: 300,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 400, // Ensure it matches the width of your TextInput
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default LoginScreen;
