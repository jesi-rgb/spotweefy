import dotenv from 'dotenv'
import Twitter from 'twitter'
import express from "express"
const server = express();
const dot_env = dotenv.config()

const atkn = process.env.ACCESS_TOKEN;
const ascrt = process.env.ACCESS_SECRET;
const apik = process.env.API_KEY;
const apisk = process.env.API_SECRET_KEY;

var client = new Twitter({
  consumer_key: apik,
  consumer_secret: apisk,
  access_token_key: atkn,
  access_token_secret: ascrt
});

var params = {screen_name: 'elBotdeJesi'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }else{
      console.log(error);
  }
});