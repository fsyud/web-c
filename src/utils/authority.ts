import store from 'store';

class StorageStore {
  static STARRY_STAR_SKY_ID = 'STARRY_STAR_SKY_ID';
  static STARRY_STAR_SKY = 'STARRY_STAR_SKY';
  static STARRY_STAR_SKY_USER_INFO = 'STARRY_STAR_SKY_USER_INFO';

  static getUserId() {
    return store.get(this.STARRY_STAR_SKY_ID);
  }

  static setUserId(token = '') {
    store.set(this.STARRY_STAR_SKY_ID, token);
  }

  static removeUserIdStorage() {
    store.remove(this.STARRY_STAR_SKY_ID);
  }

  static getAccessToken() {
    return store.get(this.STARRY_STAR_SKY);
  }

  static setAccessToken(token = '') {
    store.set(this.STARRY_STAR_SKY, token);
  }

  static removeAccessToken() {
    store.remove(this.STARRY_STAR_SKY);
  }

  static getUserInfoLocalStorage() {
    let cur = store.get(this.STARRY_STAR_SKY_USER_INFO);

    if (cur) {
      return JSON.parse(cur);
    }
    return '';
  }

  static setUserInfoLocalStorage(token = '') {
    store.set(this.STARRY_STAR_SKY_USER_INFO, token);
  }

  static removeUserInfoLocalStorage() {
    store.remove(this.STARRY_STAR_SKY_USER_INFO);
  }

  static removeAllUserLocal() {
    this.removeUserIdStorage();
    this.removeAccessToken();
    this.removeUserInfoLocalStorage();
  }
}

export { StorageStore };
