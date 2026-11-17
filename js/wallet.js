/* =========================================================
   Payoo Mobile Banking
   Wallet Services JavaScript
   ========================================================= */


/* =========================================================
   Page Initialization
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Get all wallet service forms.
  const addMoneyForm =
    document.getElementById("addMoneyForm");

  const cashoutForm =
    document.getElementById("cashoutForm");

  const transferForm =
    document.getElementById("transferForm");

  const billForm =
    document.getElementById("billForm");


  /* =======================================================
     Add Money
     ======================================================= */

  if (addMoneyForm) {

    addMoneyForm.addEventListener("submit", event => {

      // Prevent page refresh.
      event.preventDefault();


      // Get form values.
      const amount =
        Number(document.getElementById("amount").value);

      const pin =
        document.getElementById("pin").value;

      const source =
        document.getElementById("source").value;

      const message =
        document.getElementById("formMessage");


      /* ---------------------------------------------------
         Validate Input
         --------------------------------------------------- */

      if (!validAmount(amount) || pin !== DEMO_PIN) {

        showMessage(
          message,
          "Enter a valid amount and the correct 4-digit PIN.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Update Balance
         --------------------------------------------------- */

      setBalance(
        getBalance() + amount
      );


      /* ---------------------------------------------------
         Add Transaction
         --------------------------------------------------- */

      addTransaction(
        `Add Money - ${source}`,
        amount,
        "credit",
        "💳"
      );


      /* ---------------------------------------------------
         Reset Form
         --------------------------------------------------- */

      addMoneyForm.reset();


      /* ---------------------------------------------------
         Show Success Message
         --------------------------------------------------- */

      showMessage(
        message,
        `${formatMoney(amount)} added successfully!`
      );
    });
  }


  /* =======================================================
     Cashout
     ======================================================= */

  if (cashoutForm) {

    cashoutForm.addEventListener("submit", event => {

      // Prevent page refresh.
      event.preventDefault();


      // Get form values.
      const agent =
        document.getElementById("agent").value.trim();

      const amount =
        Number(document.getElementById("amount").value);

      const pin =
        document.getElementById("pin").value;

      const message =
        document.getElementById("formMessage");


      /* ---------------------------------------------------
         Validate Input
         --------------------------------------------------- */

      if (
        agent.length !== 11 ||
        !validAmount(amount) ||
        pin !== DEMO_PIN
      ) {

        showMessage(
          message,
          "Check the agent number, amount and PIN.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Check Available Balance
         --------------------------------------------------- */

      if (amount > getBalance()) {

        showMessage(
          message,
          "Insufficient balance.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Deduct Money
         --------------------------------------------------- */

      setBalance(
        getBalance() - amount
      );


      /* ---------------------------------------------------
         Add Transaction
         --------------------------------------------------- */

      addTransaction(
        `Cashout - ${agent}`,
        amount,
        "debit",
        "💵"
      );


      /* ---------------------------------------------------
         Reset Form
         --------------------------------------------------- */

      cashoutForm.reset();


      /* ---------------------------------------------------
         Show Success Message
         --------------------------------------------------- */

      showMessage(
        message,
        `${formatMoney(amount)} cashed out successfully!`
      );
    });
  }


  /* =======================================================
     Transfer Money
     ======================================================= */

  if (transferForm) {

    transferForm.addEventListener("submit", event => {

      // Prevent page refresh.
      event.preventDefault();


      // Get form values.
      const recipient =
        document.getElementById("recipient").value.trim();

      const amount =
        Number(document.getElementById("amount").value);

      const pin =
        document.getElementById("pin").value;

      const message =
        document.getElementById("formMessage");


      /* ---------------------------------------------------
         Validate Input
         --------------------------------------------------- */

      if (
        recipient.length !== 11 ||
        !validAmount(amount) ||
        pin !== DEMO_PIN
      ) {

        showMessage(
          message,
          "Enter a valid 11-digit number, amount and PIN.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Check Available Balance
         --------------------------------------------------- */

      if (amount > getBalance()) {

        showMessage(
          message,
          "Insufficient balance.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Deduct Money
         --------------------------------------------------- */

      setBalance(
        getBalance() - amount
      );


      /* ---------------------------------------------------
         Add Transaction
         --------------------------------------------------- */

      addTransaction(
        `Transfer to ${recipient}`,
        amount,
        "debit",
        "💸"
      );


      /* ---------------------------------------------------
         Reset Form
         --------------------------------------------------- */

      transferForm.reset();


      /* ---------------------------------------------------
         Show Success Message
         --------------------------------------------------- */

      showMessage(
        message,
        `${formatMoney(amount)} transferred successfully!`
      );
    });
  }


  /* =======================================================
     Pay Bill
     ======================================================= */

  if (billForm) {

    billForm.addEventListener("submit", event => {

      // Prevent page refresh.
      event.preventDefault();


      // Get form values.
      const billType =
        document.getElementById("billType").value;

      const account =
        document.getElementById("account").value.trim();

      const amount =
        Number(document.getElementById("amount").value);

      const pin =
        document.getElementById("pin").value;

      const message =
        document.getElementById("formMessage");


      /* ---------------------------------------------------
         Validate Input
         --------------------------------------------------- */

      if (
        !account ||
        !validAmount(amount) ||
        pin !== DEMO_PIN
      ) {

        showMessage(
          message,
          "Enter the bill account, amount and correct PIN.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Check Available Balance
         --------------------------------------------------- */

      if (amount > getBalance()) {

        showMessage(
          message,
          "Insufficient balance.",
          false
        );

        return;
      }


      /* ---------------------------------------------------
         Deduct Money
         --------------------------------------------------- */

      setBalance(
        getBalance() - amount
      );


      /* ---------------------------------------------------
         Add Transaction
         --------------------------------------------------- */

      addTransaction(
        billType,
        amount,
        "debit",
        "🧾"
      );


      /* ---------------------------------------------------
         Reset Form
         --------------------------------------------------- */

      billForm.reset();


      /* ---------------------------------------------------
         Show Success Message
         --------------------------------------------------- */

      showMessage(
        message,
        `${billType} paid successfully!`
      );
    });
  }
});


/* =========================================================
   Amount Validation
   ========================================================= */

/**
 * Check whether the entered amount is valid.
 *
 * Minimum transaction amount: ৳10
 *
 * @param {number} amount
 * @returns {boolean}
 */
function validAmount(amount) {

  return (
    Number.isFinite(amount) &&
    amount >= 10
  );
}