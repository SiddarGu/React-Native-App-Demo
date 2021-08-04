import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Avatar, Text, Button, Snackbar } from 'react-native-paper';
// import firebase

// import { default as theme } from "./custom-theme.json"; // <-- Import app theme


import { observer } from 'mobx-react';
import FabOverlay from '../HomeScreen/FabOverlay';
import { useStores } from '../../stores';
import ThickDivider from '../../components/ThickDivider';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    content:
      "She was in a hurry. Not the standard hurry when you're in a rush to get someplace, \
    but a frantic hurry. The type of hurry where a few seconds could mean life or death. \
    She raced down the road ignoring speed limits and weaving between cars. \
    She was only a few minutes away when traffic came to a dead standstill on the road ahead.",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    content:
      'Her eyebrows were a shade darker than her hair. They were thick and almost horizontal, \
    emphasizing the depth of her eyes. She was rather handsome than beautiful. Her face was captivating \
    by reason of a certain frankness of expression and a contradictory subtle play of features. \
    Her manner was engaging.',
  },
  {
    id: '323dse-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Third Item',
    content:
      "Sometimes it's the first moment of the day that catches you off guard. That's \
    what Wendy was thinking. She opened her window to see fire engines screeching down the street. \
    While this wasn't something completely unheard of, it also wasn't normal. It was a sure \
    sign of what was going to happen that day. She could feel it in \
    her bones and it wasn't the way she wanted the day to begin.",
  },
];

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const { themeStore } = useStores();
  const [refreshing, setRefreshing] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const timeout = async delay => {
    return new Promise(res => setTimeout(res, delay));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    timeout(2000).then(() => {
      setRefreshing(false);
      setSnackbarVisible(true);
    });
  }, []);

  const Card = observer(({ title, content }) => {
    const [isLiked, toggleLike] = React.useState(false);
    const [isCommented, toggleCommented] = React.useState(false);
    const [isShared, toggleShared] = React.useState(false);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 20,
          backgroundColor: themeStore.theme.colors.surface,
          height: 300,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 10,
          }}>
          {/* Avatar */}
          <Avatar.Text
            size={50}
            label="XD"
            style={{ backgroundColor: themeStore.theme.colors.primary }}
          />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            {/* Username */}
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Firstname Lastname
            </Text>
            {/* User status */}
            <Text style={{ fontSize: 15 }}>Status</Text>
          </View>
        </View>

        {/* Title and content */}
        <Text style={{ marginHorizontal: 10 }}>{title}</Text>
        <Text style={{ marginHorizontal: 10 }}>{content}</Text>
        {/* Like and comment buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Button
            color={themeStore.theme.colors.primary}
            icon={isLiked ? 'heart' : 'heart-outline'}
            onPress={() => toggleLike(!isLiked)}>
            like
          </Button>
          <Button
            color={themeStore.theme.colors.primary}
            icon={isCommented ? 'comment' : 'comment-outline'}
            onPress={() => toggleCommented(!isCommented)}>
            comment
          </Button>
          <Button
            color={themeStore.theme.colors.primary}
            icon={isShared ? 'share' : 'share-outline'}
            onPress={() => toggleShared(!isShared)}>
            share
          </Button>
        </View>
      </View>
    );
  });

  const renderItem = ({ item }) => (
    <Card title={item.title} content={item.content} />
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: top }}>
      <ThickDivider />
      <FlatList
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#ffffff'}
            colors={['#f7a440']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <FabOverlay />
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
        Refresh completed!
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
