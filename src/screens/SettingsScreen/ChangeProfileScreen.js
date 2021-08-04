// React & React Native
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

// Third-party
import { observer } from 'mobx-react';
import {
  Divider,
  useTheme,
  Text,
  Title,
  Portal,
  Dialog,
  Button,
  Surface,
  Menu,
  ActivityIndicator,
  Paragraph,
  Snackbar,
} from 'react-native-paper';

import FastImage from 'react-native-fast-image';

// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';
import {
  isEmailValid,
  isDisplayNameValid,
  isPhoneValid,
} from '../../helpers/regexValidation';
// Constants
import { GENDER } from '../../constants/gender';
// Custom Components
import ThickDivider from '@components/ThickDivider';

/* TODOS: SUPPORT PROFILE PIC FEATURES */

export default ChangeProfileScreen = observer(({ navigation }) => {
  /******************
   * Initialization *
   ******************/
  const { translations } = useTranslation();
  const { colors, fonts } = useTheme();
  const themeTextColor = colors.text;
  const blankHeight = 10;
  const textPaddingLeft = 15;
  const themeMediumFontFamily = fonts.light.fontFamily;
  const themeMediumFontWeight = fonts.light.fontWeight;
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const originalUsername = '';
  const originalEmail = '';
  const originalGender = '';
  const originalPhone = '';
  const originalWeChat = '';
  const [username, setUsername] = useState(originalUsername);
  const [email, setEmail] = useState(originalEmail);
  const [gender, setGender] = useState(originalGender);
  const [phone, setPhone] = useState(originalPhone);
  const [weChat, setWeChat] = useState(originalWeChat);

  const [displayNameError, setDisplayNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [weChatError, setWeChatError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [menuVisible, setMenuVisible] = React.useState(false);

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const hideDialog = () => setDialogVisible(false);

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const hideSnackbar = () => setSnackbarVisible(false);

  /**************
   * components *
   **************/
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const weChatRef = useRef(null);

  const LoadingAlert = observer(() => (
    <Modal
      isVisible={submitIsLoading}
      onDismiss={() => {
        /* submitSuccess.current = true; */
        navigation.goBack();
      }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.loadingAlertContainer}>
      <ActivityIndicator animating={true} color={'orange'} size="large" />
    </Modal>
  ));

  const InvalidFieldAlert = () => (
    <View>
      <Portal>
        {/* TODOS: translation */}
        <Dialog visible={dialogVisible} onDismiss={() => {setDialogVisible(false); setErrMsg('')}}>
          <Dialog.Title>Error! Cannot Update Personal Information</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errMsg}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {setDialogVisible(false); setErrMsg('')}}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );

  const TabOptionText = observer(props => (
    <Title
      style={{
        fontWeight: fonts.regular.fontWeight,
        fontSize: 18,
        paddingLeft: textPaddingLeft,
      }}>
      {props.children}
    </Title>
  ));

  const TabActionText = observer(props => (
    <Title
      style={{
        fontWeight: fonts.regular.fontWeight,
        fontSize: 18,
      }}>
      {props.children}
    </Title>
  ));

  const unfocusAll = () => {
    usernameRef.current.blur();
    emailRef.current.blur();
    phoneRef.current.blur();
    weChatRef.current.blur();
  };

  const onSaved = async () => {
    try {
    // if user changed their info
    if (
      originalEmail !== email ||
      originalPhone !== phone ||
      originalWeChat !== weChat ||
      originalUsername !== username ||
      originalGender !== gender
    ) {
      // check if new info is valid
      if (
        isDisplayNameValid(username) &&
        isEmailValid(email) &&
        isPhoneValid(phone)
      ) {
        // update database
        setSubmitIsLoading(true);
        setDisplayNameError(false);
        setEmailError(false);
        setPhoneError(false);

        
        /* TODOS: translation */
        setSnackbarMessage('Information updated successfully.');
        setSnackbarVisible(true);
        setSubmitIsLoading(false);
      } else {
        if (!isDisplayNameValid(username)) {
          setErrMsg(errMsg + translations['username_requirements'] + '\n');
        }
        if (!isEmailValid(email)) {
          setErrMsg(errMsg + translations['auth/invalid-email'] + '\n');
        }
        if (!isPhoneValid(phone)) {
          setErrMsg(errMsg + translations['phone_requirements'] + '\n');
        }
        console.log(errMsg);
        setDialogVisible(true);
        // alert
      }
    } else {
      /* TODOS: translation */
      setSnackbarMessage('No info changed');
      setSnackbarVisible(true);
    }
  } catch (e) {
    console.log(e);
  }
  };

  return (
    <View style={styles.page}>
      <TouchableWithoutFeedback onPress={() => unfocusAll()}>
        <View style={styles.container}>
          <Surface>
            {/* profile photo TODOS: SUPPORT VIEWING && EDITING PHOTO */}
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  height: 120,
                }}>
                <TabOptionText>{translations['profile_photo']}</TabOptionText>
                <View style={styles.avatarWrapper}>
                  
                </View>
              </View>
            </TouchableOpacity>
            <ThickDivider style={styles.thickDivider} />

            {/* username */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => usernameRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['username']}
              </Title>
              <TextInput
                ref={usernameRef}
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={username}
                onChangeText={newValue => setUsername(newValue)}
              />
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />
            {/* email */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => emailRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['email']}
              </Title>
              <TextInput
                autoCompleteType="email"
                ref={emailRef}
                keyboardType="email-address"
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={email}
                onChangeText={newValue => setEmail(newValue)}
              />
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />

            {/* gender */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => {
                unfocusAll();
                setMenuVisible(true);
              }}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['gender']}
              </Title>

              <Menu
                style={{
                  color: themeTextColor,
                  marginRight: 15,
                }}
                contentStyle={{ color: themeTextColor }}
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Text style={{ marginRight: 15 }}>
                    {gender
                      ? translations[gender]
                      : translations[GENDER.PREFER_NOT_TO_SAY]}
                  </Text>
                }>
                {/* TODOS: translation */}
                <Menu.Item
                  onPress={() => {
                    gender === GENDER.MALE ? {} : setGender(GENDER.MALE);
                    setMenuVisible(false);
                  }}
                  title={translations[GENDER.MALE]}
                />
                <Menu.Item
                  onPress={() => {
                    gender === GENDER.FEMALE ? {} : setGender(GENDER.FEMALE);
                    setMenuVisible(false);
                  }}
                  title={translations[GENDER.FEMALE]}
                />
                <Menu.Item
                  onPress={() => {
                    gender === GENDER.OTHER ? {} : setGender(GENDER.OTHER);
                    setMenuVisible(false);
                  }}
                  title={translations[GENDER.OTHER]}
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    gender === GENDER.PREFER_NOT_TO_SAY
                      ? {}
                      : setGender(GENDER.PREFER_NOT_TO_SAY);
                    setMenuVisible(false);
                  }}
                  title={translations[GENDER.PREFER_NOT_TO_SAY]}
                />
              </Menu>
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />
            {/* phone */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => phoneRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['phone']}
              </Title>
              <TextInput
                maxLength={10}
                autoCompleteType="tel"
                ref={phoneRef}
                keyboardType="number-pad"
                returnKeyType="done"
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={phone}
                onChangeText={newValue => setPhone(newValue)}
              />
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />
            {/* wechat */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => weChatRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['wechat']}
              </Title>
              <TextInput
                ref={weChatRef}
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={weChat}
                onChangeText={newValue => setWeChat(newValue)}
              />
            </TouchableOpacity>
          </Surface>
          <Surface style={{ marginTop: blankHeight }}>
            <TouchableOpacity
              onPress={() => {
                onSaved();
                /* navigation.navigate('SettingsScreen'); */
              }}>
              <View style={styles.actionTab}>
                <TabActionText>{translations['save']}</TabActionText>
              </View>
            </TouchableOpacity>
          </Surface>
          <LoadingAlert />
          <InvalidFieldAlert />
        </View>
      </TouchableWithoutFeedback>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={2000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  optionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  avatarWrapper: {
    marginRight: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  descriptionInputWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
  },
  descriptionInput: {
    flexDirection: 'row',
    fontSize: 16,
  },
  actionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 50,
  },
  loadingAlertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
