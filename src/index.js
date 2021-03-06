import dotenv from 'dotenv'
import Twitter from 'twitter'
import express from "express"
import SpotifyWebApi from "spotify-web-api-node"
 
const server = express();
const dot_env = dotenv.config()


// AUTHENTICATION OF APPS
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


// ACTUAL APP

// var title = null
// var artist = null
// var duration = null
// var link = null

spotifyApi.getMyCurrentPlaybackState()
  .then(async function(data) {
    // Output items
    
    const saved_tracks = await spotifyApi.getMySavedTracks({
      limit: 50,
    })
    console.log(saved_tracks.body);

    if (data.body && data.body.is_playing) {
      
      // console.log(data.body.item.name);
      // console.log(data.body.item.artists[0].name);
      // console.log(data.body.item.external_urls.spotify);
      // console.log(data.body);
      
      var title = data.body.item.name;
      var artist = data.body.item.artists[0].name;
      var link = data.body.item.external_urls.spotify;


      // console.log(saved_tracks.body.items);
      var tw = "Jesi is currently playing " + title + " by " + artist;

      for(var i = 0; i<saved_tracks.body.items.length; i++){
        if(data.body.id == saved_tracks.body.items[i].track.id){
          tw += ", and he loves it!"
          console.log("and he loves it!");
        }
      }
      tw += "\n\n" + link

      client.post('statuses/update', {status: tw}, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
      });

    } else {
      console.log("User is not playing anything, or doing so in private.");
    }
  }, function(err) {
    console.log('Something went wrong!', err);
});

