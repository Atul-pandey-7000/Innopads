
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await AsyncStorage.setItem('userData', JSON.stringify({ email, password }));
      Alert.alert('Success', 'Account created successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.error('Error saving data', error);
      Alert.alert('Error', 'Failed to create an account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container2}>
          <ImageBackground
            source={require('../assets/images/backimages.jpg')}
            style={styles.backgroundImage}
          >
            <View
              style={{
                width: 380,
                height: 200,
                marginRight: 20,
                marginTop: 200,
              }}
            >
              <Text style={{ fontSize: 30, color: 'black' }}>Welcome!</Text>
              <Text style={{ fontSize: 17, color: 'gray', marginLeft: 5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit pharetra
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={require('../assets/images/eye.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={require('../assets/images/eye.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginRedirect}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginRedirectText}>
            <Text style={{ color: 'gray' }}>Already have an account? </Text>
            <Text style={styles.loginRedirectLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  container2: {
    width: 450,
    height: 280,
    backgroundColor: 'blue',
  },
  backgroundImage: {
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: 450,
    height: 280,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(15, 105, 241, 0.08)',
    borderRadius: 10,
    marginBottom: 20,
    width: 400,
    backgroundColor: 'rgba(15, 105, 241, 0.08)',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 20,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
  signupButton: {
    width: 400,
    height: 75,
    backgroundColor: '#0F69F1',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 46,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 75,
  },
  loginRedirect: {
    width: 500,
    height: 75,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 45,
  },
  loginRedirectText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 30,
  },
  loginRedirectLink: {
    color: 'rgba(15, 105, 241, 1)',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;

