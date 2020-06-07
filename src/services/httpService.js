const mainUrl = 'http://localhost:3000';

export default {
  sendMessage() {
    const url = mainUrl + '/message';
    return fetch(url, { method: 'POST' });
  }
};
