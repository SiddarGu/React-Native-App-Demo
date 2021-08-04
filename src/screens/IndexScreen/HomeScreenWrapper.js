import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';

// Third-party
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Snackbar, Text } from 'react-native-paper';

// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';
import HomeScreen from './HomeScreen';

const HomeStackNavigator = createStackNavigator();

export default function HomeScreenWrapper() {
  const { addPostStore } = useStores();
  const { translations } = useTranslation();
  const [headerLeft, setHeaderLeft] = useState(false);
  const [headerRight, setHeaderRight] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const { themeStore } = useStores();

  const LeftBtn = () => (
    <TouchableOpacity
      onPress={() => {
        setSearchBarVisible(!searchBarVisible);
      }}>
      <View style={styles.headerButton}>
        <Button
          color={themeStore.theme.colors.primary}
          icon={searchBarVisible ? 'arrow-left' : 'menu'}></Button>
      </View>
    </TouchableOpacity>
  );

  const RightBtn = () => (
    <TouchableOpacity
      onPress={() => {

        setSearchBarVisible(!searchBarVisible);
      }}>
      <View style={styles.headerButton}>
        <Button color={themeStore.theme.colors.primary} icon="magnify"></Button>
      </View>
    </TouchableOpacity>
  );

  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: themeStore.theme.colors.surface,
      }}>
      <LeftBtn></LeftBtn>

      {searchBarVisible ? (
        <TextInput
          placeholder={translations['search']}
          style={{
            borderRadius: 25,
            width: '65%',
            marginVertical: 5,
            height: 40,
          }}
        />
      ) : (
        <Text style={{fontSize: 20}}>App</Text>
      )}

      <RightBtn></RightBtn>
    </View>
  );

  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="AddPostMapScreen"
        component={HomeScreen}
        options={{
          /* headerTitle: 'App', */
          /* headerLeft: headerLeft,
          
          headerRight: rightBtn, */
          headerStyle: { flex: 1 },
          header: () => <Header />,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
