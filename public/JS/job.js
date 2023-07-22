const btnApply = document.querySelector(".btn-apply");
const btnCancel = document.querySelector(".btn-cancel");

btnApply.addEventListener("click", () => {
  document.querySelector(".container").classList.add("show-form");
  document.body.style.overflowY = "hidden";
});

btnCancel.addEventListener("click", () => {
  document.querySelector(".container").classList.remove("show-form");
  document.body.style.overflowY = "scroll";
});

// Apply Form Validation
const { isEmpty, isEmail, isLength } = validator;
const applyForm = document.querySelector(".apply-form .form-main");
const name = document.querySelector(".apply-form .form-main #name");
const email = document.querySelector(".apply-form .form-main #email");
const contact = document.querySelector(".apply-form .form-main #contact");
const resume = document.querySelector(".apply-form .form-main #resume");
const consent = document.querySelector(".apply-form .form-main #consent");
const inputs = document.querySelectorAll(".apply-form .form-main .input");
const btnSubmit = document.querySelector(".apply-form .form-main .btn-submit");
let isFormValid = false;

btnSubmit.disabled = true;

name.addEventListener("keyup", (e) => {
  if (isEmpty(e.target.value)) {
    name.parentElement.classList.add("invalid");
    name.nextElementSibling.innerHTML = `
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>Name cannot be empty!</span>
      `;
  } else {
    if (!isEmpty(e.target.value) && !/^[A-Za-z\s]+$/.test(e.target.value)) {
      name.parentElement.classList.add("invalid");
      name.nextElementSibling.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>Name must be alphabetic characters only!</span>
        `;
    } else {
      name.parentElement.classList.remove("invalid");
    }
  }
});

email.addEventListener("keyup", (e) => {
  if (isEmpty(e.target.value)) {
    email.parentElement.classList.add("invalid");
    email.nextElementSibling.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>Email cannot be empty!</span>
        `;
  } else {
    setTimeout(() => {
      if (!isEmpty(e.target.value) && !isEmail(e.target.value)) {
        email.parentElement.classList.add("invalid");
        email.nextElementSibling.innerHTML = `
                <i class="fa-solid fa-circle-exclamation"></i>
                <span>Invalid email address!</span>
                `;
      } else {
        if (!isEmpty(e.target.value) && isEmail(e.target.value)) {
          email.parentElement.classList.remove("invalid");
        } else {
          email.parentElement.classList.add("invalid");
        }
      }
    }, 700);
  }
});

contact.addEventListener("keyup", (e) => {
  if (isEmpty(e.target.value)) {
    contact.parentElement.classList.add("invalid");
    contact.nextElementSibling.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>Contact cannot be empty!</span>
        `;
  } else {
    if (!/^[0-9]+$/.test(e.target.value)) {
      contact.value = contact.value.slice(0, -1);
    }

    if (
      !isEmpty(e.target.value) &&
      !isLength(e.target.value, { min: 10, max: 10 })
    ) {
      contact.parentElement.classList.add("invalid");
      contact.nextElementSibling.innerHTML = `
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>Contact must be at least 10 characters!</span>
            `;
    } else {
      if (
        !isEmpty(e.target.value) &&
        isLength(e.target.value, { min: 10, max: 10 })
      ) {
        contact.parentElement.classList.remove("invalid");
      } else {
        contact.parentElement.classList.add("invalid");
      }
    }
  }
});

// Keep button disabled if form is invalid
inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    if (
      !isEmpty(name.value) &&
      !isEmpty(email.value) &&
      isEmail(email.value) &&
      /^[A-Za-z\s]+$/.test(name.value) &&
      !isEmpty(contact.value) &&
      isLength(contact.value, { min: 10, max: 10 })
    ) {
      btnSubmit.disabled = false;
    } else {
      btnSubmit.disabled = true;
    }
  });
});
