import { ApiRequest } from "./request.js";

export class LoginPage {
  static renderLoginPage() {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.assign("../homepage/homepage.html");
    }

    const emailInput = document.querySelector(".emailInput");
    const passwordInput = document.querySelector(".passwordInput");
    const btnLogin = document.querySelector(".btnLogin");
    const btnRegister = document.querySelector(".btnRegister");
    btnLogin.addEventListener("click", (event) => {
      event.preventDefault();

      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      };
      ApiRequest.login(data);
    });

    btnRegister.addEventListener("click", async (event) => {
      event.preventDefault();

      window.location.assign("./register/register.html");
    });
  }
}

LoginPage.renderLoginPage();
