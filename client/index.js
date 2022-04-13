
// fetch all responses and display to the Admin in anunordered list.
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  for (const item of data) {
    const answer = document.createElement('div');
    answer.className = 'ans';
    const answers = document.querySelector('#answers');
    const ul = document.createElement('ul');
    const id = document.createElement('li');
    const name = document.createElement('li');
    const question = document.createElement('li');
    const favouriteColour = document.createElement('li');
    const velocity = document.createElement('li');
    const lord = document.createElement('li');
    const language = document.createElement('li');
    id.textContent = 'ID :' + item.id;
    name.textContent = 'Name:' + item.name;
    question.textContent = 'Question:' + item.question;
    favouriteColour.textContent = 'Favourite-Colour:' + item.favouritecolor;
    velocity.textContent = 'Velocity:' + item.velocity;
    lord.textContent = 'Lord:' + item.lord;
    language.textContent = 'Language:' + item.language;
    ul.appendChild(id);
    ul.appendChild(name);
    ul.appendChild(question);
    ul.appendChild(favouriteColour);
    ul.appendChild(velocity);
    ul.appendChild(lord);
    ul.appendChild(language);
    answer.appendChild(ul);
    answers.append(answer);
  }
}

// Event handlers of submit and view responses bottons.
document.getElementById('sendMail').addEventListener('click', function () {
  sendMail();
});
document.getElementById('reply').addEventListener('click', function () {
  getData();
});
// an authorized user will login and acess the data and this function get his ID,Name,Email,and image.
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  const signin = document.querySelector('.g-signin2');
  signin.style.display = 'none';
  const row = document.querySelector('.row')
  row.style.display = 'block';
}
// admin to send email to users.
function sendMail() {
  const link = 'mailto:me@example.com' + '?cc=myCCaddress@example.com' + '&subject=' + escape('Questionnaire') +
  '&body=' + escape('please fill the questionnaire in this link' + '  ' + 'http://localhost:8080/questions.html');
  window.location.href = link;
}

//  admin signout
function signOut() {
  const signin = document.querySelector('.g-signin2');
  const auth2 = gapi.auth2.getAuthInstance();
  const row = document.querySelector('.row')
  const ans = document.querySelector('#answers')
  auth2.signOut().then(function () {
    console.log('User signed out.');
    signin.style.display = 'block';
    row.style.display = 'none';
    ans.style.display = 'none';
  });
}
