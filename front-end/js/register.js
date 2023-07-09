import { ApiRequest } from "./request.js";

export class Register {
  static createUser() {
    const nameInput = document.querySelector(".nameInput");
    const emailInput = document.querySelector(".emailInput");
    const birthdayInput = document.querySelector(".birthdayInput");
    const avatarInput = document.querySelector(".avatarInput");
    const passwordInput = document.querySelector(".passwordInput");
    const btnRegister = document.querySelector(".btnRegister");

    btnRegister.addEventListener("click", async (event) => {
      event.preventDefault();

      const data = {
        name: nameInput.value,
        email: emailInput.value,
        date_birth: birthdayInput.value,
        avatar: avatarInput.value,
        password: passwordInput.value,
      };
      await ApiRequest.createUser(data);
      window.location.assign("../index.html");
    });
  }
}

Register.createUser();
