import { ApiRequest } from "./request.js";

class Homepage {
  static async user() {
    const data = await ApiRequest.getUser();
    const section = document.querySelector(".sectionHeader");
    const avatar = document.createElement("img");
    const dateBirth = document.createElement("h3");

    let countDownBirth = new Date(data.date_birth);
    let now = new Date();

    const birthdayThisYear = new Date(
      now.getFullYear(),
      countDownBirth.getMonth(),
      countDownBirth.getDate()
    );

    if (now > birthdayThisYear) {
      birthdayThisYear.setFullYear(birthdayThisYear.getFullYear() + 1);
    }

    const diffEmMilissegundos = birthdayThisYear.getTime() - now.getTime();
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;

    const days = Math.floor(diffEmMilissegundos / umDiaEmMilissegundos);
    const months = Math.floor(days / 30);

    dateBirth.innerHTML = months + " meses e " + (days % 30) + "dias";
    avatar.classList.add("avatar");
    avatar.src = data.avatar;

    section.append(avatar, dateBirth);
  }

  static async logOut() {
    const btnLogout = document.querySelector(".btnLogout");
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.clear();
      window.location.assign("../index.html");
    });
  }
}

Homepage.user();
Homepage.logOut();
