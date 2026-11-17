/* =========================================================
   Payoo Mobile Banking
   Bonus JavaScript
   ========================================================= */


/* =========================================================
   Bonus Page Initialization
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Find the bonus button and message element.
  const bonusButton =
    document.getElementById("claimBonus");

  const bonusMessage =
    document.getElementById("bonusMessage");


  // Stop if the bonus button does not exist.
  if (!bonusButton) {
    return;
  }


  /* =======================================================
     Check Previous Bonus Claim
     ======================================================= */

  const hasClaimedBonus =
    localStorage.getItem("payooBonusClaimed") === "true";


  // If the bonus has already been claimed,
  // disable the button immediately.
  if (hasClaimedBonus) {

    bonusButton.disabled = true;

    bonusButton.textContent =
      "Bonus Already Claimed";
  }


  /* =======================================================
     Claim Bonus Event
     ======================================================= */

  bonusButton.addEventListener("click", () => {

    /* =====================================================
       Prevent Multiple Claims
       ===================================================== */

    const bonusAlreadyClaimed =
      localStorage.getItem("payooBonusClaimed") === "true";


    // Stop if the bonus was already claimed.
    if (bonusAlreadyClaimed) {
      return;
    }


    /* =====================================================
       Add Bonus To Wallet
       ===================================================== */

    const bonusAmount = 50;

    // Add ৳50 to the current wallet balance.
    setBalance(
      getBalance() + bonusAmount
    );


    /* =====================================================
       Add Bonus To Transaction History
       ===================================================== */

    addTransaction(
      "Welcome Bonus",
      bonusAmount,
      "credit",
      "🎁"
    );


    /* =====================================================
       Save Bonus Claim Status
       ===================================================== */

    localStorage.setItem(
      "payooBonusClaimed",
      "true"
    );


    /* =====================================================
       Update Button
       ===================================================== */

    bonusButton.disabled = true;

    bonusButton.textContent =
      "Bonus Claimed ✓";


    /* =====================================================
       Show Success Message
       ===================================================== */

    showMessage(
      bonusMessage,
      "৳50 bonus added to your wallet!"
    );
  });
});