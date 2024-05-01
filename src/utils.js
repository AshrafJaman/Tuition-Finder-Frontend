import { storage } from './Component/FirebaseConfig';
import { API_URL } from './constants';

export const handleUploadingImg = async (imageFile) => {
  try {
    const imgRef = storage.ref(`images/${imageFile.name}`);
    const uploadTaskSnapshot = await imgRef.put(imageFile);
    const url = await uploadTaskSnapshot.ref.getDownloadURL();
    return url;
  } catch (error) {
    throw error;
  }
};

export async function getUserByUIDFromDB(uid) {
  try {
    const res = await fetch(`${API_URL}/userbyuid/${uid}`);

    const userObj = await res.json();

    return {
      status: true,
      data: { ...userObj.user },
      message: '',
    };
  } catch (error) {
    return {
      status: false,
      message: 'Something went wrong',
      data: null,
    };
  }
}

export async function getUserByIdFromDB(uid) {
  try {
    const res = await fetch(`${API_URL}/user/${uid}`);

    const userObj = await res.json();

    return {
      status: true,
      data: { ...userObj.user },
      message: '',
    };
  } catch (error) {
    return {
      status: false,
      message: 'Something went wrong',
      data: null,
    };
  }
}
