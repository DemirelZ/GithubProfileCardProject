const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
// console.log(main);

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    //console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    console.log();
    createErrorCard("Sorry, could not find the user you are looking for :(");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  //console.log(user);
  if (user) {
    getUser(user);
    search.value = "";
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? user.bio : "";

  const createdHtml = `
<div class="card">
            <img class="user-image" src="${user.avatar_url}" alt="user Image">
            <div class="user-info">
                <div class="user-name">
                    <h2>${userName}</h2>
                    <small>@${user.login}</small>
                </div>
            </div>
            <p>${userBio}</p>
            <ul>
                <li><i class="fa-solid fa-user-group"> ${user.followers}</i><strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li><i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong></li>
            </ul>
            <div class="repos" id="repos"></div>
</div>
`;
  main.innerHTML = createdHtml;
}

function createErrorCard(msg) {
  const warningMessage = `
    <div class="card"> 
    <h2>${msg}</h2>

    </div>
    `;

  main.innerHTML = warningMessage;
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    // console.log(data);
    await renderRepos(data);
  } catch (error) {
    createErrorCard("Sorry, couldn't find the repositories :(");
  }
}

function renderRepos(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i>${repo.name}`;

    reposEl.appendChild(reposLink);
  });
}
