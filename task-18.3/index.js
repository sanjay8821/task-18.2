var postIdToUpdate;

async function getAllPosts() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();

    let postContainer = document.getElementById("postContainer");

    data.forEach((post) => {
      const newPostElement = document.createElement("div");
      newPostElement.setAttribute("id", `post-${post.id}`);
      newPostElement.setAttribute("key", post.id);
      newPostElement.setAttribute("class", "newPost");

      newPostElement.innerHTML = `
    <div><span class='post-label'>Post ID:</span> ${post.id}</div>
    <div><span class='post-label'>Title:</span> ${post.title}</div>
    <div><span class='post-label'>Body:</span> ${post.body}</div>
    <div><span class='post-label'>User ID:</span>${post.userId}<div>
    <div>
        <button class='myButton' onclick={updatePost(${post.id})}>Update</button>
        <button class='myButton'  onclick={deletePost(${post.id})}>Delete</button>
    </div>
    `;

      postContainer.appendChild(newPostElement);
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

async function submitPost(event) {
  try {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    let userId = document.getElementById("userId").value;

    let postPayload = {
      title,
      body,
      userId,
    };

    if (postIdToUpdate) {
      postPayload.id = postIdToUpdate;

      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postIdToUpdate}`,
        {
          method: "PUT",
          body: JSON.stringify(postPayload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      let data = await response.json();

      if (data.id) {
        alert("POST SUCCESSFULLY UPDATED");
      }
    } else {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postPayload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let data = await response.json();

      if (data.id) {
        alert("POST SUCCESSFULLY ADDED");
      }
    }

    postIdToUpdate = null;

    let form = document.getElementsByTagName("form")[0];
    form.reset();
  } catch (error) {
    alert(error);
  }
}

async function updatePost(postId) {
  try {
    postIdToUpdate = postId;

    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    let postById = await response.json();

    document.getElementById("title").value = postById.title;
    document.getElementById("body").value = postById.body;
    document.getElementById("userId").value = postById.userId;
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

async function deletePost(postId) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
    let deletedPost = await response.json();

    alert("POST HAS BEEN DELETED SUCCESSFULLY.");
  } catch (error) {
    console.log("ERROR: ", error);
  }
}