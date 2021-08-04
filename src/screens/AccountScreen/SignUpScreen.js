import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { Text, TextInput, HelperText, Button } from 'react-native-paper';

import { useStores } from '../../stores';
import { useTranslation } from '@composables/useTranslation';
import {
  isEmailValid,
  isDisplayNameValid,
  isPasswordValid
} from '../../helpers/regexValidation';

export default function SignUpScreen({ navigation }) {
  const { userStore } = useStores();
  const { translations } = useTranslation();
  const isMounted = useRef();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const pleaseEnterCorrectEmail = translations['please_enter_correct_email'];
  const [emailErrorText, setEmailErrorText] = useState(pleaseEnterCorrectEmail);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);

  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  // handling actions when pressing the 'sign in' button
  const signUpHandler = async () => {
    setSubmitIsLoading(true);
    if (isDisplayNameValid(displayName) && isEmailValid(email) && isPasswordValid(password)) {
      const res = await userStore.signup(email, password, displayName);
      // response is now only error rn
      if (res) {
        //TODO: handle signouterror messages
        setEmailErrorText(translations['unknown_error']);
        setEmailError(true);
      }
    } else {
      if (!isDisplayNameValid(displayName)) {
        setDisplayNameError(true);
      }
      if (!isEmailValid(email)) {
        setEmailError(true);
      }
      if (!isPasswordValid(password)) {
        setPasswordError(true);
      }
    }
    if (isMounted.current) setSubmitIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignContent: 'stretch',
          flex: 1,
          marginTop: 20,
        }}>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label={translations['username']}
          value={displayName}
          onChangeText={displayName => setDisplayName(displayName)}
          onFocus={() => setDisplayNameError(false)}
          error={displayNameError}
        />
        {!displayNameError ? (
          <HelperText type="info" style={styles.helperText}>
            {translations['username_requirements']}
          </HelperText>
        ) : (
          <HelperText type="error" style={styles.helperText}>
            {translations['username_error']}
          </HelperText>
        )}

        <TextInput
          style={styles.textInput}
          mode="outlined"
          label={translations['email']}
          value={email}
          onChangeText={email => setEmail(email)}
          onFocus={() => {
            setEmailError(false);
            setEmailErrorText(translations['please_enter_correct_email']);
          }}
          error={emailError}
        />
        <HelperText type="error" visible={emailError} style={styles.helperText}>
          {emailErrorText}
        </HelperText>

        <TextInput
          style={styles.textInput}
          mode="outlined"
          label={translations['password']}
          secureTextEntry={passwordHide}
          value={password}
          right={
            <TextInput.Icon
              name={passwordHide ? 'eye-off' : 'eye'}
              onPress={() => setPasswordHide(!passwordHide)}
            />
          }
          onChangeText={password => setPassword(password)}
          onFocus={() => setPasswordError(false)}
          error={passwordError}
        />
        {!passwordError ? (
          <HelperText type="info" style={styles.helperText}>
            {translations['password_requirements']}
          </HelperText>
        ) : (
          <HelperText type="error" style={styles.helperText}>
            {translations['password_error']}
          </HelperText>
        )}

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Button
            mode="contained"
            loading={submitIsLoading}
            onPress={signUpHandler}>
            {translations['signup']}
          </Button>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text> {translations['already_have_account']} </Text>
          <Button onPress={() => navigation.navigate('SignIn')}>
            {' '}
            {translations['login']}{' '}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginHorizontal: 40,
  },

  helperText: {
    marginHorizontal: 40,
    marginBottom: 10,
  },
});
