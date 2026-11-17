/* =========================================================
   Payoo Mobile Banking
   Shared Application JavaScript
   ========================================================= */


/* =========================================================
   Demo Account Configuration
   ========================================================= */

const DEMO_PIN = "1234";
const DEMO_PHONE = "01700000000";


/* =========================================================
   Balance Management
   ========================================================= */

/**
 * Get the current wallet balance.
 *
 * If no balance has been saved in localStorage,
 * the application starts with a demo balance of ৳45,000.
 *
 * @returns {number} Current wallet balance
 */
function getBalance() {
  const savedBalance = localStorage.getItem("payooBalance");

  if (savedBalance === null) {
    return 45000;
  }

  return Number(savedBalance);
}


/**
 * Update and save the wallet balance.
 *
 * @param {number} amount - New wallet balance
 */
function setBalance(amount) {
  localStorage.setItem(
    "payooBalance",
    String(amount)
  );

  updateBalanceText();
}


/**
 * Format an amount as Bangladeshi Taka.
 *
 * Example:
 * 45000 → ৳45,000
 *
 * @param {number} amount
 * @returns {string}
 */
function formatMoney(amount) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}


/* =========================================================
   Transaction Management
   ========================================================= */

/**
 * Get all saved transactions.
 *
 * If there are no saved transactions, a few demo
 * transactions are created automatically.
 *
 * @returns {Array} Transaction list
 */
function getTransactions() {
  const savedTransactions =
    localStorage.getItem("payooTransactions");

  // Return saved transactions if available.
  if (savedTransactions) {
    return JSON.parse(savedTransactions);
  }

  // Default demo transactions.
  const starterTransactions = [
    {
      title: "Electricity Bill",
      date: "Today 01:44 AM",
      amount: 800,
      type: "debit",
      icon: "🧾"
    },

    {
      title: "Bank Deposit",
      date: "Today 01:44 AM",
      amount: 5000,
      type: "credit",
      icon: "💳"
    },

    {
      title: "Mobile Recharge",
      date: "Today 01:44 AM",
      amount: 200,
      type: "debit",
      icon: "📱"
    },

    {
      title: "Gas Bill",
      date: "Today 01:44 AM",
      amount: 900,
      type: "debit",
      icon: "🧾"
    }
  ];

  // Save the demo transactions.
  localStorage.setItem(
    "payooTransactions",
    JSON.stringify(starterTransactions)
  );

  return starterTransactions;
}


/**
 * Save transactions to localStorage.
 *
 * @param {Array} transactions
 */
function saveTransactions(transactions) {
  localStorage.setItem(
    "payooTransactions",
    JSON.stringify(transactions)
  );
}


/**
 * Add a new transaction to the transaction history.
 *
 * @param {string} title - Transaction title
 * @param {number} amount - Transaction amount
 * @param {"credit"|"debit"} type - Money in or money out
 * @param {string} icon - Transaction icon
 */
function addTransaction(
  title,
  amount,
  type,
  icon = "💳"
) {
  const transactions = getTransactions();

  const newTransaction = {
    title,
    amount: Number(amount),
    type,
    icon,
    date: "Just now"
  };

  // Add newest transaction to the beginning.
  transactions.unshift(newTransaction);

  saveTransactions(transactions);
}


/* =========================================================
   UI Helpers
   ========================================================= */

/**
 * Update all balance elements on the current page.
 *
 * Every element with id="balance" will be updated.
 */
function updateBalanceText() {
  const balanceElements =
    document.querySelectorAll("#balance");

  balanceElements.forEach(element => {
    element.textContent = formatMoney(getBalance());
  });
}


/**
 * Display a success or error message.
 *
 * @param {HTMLElement} element
 * @param {string} message
 * @param {boolean} success
 */
function showMessage(
  element,
  message,
  success = true
) {
  if (!element) {
    return;
  }

  element.textContent = message;

  element.className = `
    text-center
    text-sm
    mt-3
    ${success ? "text-green-600" : "text-red-500"}
  `;
}


/* =========================================================
   Authentication
   ========================================================= */

/**
 * Check whether the user is logged in.
 *
 * If the user is not logged in, they are redirected
 * to the login page.
 *
 * @returns {boolean}
 */
function requireLogin() {
  const isLoggedIn =
    localStorage.getItem("payooLoggedIn") === "true";

  if (!isLoggedIn) {
    window.location.href = "index.html";

    return false;
  }

  return true;
}


/**
 * Log the user out of the application.
 */
function logout() {
  localStorage.removeItem("payooLoggedIn");

  window.location.href = "index.html";
}


/* =========================================================
   Page Protection
   ========================================================= */

// Login page has #loginForm.
// All other pages require authentication.
if (
  document.querySelector(".phone-shell") &&
  !document.getElementById("loginForm")
) {
  requireLogin();
}


/* =========================================================
   Initial Page Setup
   ========================================================= */

// Display the current balance.
updateBalanceText();


/* =========================================================
   Navigation Events
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const logoutButtons =
    document.querySelectorAll(
      "#logoutBtn, #navLogout"
    );

  logoutButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      logout();
    });
  });
});