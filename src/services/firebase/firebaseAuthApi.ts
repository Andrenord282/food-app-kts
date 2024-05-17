import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  AuthError,
} from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'services/firebase/config';
import { SignInData, SignUpData, UserApi } from 'store/models/user';

class FirebaseAuthApi {
  private _auth = auth;

  private _usernameExists = async (displayName: string) => {
    const q = query(collection(db, 'users'), where('displayName', '==', displayName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new FirebaseError('auth/name-already-in-use', 'name already in use');
    }
    return !querySnapshot.empty;
  };

  private _createUser = async (uid: string, displayName: string) => {
    const user: UserApi = {
      uid,
      displayName,
      recipeIdSavedList: [],
      recipeIdShoppingList: [],
    };
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, uid), user);
  };

  signUp = async ({
    displayName,
    email,
    password,
  }: SignUpData): Promise<AuthError | { code: string; message?: string }> => {
    try {
      await this._usernameExists(displayName);
      const response = await createUserWithEmailAndPassword(this._auth, email, password);
      const { user } = response;
      await updateProfile(user, { displayName });
      await this._createUser(user.uid, displayName);
      return { code: 'success', message: `Welcome ${displayName}!` };
    } catch (error) {
      return error as AuthError;
    }
  };

  signIn = async ({ email, password }: SignInData): Promise<AuthError | { code: string; message?: string }> => {
    try {
      await signInWithEmailAndPassword(this._auth, email, password);
      return { code: 'success', message: `Hello ${this._auth.currentUser?.displayName}!` };
    } catch (error) {
      return error as AuthError;
    }
  };

  signOut = async () => {
    try {
      await signOut(this._auth);
    } catch (error) {
      return error as AuthError;
    }
  };
}

const firebaseAuthApi = new FirebaseAuthApi();

export default firebaseAuthApi;
