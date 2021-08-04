// React & React Native
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

// Third-party
import { observer } from 'mobx-react';
import {
  Divider,
  useTheme,
  Title,
  Subheading,
  Portal,
  Dialog,
  Button,
  Surface,
  Switch,
} from 'react-native-paper';

// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';

// Constants

// Custom Components
import ThickDivider from '@components/ThickDivider';
import ThemedIcon from '@components/ThemedIcon';
import CustomAlert from '@components/CustomAlert';

export default SettingsScreen = ({navigation}) => {
  /******************
   * Initialization *
   ******************/
  const { themeStore } = useStores();
  const { translations } = useTranslation();
  const { fonts } = useTheme();

  const blankHeight = 10;
  const iconSize = 22;
  const iconHorizontalPadding = 14;
  const textPaddingLeft = 14;
  const dividerMarginLeft = textPaddingLeft;

  /**************
   * components *
   **************/
  const TabOptionText = props => (
    <Title
      style={{
        fontWeight: fonts.regular.fontWeight,
        fontSize: 18,
        paddingLeft: textPaddingLeft,
      }}>
      {props.children}
    </Title>
  );

  const TabActionText = props => (
    <Title
      style={{
        fontWeight: fonts.regular.fontWeight,
        fontSize: 18,
      }}>
      {props.children}
    </Title>
  );

  const TabRightIcon = () => (
    <ThemedIcon
      mode="Ionicon"
      size={iconSize}
      name="chevron-forward-outline"
      padding={iconHorizontalPadding}
    />
  );

  const onToggleSwitch = () => themeStore.toggleTheme();
  const ThemeSwitch = observer(() => (
    <View style={{ paddingRight: iconHorizontalPadding }}>
      <Switch value={themeStore.isDarkTheme} onValueChange={onToggleSwitch} />
    </View>
  ));

  const [alertIsVisible, setAlertIsVisible] = useState(false);
  const SignOutAlert = () => (
    <CustomAlert
      isVisible={alertIsVisible}
      onBackdropPress={() => setAlertIsVisible(false)}
      onBackButtonPress={() => setAlertIsVisible(false)}
      title={translations['confirm_signout']}
      leftBtnText={translations['yes']}
      leftBtnOnPress={() => {
        setAlertIsVisible(false);
      }}
      rightBtnText={translations['no']}
      rightBtnOnPress={() => {
        setAlertIsVisible(false);
      }}
    />
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Surface>
          {/* Change Personal Info */}
          <TouchableOpacity onPress={() => navigation.navigate('ChangeProfileScreen')}>
            <View style={styles.optionTab}>
              <TabOptionText>
                {translations['personal_info']}
              </TabOptionText>
              <TabRightIcon />
            </View>
          </TouchableOpacity>
          {/* End Change Personal Info */}

          <ThickDivider style={{ marginHorizontal: dividerMarginLeft }} />
          {/* Change Location*/}
          <TouchableOpacity onPress={() => navigation.navigate('ChangeLocationScreen')}>
            <View style={styles.optionTab}>
              <TabOptionText>{translations['location']}</TabOptionText>
              <TabRightIcon />
            </View>
          </TouchableOpacity>
          {/* End Change Location */}
        </Surface>

        <Surface style={{ marginTop: blankHeight }}>
          <View style={styles.optionTab}>
            <TabOptionText>{translations['dark_theme']}</TabOptionText>
            <ThemeSwitch />
          </View>
        </Surface>

        <Surface style={{ marginTop: blankHeight }}>
          <TouchableOpacity onPress={() => navigation.navigate('AccountNavigator', {screen: 'SignIn'})}>
            <View style={styles.actionTab}>
              <TabActionText>{translations['signout']}</TabActionText>
            </View>
          </TouchableOpacity>
        </Surface>
      </ScrollView>
      <SignOutAlert />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionTab: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  actionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
});
