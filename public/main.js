const currentPassword = document.querySelector("#current-password");
const authNewUsername = document.querySelector("#authNewUsername");
const authNewEmail = document.querySelector("#authNewEmail");
const authNewPassword = document.querySelector("#authNewPassword");

if (currentPassword) {
  currentPassword.addEventListener("change", e => {
    const value = e.target.value;
    authNewUsername.value = value;
    authNewEmail.value = value;
    authNewPassword.value = value;
  });
}
