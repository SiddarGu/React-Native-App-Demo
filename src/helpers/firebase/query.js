import firestore from '@react-native-firebase/firestore';

/* Usage: 
  import { queryProfile } from '../../helpers/firebase/update';
  const profile = await queryLocation({ userUID: 'test' });
  const phone = profile.country;
  console.log(phone);
 */

/**
 * @params
 * userUID
 * 
 * @returns undefined | 
 * {
 *  displayName:  string
 *  email:        string
 *  gemder:       string
 *  phone:        string
 *  photoPath:    string
 *  photoURL:     string
 *  uid:          string
 *  weChat:       string
 * }
 */
const queryProfile = async ({ userUID }) => {
  try {
    const profileResponse = await firestore()
      .collection('Profiles')
      .doc(userUID)
      .get();
    
    /* 
    profile used to be a reference in user collection
    const profile = userResponse.data().profile;
    const profileRes = await profile.get(); */
    return profileResponse.data();
  } catch (err) {
    console.log(err);
  }
};

/**
 * @params
 * userUID
 * 
 * @returns undefined | DocumentSnapshot < T > 
 *  A DocumentSnapshot contains a collection of browsing, which can be accessed by
 *    userResponse.collection('browsing');
 *  and several fields, including
 *    createdAt:    Timestamp (https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp)
 *    lastUpdated:  Timestamp
 *    uid:          string
 *  which can be accessed by 
 *  userResponse.data().{field};
 */
 const queryUser = async ({ userUID }) => {
  try {
    const userResponse = await firestore()
      .collection('Users')
      .doc(userUID)
      .get();
    
    return userResponse;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @params
 * userUID
 * 
 * @returns undefined | 
 * {
 *  address:  string
 *  city:     string
 *  country:  string
 *  geoCode:  GeoPoint (https://firebase.google.com/docs/reference/js/firebase.firestore.GeoPoint)
 *  state:    string
 *  uid:      string
 *  zipcode:  string
 * }
 */
const queryLocation = async ({ userUID }) => {
  try {
    const locationResponse = await firestore()
      .collection('Locations')
      .doc(userUID)
      .get();
    return locationResponse.data();
  } catch (err) {
    console.log(err);
  }
};

/**
 * @params
 * userUID
 * 
 * @returns undefined | 
 * {
 *  email:  string
 *  phone:  string
 *  uid:    string
 *  weChat: string
 * }
 */
const queryContact = async ({ userUID }) => {
  try {
    const contactResponse = await firestore()
      .collection('Contacts')
      .doc(userUID)
      .get();
    return contactResponse.data();
  } catch (err) {
    console.log(err);
  }
};

/**
 * warning: depreciated due to database structure change
 * @params
 * userUID
 * 
 * @returns undefined | 
 * [{
 *  field:  string
 *  ...
 * },
 * ...]
 */
const queryGroups = async ({ userUID }) => {
  try {
    groupArr = [];
    const userResponse = await firestore()
      .collection('Users')
      .doc(userUID)
      .get();
    // array of group refereces
    const groups = userResponse.data().groups;
    // get for every group in Users table

    for (var i = 0; i < groups.length; i++) {
      const currentGroup = groups[i];
      const currentGroupResponse = await currentGroup.get();
      const messages = await currentGroup.collection('Messages');
      groupArr.push({
        ...currentGroupResponse.data(),
        messages: messages,
      });
    }

    return groupArr;
  } catch (err) {
    console.log(err);
  }
};

export {
  queryProfile,
  queryLocation,
  queryContact,
  queryUser
};
