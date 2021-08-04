// React & React Native
import React, { useRef, useState, useEffect } from 'react';
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


// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';
import { updateLocation } from '../../helpers/firebase/update';
import { isZipcodeValid } from '../../helpers/regexValidation';

// Constants
import { COUNTRY } from '../../constants/country';
// Custom Components
import ThickDivider from '@components/ThickDivider';

// ENV


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

  // prevent rendering the map when getting user location aysnchronously
  const isMounted = useRef();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const originalAddress = '';
  const originalCity = '';
  const originalCountry = '';
  const originalState = '';
  const originalZipcode = '';
  const [address, setAddress] = useState(originalAddress);
  const [city, setCity] = useState(originalCity);
  const [country, setCountry] = useState(originalCountry);
  const [state, setState] = useState(originalState);
  const [zipcode, setZipcode] = useState(originalZipcode);

  const [zipcodeError, setZipcodeError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [menuVisible, setMenuVisible] = React.useState(false);

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const hideDialog = () => setDialogVisible(false);

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const hideSnackbar = () => setSnackbarVisible(false);

  const [confirmLocationDialogVisible, setConfirmLocationDialogVisible] =
    React.useState(false);

  const [currentLocation, setCurrentLocation] = useState([
    -76.61219, 39.290386,
  ]);

  /* Forward Geocode */
  /* Example return: [
  {
    address: '4701',
    center: [-76.934262, 38.96818],
    context: [[Object], [Object], [Object], [Object], [Object], [Object], [Object]],
    geometry: { coordinates: [Array], type: 'Point' },
    id: 'address.8154258840767442',
    place_name:
      '4701 Underwood Street, Riverdale, Maryland 20737, United States',
    place_type: ['address'],
    properties: { accuracy: 'parcel' },
    relevance: 1,
    text: 'Underwood Street',
    type: 'Feature',
  },
  {
    bbox: [-76.931763, 38.953001, -76.89155, 38.976492],
    center: [-76.9085, 38.959],
    context: [[Object], [Object], [Object], [Object], [Object]],
    geometry: { coordinates: [Array], type: 'Point' },
    id: 'neighborhood.270483',
    place_name: 'East Riverdale, Riverdale, Maryland 20737, United States',
    place_type: ['neighborhood'],
    properties: {},
    relevance: 0.701003,
    text: 'East Riverdale',
    type: 'Feature',
  },];
 */
  const initialLocation = async (address, city, state, zipcode) => {
    setSubmitIsLoading(true);
    const location = address + ' ' + city + ' ' + state + ' ' + zipcode;
    const locationResponse = await forwardGeocde({
      query: location,
    });
    setCurrentLocation(locationResponse[0].center);

    if (isMounted.current) setSubmitIsLoading(false);
  };

  /**************
   * components *
   **************/
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipcodeRef = useRef(null);

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
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Error! Cannot Update Personal Information</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{translations['zipcode_requirements']}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );

  const TabActionText = observer(props => (
    <Title
      style={{
        fontWeight: fonts.regular.fontWeight,
        fontSize: 18,
      }}>
      {props.children}
    </Title>
  ));

  // unfocus textinputs when tabbing away from the page
  const unfocusAll = () => {
    addressRef.current.blur();
    stateRef.current.blur();
    cityRef.current.blur();
    zipcodeRef.current.blur();
  };

  // handle data when user confirms location
  const onSaved = async () => {
    // dismiss the confirmation dialog
    setConfirmLocationDialogVisible(false);

    setSubmitIsLoading(true);
    setZipcodeError(false);

    // populate the data
    setSubmitIsLoading(false);
    setSnackbarMessage('Information updated successfully.');
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.page}>
      <TouchableWithoutFeedback onPress={() => unfocusAll()}>
        <View style={styles.container}>
          <Surface>
            {/* address */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => addressRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['address']}
              </Title>
              <TextInput
                autoCompleteType="street-address"
                ref={addressRef}
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={address}
                onChangeText={newValue => setAddress(newValue)}
              />
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />
            {/* city */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => cityRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['city']}
              </Title>
              <TextInput
                ref={cityRef}
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={city}
                onChangeText={newValue => setCity(newValue)}
              />
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />

            {/* country */}
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
                {translations['country']}
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
                    {translations[COUNTRY.US]}
                  </Text>
                }>
                <Menu.Item
                  onPress={() => {
                    country === COUNTRY.US ? {} : setCountry(COUNTRY.US);
                    setMenuVisible(false);
                  }}
                  title={translations[COUNTRY.US]}
                />
              </Menu>
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />
            {/* state */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => stateRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['state']}
              </Title>
              <TextInput
                ref={stateRef}
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={state}
                onChangeText={newValue => setState(newValue)}
              />
            </TouchableOpacity>

            <ThickDivider style={styles.thickDivider} />
            {/* zipcode */}
            <TouchableOpacity
              style={styles.optionTab}
              onPress={() => zipcodeRef.current.focus()}>
              <Title
                style={{
                  fontWeight: fonts.regular.fontWeight,
                  fontSize: 18,
                  paddingLeft: textPaddingLeft,
                }}>
                {translations['zipcode']}
              </Title>
              <TextInput
                maxLength={5}
                autoCompleteType="postal-code"
                ref={zipcodeRef}
                keyboardType="numeric"
                style={[
                  {
                    color: themeTextColor,
                    fontFamily: themeMediumFontFamily,
                    fontWeight: themeMediumFontWeight,
                    marginRight: 15,
                  },
                  styles.descriptionInput,
                ]}
                value={zipcode}
                onChangeText={newValue => setZipcode(newValue)}
              />
            </TouchableOpacity>
          </Surface>

          {/* Save Button */}
          <Surface style={{ marginTop: blankHeight }}>
            <TouchableOpacity
              onPress={() => {
                
                if (isZipcodeValid(zipcode)) {
                  // if the zipcode is valid
                  if (
                    zipcode !== originalZipcode ||
                    address !== originalAddress ||
                    city !== originalCity ||
                    state !== originalState ||
                    country !== originalCountry
                  ) {
                    // if any of the fields have changed, initialize user location and show the confirmation dialog
                    initialLocation(address, city, state, zipcode);
                    setConfirmLocationDialogVisible(true);
                  } else {
                    // otherwise reminds the user that no field has changed
                    setSnackbarMessage('No info changed');
                    setSnackbarVisible(true);
                  }
                } else {
                  // if the zipcode is invalid, show the error dialog
                  setZipcodeError(true);
                  setDialogVisible(true);
                }
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
