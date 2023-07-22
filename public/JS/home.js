// Navbar
const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const section1offsetbottom = document.querySelector(".section-1").offsetHeight;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  mainFn();
});

const mainFn = () => {
  if (window.pageYOffset >= section1offsetbottom - 10) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  sections.forEach((section, i) => {
    if (window.pageYOffset >= section.offsetTop - 50) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("active");
      });
      navbarLinks[i].classList.add("active");
    }
  });
};

const btnMenu = document.querySelector(".btn-menu");

btnMenu.addEventListener("click", () => {
  navbar.classList.toggle("sidebar");

  if (navbar.classList.contains("sidebar")) {
    document.querySelector(".dark-cover").style.opacity = 1;
    document.querySelector(".dark-cover").style.visibility = "visible";
    document.body.style.overflowY = "hidden";
  } else {
    document.querySelector(".dark-cover").style.opacity = 0;
    document.querySelector(".dark-cover").style.visibility = "hidden";
    document.body.style.overflowY = "scroll";
  }
});

document.querySelectorAll(".nav-link a").forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navbar.classList.remove("sidebar");
    document.querySelector(".dark-cover").style.opacity = 0;
    document.querySelector(".dark-cover").style.visibility = "hidden";
    document.body.style.overflowY = "scroll";
  });
});
// End of Navbar

// Section 5
// Swiper Slider
var contactSwiper = new Swiper(".contactSwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
});

// Contact Form Validation
const { isEmpty, isEmail, isLength } = validator;
const contactForm = document.querySelector(".contact-form .form-main");
const name = document.querySelector(".contact-form .form-main #name");
const email = document.querySelector(".contact-form .form-main #email");
const message = document.querySelector(".contact-form .form-main #message");
const inputs = document.querySelectorAll(".contact-form .form-main .input");
const btnSubmit = document.querySelector(
  ".contact-form .form-main .btn-submit"
);

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

message.addEventListener("blur", (e) => {
  if (isEmpty(e.target.value)) {
    message.parentElement.classList.add("invalid");
    message.nextElementSibling.innerHTML = `
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>Message cannot be empty!</span>
      `;
  } else {
    if (!isEmpty(e.target.value) && !isLength(e.target.value, { min: 20 })) {
      message.parentElement.classList.add("invalid");
      message.nextElementSibling.innerHTML = `
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>Message must be at least 20 characters!</span>
      `;
    } else {
      message.parentElement.classList.remove("invalid");
    }
  }
});

// Keep button disabled if form is invalid
inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    if (
      !isEmpty(name.value) &&
      !isEmpty(email.value) &&
      !isEmpty(message.value) &&
      isEmail(email.value) &&
      /^[A-Za-z\s]+$/.test(name.value) &&
      isLength(message.value, { min: 20 })
    ) {
      btnSubmit.disabled = false;
    } else {
      btnSubmit.disabled = true;
    }
  });
});
// End of Section 5
