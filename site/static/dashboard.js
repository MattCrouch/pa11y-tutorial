(function() {
  const issueLink = document.querySelectorAll(".issue a");

  for (let i = 0; i < issueLink.length; i++) {
    issueLink[i].addEventListener("click", function(e) {
      e.preventDefault();
      const details = e.target.parentElement.querySelector(".details");

      if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
      } else {
        details.classList.add("hidden");
      }
    });
  }
})();
