import axios from 'axios';

export default class DataHandler {
  constructor(user, repo, dataSrc) {
    console.log(user, repo, dataSrc);
    this.user = user;
    this.repo = repo;
    this.dataSrc = dataSrc;
    this.data = {};
  }

  _getRequestUrl(routeRequested) {
    return 'https://api.github.com/repos/' + this.user + '/' + this.repo + '/contents/' + this.dataSrc + routeRequested;
  }


  getArticleData(route) {
    axios.get(this._getRequestUrl(route))
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        for (let item of data) {
          console.log(item.name);
          if (item.name === 'index.md') {
            return axios.get(item.download_url);
          }
        }
      });
  }
}
