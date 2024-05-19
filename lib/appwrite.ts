import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Models,
  Query,
  Storage,
} from "react-native-appwrite/src";
import { SignUpData, VideoInput } from "..";
import { DocumentPickerAsset } from "expo-document-picker";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.younes.aora",
  projectId: "663a19ca001206aff53c",
  dataBaseId: "663a1aee00329c46a4a5",
  userCollectionId: "663a1b0c002b57256d13",
  videoCollectionId: "663a1b320027a37a851b",
  storageId: "663a1ccb00119946353c",
};
const {
  endpoint,
  platform,
  projectId,
  dataBaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const dataBases = new Databases(client);
const storage = new Storage(client);
export const getfilePreview = async (fileId: any, type: "image" | "video") => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("invalid file Type");
    }
    return fileUrl;
  } catch (error) {}
};

export const uploadFile = async (
  file: DocumentPickerAsset,
  type: "image" | "video"
) => {
  if (!file) return;
  const { mimeType, uri, size, name } = file;
  const asset = { type: mimeType || "", name, size: size || 0, uri };
  try {
    let fileId: string = "";
    const res = await storage
      .createFile(storageId, ID.unique(), asset)
      .then((r) => {
        fileId = r.$id;
      });

    const fileUrl = fileId.length > 0 && (await getfilePreview(fileId, type));
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};
export const createVideo = async (formData: VideoInput) => {
  try {
    const [thumbnail, video] = await Promise.all([
      uploadFile(formData.thumbnail as DocumentPickerAsset, "image"),
      uploadFile(formData.videoUrl as DocumentPickerAsset, "video"),
    ]);
    if (thumbnail && video) {
      await dataBases.createDocument(
        dataBaseId,
        videoCollectionId,
        ID.unique(),
        {
          title: formData.title,
          thumbnail,
          video,
          creator: formData.userId,
          prompt: formData.prompt,
        }
      );

      return { ok: true, message: "uploaded successfully" };
    } else return { ok: false, message: "Error Happend" };
  } catch (error: any) {
    console.log(error);
    return { ok: false, message: "Error Happend" };
  }
};
export const createUser = async (data: SignUpData) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(data.username);
    await signIn({ email: data.email, password: data.password });
    const newUser = await dataBases.createDocument(
      dataBaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar: avatarUrl,
        username: newAccount.name,
        email: newAccount.email,
      }
    );
    return { ok: true, newUser, message: "User Created" };
  } catch (error: any) {
    console.log(error);
    return { ok: false, message: "Error Happend" };
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await dataBases.listDocuments(
      dataBaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getAllPosts = async (userId?: string) => {
  try {
    const posts = userId
      ? await dataBases.listDocuments(dataBaseId, videoCollectionId, [
          Query.equal("creator", userId),
        ])
      : await dataBases.listDocuments(dataBaseId, videoCollectionId);
    if (!posts) throw new Error("No posts found");

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getAllTrending = async () => {
  try {
    const posts = await dataBases.listDocuments(dataBaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(6),
    ]);
    if (!posts) throw new Error("No posts found");

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchQuery = async ({ query }: { query: string }) => {
  try {
    console.log(query);
    const posts = await dataBases.listDocuments(dataBaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    if (!posts) throw new Error("No posts found");

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
