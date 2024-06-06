import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [error, setError] = useState('');
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }
}, [error]);

  const signIn = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in');
    } catch (error) {
      console.error(error);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created');
    } catch (error) {
      console.error(error);
      setError('Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent');
    } catch (error) {
      console.error(error);
      setError('Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        {/* <Image source={require('../../gym-tracker-logo')} style={{ width: 100, height: 100, alignSelf: 'center' }} /> */}
        <Text style={styles.title}>
            {mode === 'login' && 'Sign In'}
            {mode === 'signup' && 'Sign Up'}
            {mode === 'forgotPassword' && 'Forgot Password'}
        </Text>
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
        />
        {(mode === 'login' || mode === 'signup') && (
            <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#888"
            secureTextEntry
            />
        )}
        {mode === 'login' && (
            <TouchableOpacity onPress={() => setMode('forgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.continueButton} onPress={mode === 'signup' ? signUp : mode === 'login' ? signIn : forgotPassword}>
            <Text style={styles.continueButtonText}>
            {mode === 'signup' && 'Sign Up'}
            {mode === 'login' && 'Continue'}
            {mode === 'forgotPassword' && 'Send Reset Email'}
            </Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
            <Text>
            {mode === 'signup' ? 'Already have an account? ' : mode === 'login' ? "Don't have an account? " : 'Remembered your password? '}
            </Text>
            <TouchableOpacity onPress={() => setMode(mode === 'signup' || mode === 'forgotPassword' ? 'login' : 'signup')}>
            <Text style={styles.signupText}>
                {mode === 'signup' ? 'Sign In' : mode === 'login' ? 'Create Account' : 'Sign In'}
            </Text>
            </TouchableOpacity>
        </View>
        {/* {mode === 'login' && (
            <>
            <Text style={styles.orText}>Or</Text>
            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity>
                <FontAwesome name="google" size={24} color="black" style={styles.socialButtonIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesome name="apple" size={24} color="black" style={styles.socialButtonIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesome name="facebook" size={24} color="black" style={styles.socialButtonIcon} />
                </TouchableOpacity>
            </View>
            </>
        )} */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  continueButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  signupText: {
    color: '#6A1B9A',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#6A1B9A',
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  socialButtonIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default Login;
