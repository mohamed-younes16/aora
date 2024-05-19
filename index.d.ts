import { DocumentPickerAsset } from "expo-document-picker";

export type SignUpData = {
  password: string;
  email: string;
  username: string;
};

export type VideoInput = {
  title: string;
  videoUrl: DocumentPickerAsset | null;
  thumbnail: DocumentPickerAsset | null;
  prompt: string;
  userId:string
};
export type UserDocument = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[]; // You can replace 'any' with the actual type of permissions if known
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
};
export type VideoObject = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    username: string;
  };
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
};
