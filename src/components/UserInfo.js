import { profileName, profileJob } from "../utils/constants.js";

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
  }

  getUserInfo() {
    this._name.value = profileName.textContent.trim();
    this._job.value = profileJob.textContent.trim();
  }

  setUserInfo() {
    profileName.textContent = this._name.value;
    profileJob.textContent = this._job.value;
  }

}
