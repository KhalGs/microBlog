/* Posts Page JavaScript */

"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const postButton = document.getElementById("postButton");
  const tweetContent = document.getElementById("tweetContent");
  const tweetFeed = document.getElementById("tweetFeed");

  postButton.addEventListener("click", function() {
    const content = tweetContent.value.trim();
    if (content === "") {
      alert("hello .");
      return;
    }

    const tweet = createTweet(content);
    tweetFeed.insertBefore(tweet, tweetFeed.firstChild);

    // Clear the textarea after posting
    tweetContent.value = "";
  });

  function createTweet(content) {
    const tweetElement = document.createElement("div");
    tweetElement.classList.add("tweet");

    const tweetText = document.createElement("p");
    tweetText.textContent = content;

    const actions = document.createElement("div");
    actions.classList.add("actions");
    
    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    likeButton.addEventListener("click", function() {
      alert("You liked this tweet!");
    });

    const retweetButton = document.createElement("button");
    retweetButton.textContent = "Retweet";
    retweetButton.addEventListener("click", function() {
      alert("You retweeted this tweet!");
    });

    actions.appendChild(likeButton);
    actions.appendChild(retweetButton);

    tweetElement.appendChild(tweetText);
    tweetElement.appendChild(actions);

    return tweetElement;
    
  }
});

