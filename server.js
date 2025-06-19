
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const client_id = 'ca11357c751547489af9ded9e29749e8';
const client_secret = 'ca616e18646149ce8fffdaeb87bc7734';
const refresh_token = 'AQDVLGSJDTyJmk0eyv5Fvb6AGZCmUaLbz9Tv0nbm02dkolhVVf8hBxwLjVD4L1jdS_4IAjx1sj4r9_YzGfpPAI5UCfMARpb2YlJ5zzHvzGjDd9HgQGLIwF8QCMpmIJO4W0o';

app.get('/spotify-token', async (req, res) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refresh_token);

  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    res.json({ access_token: response.data.access_token });
  } catch (err) {
    res.status(500).json({ error: 'Token yenileme hatası' });
  }
});

app.listen(3001, () => console.log('Server started'));