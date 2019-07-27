(function() {
  const issueLink = document.querySelectorAll(".issue a");

  console.log(issueLink);
  for (let i = 0; i < issueLink.length; i++) {
    issueLink[i].addEventListener("click", function(e) {
      e.preventDefault();
      console.log("!!");
      const details = e.target.parentElement.querySelector(".details");

      if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
      } else {
        details.classList.add("hidden");
      }
    });
  }
})();
