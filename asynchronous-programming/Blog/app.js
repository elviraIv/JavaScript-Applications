function attachEvents() {}
const loadPostsBtn = document.getElementById("btnLoadPosts");
const viewPostsBtn = document.getElementById("btnViewPost");

loadPostsBtn.addEventListener("click", getAllPosts);
viewPostsBtn.addEventListener("click", displayPost);

attachEvents();

async function displayPost() {
  //get selected value from options
  //display post
  //display comments for the post

 
  const selectedId = document.getElementById("posts").value;

  const [post, comments] = await Promise.all([
    getPostById(selectedId),
    getCommentsByPostId(selectedId)
  ])


  const postTitleElement = document.getElementById("post-title");
  const liPostBodyElement = document.getElementById("post-body");
  const ulCommentsElement = document.getElementById("post-comments");


  postTitleElement.textContent = post.title;
  liPostBodyElement.textContent = post.body;
  ulCommentsElement.replaceChildren();
  comments.forEach((c) => {
    const liElement = document.createElement("li");
    liElement.textContent = c.text;
    ulCommentsElement.appendChild(liElement);
  });
}

async function getAllPosts() {
  try {
    const url = `http://localhost:3030/jsonstore/blog/posts`;
    const res = await fetch(url);
    const data = await res.json();

    //populating slect->options(list)
    const selectElement = document.getElementById("posts");
    loadPostsBtn.disabled = true;

    Object.values(data).forEach((p) => {
      const optionElement = document.createElement("option");
      optionElement.textContent = p.title;
      optionElement.value = p.id;

      selectElement.appendChild(optionElement);
    });
  } catch (error) {
    throw new Error("Error");
  }
}

async function getPostById(postId) {
  try {
    const url = `http://localhost:3030/jsonstore/blog/posts/${postId}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getCommentsByPostId(postId) {
  try {
    const url = `http://localhost:3030/jsonstore/blog/comments`;

    const res = await fetch(url);
    const data = await res.json();

    const comments = Object.values(data).filter((c) => c.postId === postId);

    return comments;
  } catch (error) {
    throw new Error(error);
  }
}
