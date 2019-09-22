import simplecast from "../api/simplecast";

const getPodcast = async () => {
  const res = await simplecast.get("/podcasts");
  return res.data;
};

const getPodcastEpisodes = async id => {
  const res = await simplecast.get(`/podcasts/${id}/episodes`);
  return res.data;
};

export default { getPodcast, getPodcastEpisodes };
