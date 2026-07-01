import { Platform } from "react-native";
import {
  PERMISSIONS,
  RESULTS,
  request,
  check,
} from "react-native-permissions";

export const requestGalleryPermission = async () => {
  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  let status = await check(permission);

  if (status !== RESULTS.GRANTED && status !== RESULTS.LIMITED) {
    status = await request(permission);
  }

  return (
    status === RESULTS.GRANTED ||
    status === RESULTS.LIMITED
  );
};

export const requestCameraPermission = async () => {
  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;

  let status = await check(permission);

  if (status !== RESULTS.GRANTED) {
    status = await request(permission);
  }

  return status === RESULTS.GRANTED;
};