let notificationHolder = null;

const getDom = () => {
  notificationHolder = document.querySelector(".js-notifications");
};

const showNotification = (message, undoCallback) => {
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("c-notification");

  const messageElement = document.createElement("p");
  messageElement.innerText = message;
  messageElement.classList.add("c-notification__message");

  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="arcs"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>`;

  buttonElement.classList.add("c-notification__button");
  buttonElement.addEventListener("click", function () {
    notificationHolder.removeChild(notificationElement); //sketchy
  });

  notificationElement.appendChild(messageElement);
  notificationElement.appendChild(buttonElement);
  notificationHolder.appendChild(notificationElement);
};

document.addEventListener("DOMContentLoaded", function () {
  getDom();
});
