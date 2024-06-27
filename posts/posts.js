"use strict";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbnplbDIuMCIsImlhdCI6MTcxOTI1Nzk5MCwiZXhwIjoxNzE5MzQ0MzkwfQ.1UVsVYDv9TVjSf4L5lYpfDnL_LTEp4YcgR1pSo8s918";

document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    logout();
  });

  fetch(`${apiBaseURL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${post.username}</h5>
              <p class="card-text">${post.text}</p>
              <p class="card-text"><small class="text-muted">${new Date(
                post.createdAt
              ).toLocaleString()}</small></p>
            </div>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});
document.addEventListener("DOMContentLoaded", function() {
  const postButton = document.getElementById("postButton");
  const tweetContent = document.getElementById("tweetContent");
  const tweetFeed = document.getElementById("tweetFeed");

  postButton.addEventListener("click", function() {
    const content = tweetContent.value.trim();
    if (content === "") {
      alert("Please enter your tweet content.");
      return;
    }

    const tweet = createTweetElement(content);
    tweetFeed.insertBefore(tweet, tweetFeed.firstChild);

    // Clear the textarea after posting
    tweetContent.value = "";
  });

  function createTweetElement(content) {
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

