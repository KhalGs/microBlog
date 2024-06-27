"use strict";

const loginData = getLoginData(); // Assuming getLoginData() retrieves login information

document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.getElementById("postButton");
  const tweetContent = document.getElementById("tweetContent");
  const postsContainer = document.getElementById("postsContainer"); // Assuming this element exists in your HTML

  postButton.addEventListener("click", function () {
    const content = tweetContent.value.trim();
    if (content === "") {
      alert("Please enter your tweet content.");
      return;
    }

    fetch(`${apiBaseURL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify({ text: content }), // Assuming 'text' is the field for tweet content
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((post) => {
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
      })
      .catch((error) => {
        console.error("Error posting or fetching posts:", error);
        alert("Tweet Sucessfully Uploaded");
      });

    // Clear the textarea after posting
    tweetContent.value = "";
  });
});

