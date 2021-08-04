import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { Text, TextInput, HelperText, Button } from 'react-native-paper';

import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';
import {isEmailValid} from '../../helpers/regexValidation';

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

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);

  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  // handling actions when pressing the 'sign in' button
  const signInHandler = async () => {
    setSubmitIsLoading(true);

    

    if (isEmailValid(email)) {
      const res = await userStore.signin(email, password);
      if (res) {
        setPasswordError(true);
      }
    } else {
      setEmailError(true);
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
          label={translations['email']}
          value={email}
          onChangeText={email => setEmail(email)}
          onFocus={() => {
            setEmailError(false);
          }}
          error={emailError}
        />
        <HelperText type="error" visible={emailError} style={styles.helperText}>
          {translations['please_enter_correct_email']}
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
        <HelperText
          type="error"
          visible={passwordError}
          style={styles.helperText}>
          {translations['email_password_not_recognized']}
        </HelperText>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Button
            mode="contained"
            loading={submitIsLoading}
            onPress={signInHandler}>
            {translations['login']}
          </Button>
          <Button style={{ paddingTop: 15 }}>
            {' '}
            {translations['forgot_password']}{' '}
          </Button>

          {/* // todo move to other folder */}
          <Button onPress={() => navigation.navigate('Index')}>Test</Button>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text> {translations['dont_have_account']} </Text>
          <Button onPress={() => navigation.navigate('SignUp')}>
            {' '}
            {translations['signup']}{' '}
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
