export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = nameSelector;
    this._about = aboutSelector;
    this._profileName = document.querySelector('.profile__name');
    this._profileAbout = document.querySelector('.profile__about');
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent.trim(),
      about: this._profileAbout.textContent.trim()
    };
    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }

}
