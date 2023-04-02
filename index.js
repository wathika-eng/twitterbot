//requirements
const Twitter = require('twitter');
//const Parser = require('rss-parser');
const cron = require('node-cron');

//authentication
const client = new Twitter({
    consumer_key: '4rEkhnBUK1Copjc49qwcRfPtS',
    consumer_secret: 'MnhlYLLiS76SCLm3TyEMgUoHmWRURtkHVA7WfOSi9ZCUMX3e1c',
    access_token_key: '1348566483467702272-JSQRAG965cUGIgLIudWvDv9ySh14M3',
    access_token_secret: 'FYiCWppvh1hjiOGVPAckD7aMU2aVwZofuItzGmIXJ4wkM',
    //bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOLYmQEAAAAAfFU4iVrcndCCZauB7RT1ZotjjYU%3D8vNdZwp51hSfiSvSxZgiDTVQ50Hx7WmTg39tiB5Z126hH0NZWv'
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
tweetLatestNews()