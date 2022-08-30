const axios = require('axios');

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板
 * @returns Promise
 */
async function getEvilMoOdRepo() {
  return axios.get('https://api.github.com/orgs/EvilMoOdCli/repos');
}

/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagsByRepo(repo) {
  return axios.get(`https://api.github.com/repos/EvilMoOdCli/${repo}/tags`);
}

module.exports = {
  getEvilMoOdRepo,
  getTagsByRepo,
};
