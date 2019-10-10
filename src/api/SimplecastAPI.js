import axios from "axios";
class SimplecastApi {
  constructor(token) {
    this.api = axios.create({
      baseURL: "https://zkhswvxax1.execute-api.us-east-1.amazonaws.com/test",
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  async getPodcast() {
    const res = await this.api.get("/podcasts");
    return res.data;
  }

  async getPodcastEpisodes(id) {
    const res = await this.api.get(`/podcasts/${id}/episodes`);
    return res.data;
  }

  async getEpisodeDownloads(id) {
    const res = await this.api.get(`/analytics/downloads?episode=${id}`);
    return res.data;
  }
}

export default SimplecastApi;
