/* =========================================================
   Payoo Mobile Banking
   Authentication JavaScript
   ========================================================= */


/* =========================================================
   Login Form
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Find the login form.
  const loginForm = document.getElementById("loginForm");

  // Stop if this page does not contain a login form.
  if (!loginForm) {
    return;
  }


  /* =======================================================
     Login Form Submit Event
     ======================================================= */

  loginForm.addEventListener("submit", event => {

    // Prevent the browser from refreshing the page.
    event.preventDefault();


    /* =====================================================
       Get User Input
       ===================================================== */

    const phoneInput =
      document.getElementById("loginPhone");

    const pinInput =
      document.getElementById("loginPin");

    const messageElement =
      document.getElementById("loginMessage");


    // Remove unnecessary spaces from the input values.
    const phone = phoneInput.value.trim();
    const pin = pinInput.value.trim();


    /* =====================================================
       Validate Login Information
       ===================================================== */

    const isValidLogin =
      phone === DEMO_PHONE &&
      pin === DEMO_PIN;


    /* =====================================================
       Successful Login
       ===================================================== */

    if (isValidLogin) {

      // Save the login state in localStorage.
      localStorage.setItem(
        "payooLoggedIn",
        "true"
      );

      // Redirect the user to the home page.
      window.location.href = "home.html";

      return;
    }


    /* =====================================================
       Failed Login
       ===================================================== */

    showMessage(
      messageElement,
      "Wrong demo number or PIN. Use 01700000000 / 1234.",
      false
    );
  });
});