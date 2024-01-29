const STORAGE_KEY = 'feedback-form-state';

const formElem = document.querySelector('form.feedback-form');
formElem.addEventListener('input', onFormInput);
formElem.addEventListener('submit', onFormSubmit);
init();

function onFormInput() {
  const userEmail = formElem.elements.email.value.trim();
  const userMessage = formElem.elements.message.value.trim();
  const formData = {
    email: userEmail,
    message: userMessage,
  };
  saveToLS(STORAGE_KEY, formData);
}

function onFormSubmit(e) {
  e.preventDefault();

  const userEmail = formElem.elements.email.value.trim();
  const userMessage = formElem.elements.message.value.trim();

  if (!userEmail || !userMessage) {
    alert('All form fields must be filled in');
    return;
  }

  const formData = {
    email: userEmail,
    message: userMessage,
  };

  console.log(formData);
  formElem.reset();
  removeByKeyFromLS(STORAGE_KEY);
}

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);

  try {
    return JSON.parse(zip);
  } catch {
    return zip;
  }
}

function init() {
  const formData = loadFromLS(STORAGE_KEY) || {};
  formElem.elements.email.value = formData.email || '';
  formElem.elements.message.value = formData.message || '';
}

function removeByKeyFromLS(key) {
  localStorage.removeItem(key);
}
