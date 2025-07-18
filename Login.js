import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { auth } from '../config/firebase';
import { colors } from '../config/constants';
import backImage from '../assets/IMG_9E0772286356-1.jpeg';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
        </TouchableOpacity>
        <View
          style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}
        >
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
            Don&apos;t have an account? &nbsp;
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={{ color: colors.pink, fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
  },
  title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: "center",
      paddingBottom: 10,
  },
  input: {
      backgroundColor: "#E7E7E7",
      height: 58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding: 12,
  },
  backImage: {
      width: "100%",
      height: 520,
      position: "absolute",
      top: 0,
      resizeMode: 'cover',
  },
/*  eyeIcon: {
      position: 'absolute',
      right: 10,
      top: 53
    },*/
  whiteSheet: {
      width: '100%',
      height: '65%',
      position: "absolute",
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,

  },
  form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
      marginTop: 300
  },
  button: {
      backgroundColor: 'black',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
  },
});

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};
