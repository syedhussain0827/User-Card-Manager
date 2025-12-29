let form = document.querySelector("form");
let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");
let usersContainer = document.querySelector(".users");

const userManager = {
  users: [],

  init: function () {
    this.loadFromLocalStorage();
    this.renderUi();
    form.addEventListener("submit", this.submitForm.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },

  addUser: function () {
    this.users.push({
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    });

    this.saveToLocalStorage();
    form.reset();
    this.renderUi();
  },

  saveToLocalStorage: function () {
    localStorage.setItem("users", JSON.stringify(this.users));
  },

  loadFromLocalStorage: function () {
    const data = localStorage.getItem("users");
    if (data) {
      this.users = JSON.parse(data);
    }
  },

  renderUi: function () {
    usersContainer.innerHTML = "";

    this.users.forEach((user, index) => {
      const card = document.createElement("div");
      card.className =
        "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition";

      // Image
      const img = document.createElement("img");
      img.src = user.photo;
      img.alt = "User Photo";
      img.className =
        "w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow";
      card.appendChild(img);

      // Name
      const name = document.createElement("h2");
      name.textContent = user.username;
      name.className = "text-2xl font-bold mb-1 text-blue-700";
      card.appendChild(name);

      // Role
      const roleEl = document.createElement("p");
      roleEl.textContent = user.role;
      roleEl.className = "text-purple-500 mb-2 font-medium";
      card.appendChild(roleEl);

      // Bio
      const desc = document.createElement("p");
      desc.textContent = user.bio;
      desc.className = "text-gray-700 text-center";
      card.appendChild(desc);

      usersContainer.appendChild(card);
    });
  },
};

userManager.init();
