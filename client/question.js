
const submitform = document.querySelector('#submitform')
// fetch questions from json and call function by checking input type.
async function startQes() {
  const response = await fetch('example-questionnaire.json');
  let availableQuestion = await response.json();
  if (response.ok) {
    for (const question of availableQuestion.questions) {
      const questionType = question.type;
      switch (questionType) {
        case 'text':
          textFields(question);
          break;
        case 'number':
          numField(question);
          break;
        case 'single-select':
          radioques(question);
          break;
        case 'multi-select':
          checkques(question);
          break;
        default:
          alert('input type not found');
      }
    }
  } else {
    availableQuestion = ['failed to load messages: '];
  }
  // append text.type of questions
  function textFields(question) {
    const questionText = document.createElement('p');
    questionText.textContent = question.text;
    questionText.id = 'textquestn';
    const textfield = document.createElement('input');
    textfield.id = question.id;
    textfield.required = true;
    textfield.classList.add('submitField');
    document.querySelector('#hud-item').appendChild(questionText);
    document.querySelector('#hud-item').appendChild(textfield);
  }

  // append number.type of question
  function numField(question) {
    const questionNumber = document.createElement('p');
    questionNumber.textContent = question.text;
    questionNumber.id = 'numquestn';
    const numfield = document.createElement('input');
    numfield.classList.add('submitField');
    numfield.id = question.id;
    numfield.type = question.type
    document.querySelector('#hud-item').appendChild(questionNumber);
    document.querySelector('#hud-item').appendChild(numfield);
  }

  // append radio.of questions
  function radioques(question) {
    const questionRadio = document.createElement('p');
    questionRadio.textContent = question.text;
    questionRadio.id = 'radioquestn';
    const label = document.createElement('label');
    const theValues = question.options;
    for (let a = 0; a < theValues.length; a++) {
      const field1 = document.createElement('input');
      field1.classList.add('submitField');
      field1.setAttribute('type', 'radio');
      field1.setAttribute('name', question.id);
      field1.setAttribute('value', theValues[a]);
      label.innerHTML += '<span> ' + theValues[a] + '</span>';
      label.appendChild(field1);
      document.querySelector('#hud-item').appendChild(questionRadio);
      document.querySelector('#hud-item').appendChild(label);
    }
  }
  // append checkbox of questions
  function checkques(question) {
    const questionCheck = document.createElement('p');
    questionCheck.textContent = question.text;
    questionCheck.id = 'checkquestn';
    const label1 = document.createElement('span');
    const theValues1 = question.options;
    for (let q = 0; q < theValues1.length; q++) {
      const field2 = document.createElement('input');
      field2.classList.add('submitField');
      field2.setAttribute('type', 'checkbox');
      field2.setAttribute('name', question.id);
      field2.setAttribute('value', theValues1[q]);
      label1.innerHTML += '<span> ' + theValues1[q] + '</span>';
      label1.appendChild(field2);
      document.querySelector('#hud-item').appendChild(questionCheck);
      document.querySelector('#hud-item').appendChild(label1);
    }
  }
}
document.addEventListener('keyup', checkKeys);
submitform.addEventListener('click', function () {
  sendMessage();
});
/* add a message if enter pressed */
function checkKeys(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}
/** Use fetch to post a JSON message to the server */
async function sendMessage() {
  const submitArray = document.querySelectorAll('.submitField');
  const submitObject = {}
  for (const submitElem of submitArray) {
    if (submitElem.type === 'text') {
      submitObject[submitElem.id] = submitElem.value;
    }
    if (submitElem.type === 'number') {
      submitObject[submitElem.id] = Number(submitElem.value);
    }
    if (submitElem.type === 'radio') {
      const checkedElem = document.querySelector('input[type=radio]:checked');
      submitObject[submitElem.name] = checkedElem.value;
    }
    if (submitElem.type === 'checkbox') {
      const array = []
      const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value);
      }
      const lang = JSON.stringify(array);
      submitObject[submitElem.name] = lang;
    }
  }
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submitObject),
  });
  if (response.ok) {
  // when all questions are answered it display end message.
    window.location = ('end.html');
  } else {
    console.log('failed to send message');
  }
}
function pageLoaded() {
  startQes();
}

window.addEventListener('load', pageLoaded);
