export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._profileName = document.querySelector('.profile__name');
    this._profileJob = document.querySelector('.profile__about');
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent.trim(),
      job: this._profileJob.textContent.trim()
    };
    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

}
