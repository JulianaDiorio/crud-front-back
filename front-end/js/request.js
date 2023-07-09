export class ApiRequest {
  static baseUrl = "http://localhost:3000/";
  static token = localStorage.getItem("@token") || "";
  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  static async login(body) {
    const userLogin = await fetch(`${this.baseUrl}login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("@token", response.token);
        localStorage.setItem("@userId", response.userId);
        window.location.assign("../homepage/homepage.html");
        console.log(response);
      })
      .catch((err) => console.log(err));

    return userLogin;
  }

  static async createUser(body) {
    const userRegister = await fetch(`${this.baseUrl}users`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response, body);

        return response;
      })
      .catch((err) => console.error(err));

    return userRegister;
  }

  static async getUser() {
    const resp = await fetch(`${this.baseUrl}users`, {
      method: "GET",
      headers: this.headers,
    });
    const data = resp.json();
    const result = await data;
    localStorage.setItem("result", JSON.stringify(result));

    return result;
  }

  static async deleteUser(id) {
    const resp = await fetch(`${this.baseUrl}users/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).catch((error) => console(error));

    return resp;
  }
}
