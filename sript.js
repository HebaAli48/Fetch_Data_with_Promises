var div = document.getElementById("btnContent");
var ulist = document.getElementById("content");

var selectedButton;
// Fetch users from jsonplaceholder Api
fetch("https://jsonplaceholder.typicode.com/users")
  .then((x) => {
    return x.json();
  })
  .then((users) => {
    // Create user buttons
    for (var i = 0; i < users.length; i++) {
      var userButton = document.createElement("div");
      userButton.textContent = users[i].name;
      userButton.classList.add("usercontainer");
      div.append(userButton);
    }

    // Show the first user's posts by default
    showUserPosts(users[0].id);

    // Add click event listener to the container
    div.addEventListener("click", function (e) {
      // Remove the selected class from the  unselected button
      if (selectedButton) {
        selectedButton.classList.remove("selected");
      }

      // Add the selected class to the clicked button
      e.target.classList.add("selected");
      selectedButton = e.target;

      // Show the clicked user's posts
      var userId = users.find((u) => u.name === e.target.textContent).id;
      showUserPosts(userId);
    });

    // Select the first button
    div.children[0].classList.add("selected");
    selectedButton = div.children[0];
  });

async function showUserPosts(userId) {
  // Fetch the user's posts
  var data = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=" + userId
  );
  var posts = await data.json();

  // Clear the previous posts
  ulist.innerHTML = "";

  // Display the posts
  for (var j = 0; j < posts.length; j++) {
    var listItem = document.createElement("li");
    listItem.style.paddingBottom = "10px";
    listItem.textContent = posts[j].title;
    ulist.append(listItem);
  }
}
