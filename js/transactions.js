/* =========================================================
   Payoo Mobile Banking
   Transaction History JavaScript
   ========================================================= */


/* =========================================================
   Render Transactions
   ========================================================= */

/**
 * Display transactions based on the selected filter.
 *
 * Available filters:
 * - all
 * - credit
 * - debit
 *
 * @param {string} filter
 */
function renderTransactions(filter = "all") {

  // Find the transaction list container.
  const transactionList =
    document.getElementById("transactionList");


  // Stop if the container does not exist.
  if (!transactionList) {
    return;
  }


  /* =======================================================
     Get Transactions
     ======================================================= */

  let transactions = getTransactions();


  /* =======================================================
     Apply Transaction Filter
     ======================================================= */

  if (filter !== "all") {

    transactions = transactions.filter(
      transaction => transaction.type === filter
    );
  }


  /* =======================================================
     Handle Empty Transaction List
     ======================================================= */

  if (transactions.length === 0) {

    transactionList.innerHTML = `
      <div class="text-center text-slate-500 py-10">
        No transactions found.
      </div>
    `;

    return;
  }


  /* =======================================================
     Create Transaction Cards
     ======================================================= */

  transactionList.innerHTML =
    transactions
      .map(transaction => {

        // Determine the transaction sign.
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
   Transaction Filter Buttons
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Display all transactions when the page loads.
  renderTransactions();


  // Find all transaction filter buttons.
  const filterButtons =
    document.querySelectorAll(".filter-btn");


  /* =======================================================
     Add Click Event To Each Filter
     ======================================================= */

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      /* ===================================================
         Remove Active State
         =================================================== */

      filterButtons.forEach(filterButton => {
        filterButton.classList.remove("active");
      });


      /* ===================================================
         Activate Selected Button
         =================================================== */

      button.classList.add("active");


      /* ===================================================
         Get Selected Filter
         =================================================== */

      const selectedFilter =
        button.dataset.filter;


      /* ===================================================
         Render Filtered Transactions
         =================================================== */

      renderTransactions(selectedFilter);
    });
  });
});