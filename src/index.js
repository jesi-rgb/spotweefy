import dotenv from 'dotenv'
import Twitter from 'twitter'
import express from "express"
import SpotifyWebApi from "spotify-web-api-node"
 
const server = express();
const dot_env = dotenv.config()

var client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET
});

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET
  });
spotifyApi.setAccessToken(process.env.SPOTIFY_TOKEN);


spotifyApi.getMyCurrentPlaybackState()
  .then(function(data) {
    // Output items
    if (data.body && data.body.is_playing) {
      console.log(data.body.item.name);
      console.log(data.body.item.artists[0].name);
    } else {
      console.log("User is not playing anything, or doing so in private.");
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
// var params = {screen_name: 'elBotdeJesi'};
// client.post('statuses/update', {status: 'I am a tweeting from js'}, function(error, tweet, response) {
//     if (!error) {
//       console.log(tweet);
//     }
//   });