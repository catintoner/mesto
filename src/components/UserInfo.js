export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
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
