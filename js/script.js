const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

function isValidPhoneNumber(phone){
  let length = phone.length;

  if(length < 10 || length > 15){
    return false;
  }

  for(let i = 0; i < length; i++){
    if (isNaN(phone[i])) {
      return false;
    }
  }

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault();
  
  const form = document.querySelector('.subscribe-form');
  const submitBtn = document.getElementById('subscribeBtn');
  const checkbox = document.getElementById('notRobot');
  const requiredFields = form.querySelectorAll('input[required], select[required]');
  const formErrorMsg = document.getElementById('formErrorMsg');

  const touchedFields = {};

  function checkFormValidity(){
      let allFilled = true;

      // Check name field
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('nameError');

      if(nameField.value.trim() !== '') 
        touchedFields[nameField.id] = true;
      else
        allFilled = false;

      if(nameField.value.trim() === '' && touchedFields[nameField.id]) {
        nameError.style.opacity = '1';
        nameField.style.border = '1px solid red';
      }
      else if(touchedFields[nameField.id]) {
        nameError.style.opacity = '0';
        nameField.style.border = '1px solid green';
      }

      // Check age field
      const ageField = document.getElementById('age');
      const ageError = document.getElementById('ageError');

      if(ageField.value.trim() !== '')
        touchedFields[ageField.id] = true;

      if(ageField.value.trim() === '' || isNaN(ageField.value) || ageField.value < 1 || ageField.value > 100) {
        allFilled = false;
        if(touchedFields[ageField.id]) {
          ageField.style.border = '1px solid red';
          ageError.style.opacity = '1';
        }
      }
      else if(touchedFields[ageField.id]) {
        ageField.style.border = '1px solid green';
        ageError.style.opacity = '0';
      }

      // Check email field
      const emailField = document.getElementById('email');
      const emailError = document.getElementById('emailError');

      if(emailField.value.trim() !== '')
        touchedFields[emailField.id] = true;

      if((emailField.value.trim() === '' || !(emailField.value.includes("@") && emailField.value.includes(".com")))) {
        allFilled = false;
        if(touchedFields[emailField.id]) {
          emailField.style.border = '1px solid red';
          emailError.style.opacity = '1';
        }
      }
      else if(touchedFields[emailField.id]) {
        emailField.style.border = '1px solid green';
        emailError.style.opacity = '0';
      }

      // Check password field
      const passwordField = document.getElementById('password');
      const passwordError = document.getElementById('passwordError');

      if(passwordField.value.trim() !== '')
        touchedFields[passwordField.id] = true;

      if(passwordField.value.trim() === '' || passwordField.value.length < 8 || password.length > 20) {
        allFilled = false;
        if(touchedFields[passwordField.id]) {
          passwordField.style.border = '1px solid red';
          passwordError.style.opacity = '1';
        }
      }
      else if(touchedFields[passwordField.id]) {
        passwordField.style.border = '1px solid green';
        passwordError.style.opacity = '0';
      }

      // Check phone field
      const phoneField = document.getElementById('phone');
      const phoneError = document.getElementById('phoneError');

      if(phoneField.value.trim() !== '')
        touchedFields[phoneField.id] = true;

      if((phoneField.value.trim() === '' || !isValidPhoneNumber(phoneField.value))) {
        allFilled = false;
        if(touchedFields[phoneField.id]) {
          phoneField.style.border = '1px solid red';
          phoneError.style.opacity = '1';
        }
      }
      else if(touchedFields[phoneField.id]) {
        phoneField.style.border = '1px solid green';
        phoneError.style.opacity = '0';
      }

      // Check gender field
      const maleChecked = document.getElementById('male').checked;
      const femaleChecked = document.getElementById('female').checked;

      if(!maleChecked && !femaleChecked)
        allFilled = false;

      // If all fields are filled, enable the checkbox
      if(allFilled) {
        checkbox.disabled = false;
        formErrorMsg.style.opacity = '0';
      }
      else {
        checkbox.disabled = true;
        checkbox.checked = false;
        formErrorMsg.style.opacity = '1';
      }
  
      submitBtn.disabled = !(allFilled && checkbox.checked);
      formErrorMsg.style.opacity = allFilled && checkbox.checked ? '0' : '1';
  }

  // Mark fields as touched on input or change
  requiredFields.forEach(field => {
      touchedFields[field.id] = false;

      field.addEventListener('input', () => {
        checkFormValidity();
      });
  });

  checkbox.addEventListener('change', checkFormValidity);

  // Initial check in case of autofill
  checkFormValidity();
});