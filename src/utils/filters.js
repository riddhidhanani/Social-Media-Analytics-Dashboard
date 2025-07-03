// src/utils/filters.js

//This filters out posts that are older than a certain number of days.
export function filterDataByDate(data, days) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return data.filter(item => new Date(item.post_date) >= cutoff);
}

export function filterDataByPlatform(data, platform) {
  return data.filter(item => item.platform === platform);
}
