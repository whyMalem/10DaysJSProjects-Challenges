const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

fetchUsers("whyMalem");

async function fetchUsers(username) {
  const resp = await fetch(API_URL + username);
  const respData = await resp.json();

  createUserCard(respData);

  //   console.log(respData);

  getRepos(username);
}

function createUserCard(userInfo) {
  const card = `
    <div class="card">
        <div>
        <a href=${userInfo.html_url} target="_blank">
        <img
          src=${userInfo.avatar_url}
          alt="avatar"
          class="avatar"
        />
        </a>
        </div>

        <div class="user-info">
          <h2 class="user">${
            userInfo.name === null ? userInfo.login : userInfo.name
          }</h2>
          <p class=${userInfo.bio === null ? "noBio" : "bio"}>${
    userInfo.bio === null ? "User didn't have any bio" : userInfo.bio
  }</p>

          <ul class="info">
            <li>${userInfo.followers} <strong>Followers</strong></li>
            <li>${userInfo.following} <strong>Following</strong></li>
            <li>${userInfo.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos"></div>
        </div>
      </div>
    `;

  main.innerHTML = card;
}

async function getRepos(user) {
  const resp = await fetch(API_URL + user + "/repos");
  const respData = await resp.json();

  createReposCard(respData);
}

function createReposCard(repos) {
  const reposElement = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoElement = document.createElement("a");
      repoElement.classList.add("repo");

      repoElement.href = repo.html_url;
      repoElement.target = "_blank";
      repoElement.innerText = repo.name;

      reposElement.appendChild(repoElement);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userSearch = search.value;

  if (userSearch) {
    fetchUsers(userSearch);

    search.value = "";
  }
});
