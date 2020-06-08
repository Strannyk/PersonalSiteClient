const mainUrl = 'http://localhost:3000';

export default {
  sendMessage(data) {
    const url = mainUrl + '/message';
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};
