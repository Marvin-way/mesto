export class UserInfo {
  constructor(config){
    this._config = config; //
    this._name = document.querySelector(this._config.profileTitle) ;
    this._job = document.querySelector(this._config.profileSubTitle) ;
  }

  getUserInfo(){
    const data = {name: this._name.textContent, job: this._job.textContent};  
    return data;
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._job.textContent = data.job;
    // console.log(`data in setUserInfo is ${data.name} and ${data.job}`);
  }
}
