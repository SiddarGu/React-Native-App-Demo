import firestore from '@react-native-firebase/firestore';

/* Usage: 
  import { updateLocation } from '../../helpers/firebase/update';
  const onSaved = async () => {
    await updateLocation({
      uid: userStore.userId,
      address: address,
      city: city,
      country: country,
      geoPoint: currentLocation,
      state: state,
      zipcode: zipcode,
    });};
  onSaved();
 */

/**
 * Update user profile in database
 *
 * @params
 * uid
 * displayName (optional)
 * email (optional)
 * gender (optional)
 * phone (optional)
 * photoURL (optional)
 * photoPath (optional)
 * weChat (optional)
 */
const updateProfile = async ({
  displayName,
  email,
  gender,
  phone,
  photoURL,
  photoPath,
  uid,
  weChat,
}) => {
  if (uid) {
    try {
      const doc = firestore().collection('Profiles').doc(uid);
      if (doc) {
        let obj = Object.assign(
          {},
          displayName === undefined ? null : { displayName },
          email === undefined ? null : { email },
          gender === undefined ? null : { gender },
          phone === undefined ? null : { phone },
          photoPath === undefined ? null : { photoPath },
          photoURL === undefined ? null : { photoURL },
          weChat === undefined ? null : { weChat },
        );
        await doc.update(obj);
      } else {
        console.log('doc not found!');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('uid not found');
  }
};

/**
 * Update user contact in database
 *
 * @params
 * uid
 * email (optional)
 * phone (optional)
 * weChat (optional)
 */

const updateContact = async ({ email, phone, weChat, uid }) => {
  if (uid) {
    try {
      const doc = firestore().collection('Contacts').doc(uid);
      if (doc) {
        let obj = Object.assign(
          {},
          email === undefined ? null : { email },
          phone === undefined ? null : { phone },
          weChat === undefined ? null : { weChat },
        );
        await doc.update(obj);
      } else {
        console.log('doc not found!');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('uid not found');
  }
};

/**
 * Add a user and the most recent message to a group
 *
 * @params
 * uid
 * user
 * recentMessage (optional)
 */

const updateGroup = async ({ recentMessage, uid, user }) => {
  if (uid) {
    try {
      const doc = firestore().collection('Groups').doc(uid);
      if (doc) {
        let obj = Object.assign(
          {},
          recentMessage === undefined ? null : { recentMessage },
        );
        if (user) {
          obj.users = firestore.FieldValue.arrayUnion(user);
        }
        await doc.update(obj);
      } else {
        console.log('doc not found!');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('uid not found');
  }
};

/**
 * Update user location in database
 *
 * @params
 * uid
 * address (optional)
 * city (optional)
 * country (optional)
 * geoPoint (optional)
 * state (optional)
 * zipcode (optional)
 */
const updateLocation = async ({
  address,
  city,
  country,
  geoPoint,
  state,
  zipcode,
  uid,
}) => {
  if (uid) {
    try {
      const doc = firestore().collection('Locations').doc(uid);
      if (doc) {
        // change geocode from (long, lat) to (lat, long) for firestore
        const geoCode = new firestore.GeoPoint(geoPoint[1], geoPoint[0]);
        let obj = Object.assign(
          {},
          address === undefined ? null : { address },
          city === undefined ? null : { city },
          country === undefined ? null : { country },
          geoCode === undefined ? null : { geoCode },
          state === undefined ? null : { state },
          zipcode === undefined ? null : { zipcode },
        );
        await doc.update(obj);
      } else {
        console.log('doc not found!');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('uid not found');
  }
};

export { updateProfile, updateContact, updateGroup, updateLocation };