(function() {
  const loginForm = document.querySelector(".login-form");

  const showWarning = (visible = false) => {
    const feedback = loginForm.querySelector(".feedback");

    if (feedback) {
      loginForm.removeChild(feedback);
    }

    if (visible) {
      const div = document.createElement("div");
      div.className = "feedback";
      div.innerText = "Could not log in please try again";
      loginForm.prepend(div);
    }
  };

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    showWarning(false);

    fetch("/login", {
      body: new FormData(loginForm),
      headers: {
        Accept: "application/json"
      },
      method: "POST"
    })
      .then(function(resp) {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp;
      })
      .then(function() {
        // Success
        window.location.href = "/";
      })
      .catch(function() {
        // Fail
        loginForm.reset();
        showWarning(true);
      });
  });
})();
