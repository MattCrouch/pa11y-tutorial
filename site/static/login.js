(function() {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch("/login", {
      body: new FormData(loginForm),
      headers: {
        Accept: "application/json"
      },
      method: "POST"
    });
  });
})();
