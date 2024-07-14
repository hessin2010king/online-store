const content = document.querySelector(".content");
const aleart = document.querySelector(".aleart");
let notifcations = document.querySelector(".notifcations");


export function notificationDvi(text, background) {
  notifcations.textContent = text;
  notifcations.style.transform = "translate(0px)";

  // Expand the notification div
  setTimeout(() => {
    expandDiv(background);
  }, 100);

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notifcations.style.transform = "translate(350px)";
  }, 3000);
}

export function expandDiv(background) {
  let myDiv = document.createElement("div");
  myDiv.classList.add("mydiv");
  notifcations.appendChild(myDiv);
  myDiv.style.width = "0%";

  // Animate the width of the div to 100%
  setTimeout(() => {
    myDiv.style.width = "100%";
  }, 10);

  myDiv.style.transition = "width 2s linear";
  myDiv.style.background = background;

  return myDiv;
}

export function closeAleart(error) {
  aleart.addEventListener("click", (e) => {
    aleart.style.display = "none";
    content.textContent = error;
  });
}

export function openAleart(text) {
  aleart.style.display = "flex";
  content.textContent = text;
}
