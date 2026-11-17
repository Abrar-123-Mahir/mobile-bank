/* =========================================================
   Payoo Mobile Banking
   Home Page JavaScript
   ========================================================= */


/* =========================================================
   Render Recent Transactions
   ========================================================= */

/**
 * Display the latest transactions on the home page.
 *
 * Only the four most recent transactions are displayed.
 */
function renderHomeTransactions() {

  // Find the transaction container.
  const transactionContainer =
    document.getElementById("homeTransactions");


  // Stop if the container does not exist.
  if (!transactionContainer) {
    return;
  }


  /* =======================================================
     Get Recent Transactions
     ======================================================= */

  const transactions =
    getTransactions().slice(0, 4);


  /* =======================================================
     Create Transaction HTML
     ======================================================= */

  transactionContainer.innerHTML =
    transactions
      .map(transaction => {

        // Determine whether the transaction is
        // money coming in or going out.
        const transactionSign =
          transaction.type === "credit"
            ? "+"
            : "-";


        // Create the transaction card.
        return `
          <div class="txn">

            <!-- Transaction Icon -->
            <div class="txn-icon">
              ${transaction.icon}
            </div>


            <!-- Transaction Information -->
            <div class="txn-info">

              <div class="txn-title">
                ${transaction.title}
              </div>

              <div class="txn-date">
                ${transaction.date}
              </div>

            </div>


            <!-- Transaction Amount -->
            <div class="txn-amount ${transaction.type}">
              ${transactionSign}${formatMoney(transaction.amount)}
            </div>

          </div>
        `;
      })
      .join("");
}


/* =========================================================
   Page Initialization
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  renderHomeTransactions
);