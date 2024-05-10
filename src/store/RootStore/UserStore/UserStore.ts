import { onAuthStateChanged } from 'firebase/auth';
import { computed, makeObservable, observable } from 'mobx';
import { auth } from 'services/firebase/config';

type PrivateFields = '_userState' | '_uid' | '_userName' | '_email' | '_accessToken';

enum UserState {
  initial = 'initial',
  unknown = 'unknown',
  identified = 'identified',
}

class UserStore {
  private _auth = auth;
  private _userState: UserState = UserState.initial;
  private _uid: string = '';
  private _userName: string = '';
  private _email: string = '';
  private _accessToken: string = '';

  constructor() {
    this._eventListeningUserAuthorization();
    makeObservable<UserStore, PrivateFields>(this, {
      _userState: observable,
      _uid: observable,
      _userName: observable,
      _email: observable,
      _accessToken: observable,
      userInitial: computed,
      userUnknown: computed,
      userIdentified: computed,
    });
  }

  get userInitial(): boolean {
    return this._userState === UserState.initial;
  }

  get userUnknown(): boolean {
    return this._userState === UserState.unknown;
  }

  get userIdentified(): boolean {
    return this._userState === UserState.identified;
  }

  private _eventListeningUserAuthorization = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        this._userState = UserState.identified;
        this._uid = uid;
        email ? (this._email = email) : null;
        displayName ? (this._userName = displayName) : null;
        return;
      }

      this._userState = UserState.unknown;
      this._uid = '';
      this._email = '';
      this._userName = '';
    });
  };
}

export default UserStore;
