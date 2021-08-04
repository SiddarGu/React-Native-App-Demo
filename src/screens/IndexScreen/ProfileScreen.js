import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  Text,
  Avatar,
  ActivityIndicator,
  Subheading,
  Title,
  Surface,
  Divider,
  useTheme,
} from 'react-native-paper';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import ThickDivider from '@components/ThickDivider';
import ThemedIcon from '@components/ThemedIcon';
import { useTranslation } from '@composables/useTranslation';

export default ProfileScreen = observer(({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { translations } = useTranslation();
  const { fonts } = useTheme();

  const blankHeight = 10;
  const iconSize = 22;
  const iconHorizontalPadding = 14;
  const dividerMarginLeft = 10;

  const TabOptionText = props => (
    <Title style={{ fontWeight: fonts.regular.fontWeight, fontSize: 18 }}>
      {props.children}
    </Title>
  );

  const TabIcon = ({ name }) => (
    <ThemedIcon
      mode="Ionicon"
      size={iconSize}
      name={name}
      padding={iconHorizontalPadding}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar And Display Name And Email Section */}
      <View style={styles.topWrapper}>
        <Surface style={[styles.topSurface, { paddingTop: insets.top }]}>
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <FastImage style={styles.avatar} />
          </View>
          {/* End Avatar */}

          {/* Person Display Info */}
          <View style={styles.personDisplayInfoWrapper}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{'Sample Name'}</Text>
            <Text style={{ fontSize: 16 }}>{'email@gmail.com'}</Text>
          </View>
          {/* End Person Display Info */}
        </Surface>
      </View>
      {/* End Avatar And Display Name And Email Section */}

      <View style={styles.bottomWrapper}>
        {/* Post Related */}
        <Surface style={{ marginTop: blankHeight }}>
          {/* My Posts */}
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.optionTab}>
              <View style={styles.optionTabLeft}>
                <TabIcon name="document-text-outline" />
                <TabOptionText>{translations['my_posts']}</TabOptionText>
              </View>
              <TabIcon name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
          {/* End My Posts */}
          <ThickDivider style={{ marginHorizontal: dividerMarginLeft }} />
          {/* My Likes */}
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.optionTab}>
              <View style={styles.optionTabLeft}>
                <TabIcon name="heart-outline" />
                <TabOptionText>{translations['my_likes']}</TabOptionText>
              </View>
              <TabIcon name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
          {/* End My Likes */}
        </Surface>
        <Surface style={{ marginTop: blankHeight }}>
          {/* Browse History */}
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.optionTab}>
              <View style={styles.optionTabLeft}>
                <TabIcon name="timer-outline" />
                <TabOptionText>
                  {translations['browsing_history']}
                </TabOptionText>
              </View>
              <TabIcon name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
          {/* End Browse History */}
          <ThickDivider style={{ marginHorizontal: dividerMarginLeft }} />
          {/* Settings */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsNavigator')}>
            <View style={styles.optionTab}>
              <View style={styles.optionTabLeft}>
                <TabIcon name="settings-outline" />
                <TabOptionText>{translations['settings']}</TabOptionText>
              </View>
              <TabIcon name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
          {/* End Settings */}
          <ThickDivider style={{ marginHorizontal: dividerMarginLeft }} />
        </Surface>
        {/* End Post Related */}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Layout
  topWrapper: {
    flex: 3,
  },
  bottomWrapper: {
    flex: 7,
  },
  // End Layout

  // Top Wrapper
  topSurface: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarWrapper: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ! avatar size? margin?
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f7a440',
  },
  personDisplayInfoWrapper: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  // End Top Wrapper

  // Bottom Wrapper
  optionTab: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  optionTabLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
});
