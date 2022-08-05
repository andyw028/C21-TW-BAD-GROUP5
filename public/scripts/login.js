window.onload = () => {
    logIn();
  };
  
  function logIn() {
    const logIn = document.querySelector("#login-form");
    if (!logIn) {
      return;
    }
    logIn.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const form = event.target;

      const username = form.username.value;
      const password = form.password.value;
  
      const resp = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await resp.json();
  
      if (!result.success) {
        console.log("Incorrect username or password");
      } else {
        window.location.href = "/login.html";
      }
    });
  }