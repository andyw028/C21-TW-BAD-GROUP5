window.onload = () => {
    logIn();
    signUp();
  };
  
  function logIn() {
    const logIn = document.querySelector(".login-form");
    if (!logIn) {
      return;
    }
    
    logIn.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const form = event.target;

      const username = form.username.value;
      const password = form.password.value;
  
      const resp = await fetch("/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await resp.json();
  
      if (!result.success) {
        console.log("Incorrect username or password");
      } else {
        window.location.href = "/dashboard.html";
      }
    });
  }

  function signUp() {
      const signUp = document.querySelector(".signup-form");
      if (!signUp) {
        return;
      }

      signUp.addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const form = event.target;
    
        const username = form.username.value;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        const email = form.email.value;
  

        const resp = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            password,
            email,
          }),
        });
    
        const result = await resp.json();
        if (!result.success) {
          alert("Create Account Failed ");
        } else {
          window.location.href = "/dashboard.html";
        }
      });
    }