import { queryProfile } from './queryData';
import firestore from '@react-native-firebase/firestore';

const parseMessageDoc = async ({ data }) => {
  try {
    const id = data.uid;
    const text = data.text;
    const time = data.createdAt.toDate(); // javascript date object
    const userId = data.user.get(uid);
    // for getting user profile
    const profile = await queryProfile({ userUID: userId });
    const photoURL = profile.photoURL;
    const username = profile.displayName;

    return {
      _id: id,
      text: text,
      createdAt: time,
      user: {
        _id: userId,
        name: username,
        avatar: photoURL,
      },
    };
  } catch (err) {
    console.log(err.code);
  }
};

const parseGiftedChat = async ({ data }) => {
  const id = data._id;
  const text = data.text;
  const createdAt = firestore.Timestamp.fromDate(data.createdAt);
  const user = {
    uid: data.user._id,
  };
  return {
    createdAt,
    text,
    id,
    user,
  };
};

export { parseMessageDoc, parseGiftedChat };
