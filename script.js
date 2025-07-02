// script.js
document.getElementById("usernameForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("username").value.trim();
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    localStorage.setItem("userName", name);
    window.location.href = "motivate.html";
  });
  