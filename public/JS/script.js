// Swiper Slider
var mainSwiper = new Swiper(".mainSwiper", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
});

// Deliver Message
// Get the status parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get("deliverStatus");

// Display a message based on the status
if (status === "success") {
  document.querySelector(".tooltip").classList.add("success");
  document.querySelector(".tooltip p").innerText = "Message delivered!";

  document.querySelector(".btn-close-tooltip").addEventListener("click", () => {
    document.querySelector(".tooltip").classList.remove("success");
  });
} else if (status === "error") {
  document.querySelector(".tooltip").classList.add("error");
  document.querySelector(".tooltip p").innerText = "Message not delivered!";

  document.querySelector(".btn-close-tooltip").addEventListener("click", () => {
    document.querySelector(".tooltip").classList.remove("error");
  });
}
// End of Deliver Message
