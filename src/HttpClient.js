import axios from "axios";

const config = {
  baseURL: process.env.VUE_APP_SERVER_URI
}

class HttpClient {
  constructor(queryTool) {
    this.http = queryTool.create(config)
  }

  setAuthHeader(jwt) {
    this.http.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
  }
}

export default new HttpClient(axios)