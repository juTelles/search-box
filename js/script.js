let allUsers = [];
let inputValue = '';
const searchInput = document.querySelector('#searchInput');
const userResultsDiv = document.querySelector('#usersResultsDiv');
const button = document.querySelector('#button');
const usersTitle = document.querySelector('#usersTitle');
const statsTitle = document.querySelector('#statsTitle');
const statsDiv = document.querySelector('#statsDiv');
const getInputValue = () => searchInput.value;

async function fetchUsers() {
  const resource = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await resource.json();
  allUsers = json.results.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      age: user.dob.age,
      gender: user.gender,
      picture: user.picture.thumbnail,
    };
  });
}

const renderUsersSum = (foundUsers) => {
  let usersSum = foundUsers.length;
  usersTitle.textContent = `${usersSum} users found`;
};
const renderStats = (foundUsers) => {
  let females = null;
  let males = null;
  let ageSum = null;
  let ageMediam = null;

  femaleUsers = foundUsers.filter((user) => user.gender === 'female');
  females = femaleUsers.length;

  maleUsers = foundUsers.filter((user) => user.gender === 'male');
  males = maleUsers.length;

  foundUsers.forEach((user) => {
    ageSum += user.age;
  });

  ageMediam = ageSum / foundUsers.length;

  let stats = `
  <p>Females: ${females}</p>
  <p>Males: ${males}</p>
  <p>Sum of ages: ${ageSum}</p>
  <p>Ages Mediam: ${ageMediam}</p>
  `;
  statsDiv.innerHTML = stats;
};
const renderUsers = (users) => {
  let usersHTML = '';
  users.forEach((user) => {
    const userBox = `
    <div id="userBox">
    <div class="img-div">
    <img src="${user.picture}">
    </div>
    <div>
    <p>${user.name}, ${user.age} anos</p>
    </div>
    </div>
    `;
    usersHTML += userBox;
  });
  usersResultsDiv.innerHTML = usersHTML;
};
const activateSearch = () => {
  inputValue = getInputValue().toLowerCase();
  let foundUsers = allUsers.filter((user) => {
    let name = user.name.toLowerCase();
    if (name.includes(inputValue) === true) {
      return user;
    }
  });
  renderUsers(foundUsers);
  renderStats(foundUsers);
  renderUsersSum(foundUsers);
};
const handleKeyboardInput = (event) => {
  inputValue = getInputValue();
  if (event.key === 'Enter' && inputValue !== '') {
    activateSearch();
  }
};
window.addEventListener('load', () => {
  fetchUsers();
  searchInput.focus();
  searchInput.addEventListener('keyup', handleKeyboardInput);
  button.addEventListener('click', activateSearch);
});
