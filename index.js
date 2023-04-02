//requirements
const Twitter = require('twitter');
//const Parser = require('rss-parser');
const cron = require('node-cron');

//authentication
const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',
    //bearer_token: ''
  });

//search the top 4 posts 
const searchParams = {
    q: ['#citizentv', '#MaandamanoMonday', '#Azimio'],
    result_type: 'top',
    count: 4,
};

//show the search results and tweet them
function tweetLatestNews() {
    client.get('search/tweets', searchParams, function(error, tweets, response) {
      if (error) {
        console.error(error);
        return;
      }
  
      const latestNews = tweets.statuses.filter(tweet => tweet.text.includes('news'));
      if (latestNews.length === 0) {
        console.log('No latest news found.');
        return;
      }
  
      const tweet = latestNews[0];
      const tweetText = tweet.text;
      const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  
      client.post('statuses/update', {status: `${tweetText}\n\n${tweetUrl}`}, function(error, tweet, response) {
        if (error) {
          console.error(error);
        } else {
          console.log(`Tweeted: ${tweetText}`);
        }
      });
    });
}
  
//make the task repetitive each morning
cron.schedule('0 8 * * *', tweetLatestNews);
