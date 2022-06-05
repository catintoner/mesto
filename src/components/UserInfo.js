export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatar }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent.trim(),
      about: this._profileAbout.textContent.trim()
    };
    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;

  }

}
