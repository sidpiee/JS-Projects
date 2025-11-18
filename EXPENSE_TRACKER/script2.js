document.addEventListener("DOMContentLoaded", function () {
  let expense_form = document.getElementById("expense-form");
  let expense_name = document.getElementById("expense-name");
  let expense_amount = document.getElementById("expense-amount");
  let expense_list = document.getElementById("expense-list");
  let total_display = document.getElementById("total-box");
  let total = document.getElementById("total");
  let expenseword = document.getElementById("expense-word");
  let expenses = JSON.parse(localStorage.getItem("expenses2")) || [];
  renderexpense();
  calculatetotal();

  expense_form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = expense_name.value.trim();
    let amount = expense_amount.value.trim();
    if (name && amount > 0) {
      let expense = {
        name,
        amount,
        id: Date.now(),
      };
      expenses.push(expense);
      saveexpenses();
      renderexpense();
      calculatetotal();
      expense_name.value = "";
      expense_amount.value = "";
    } else {
      alert("amount should be greater then 0");
      expense_amount.value = "";
      expense_name.value = "";
    }
  });

  function renderexpense() {
    expense_list.innerHTML = "";
    expenses.forEach((expense) => {
      let li = document.createElement("li");
      li.className =
        "flex justify-between w-100 bg-linear-to-l from-blue-400 to-blue-500 p-3 rounded-xl items-center border-blue-900 border mb-7";

      li.innerHTML = ` <p class="text-white/80 font-[Fredoka] text-3xl">
            ${expense.name} : <span>$${expense.amount}</span>
          </p>
          <button
            class="bg-blue-600 hover:bg-blue-800/70 p-2 rounded-xl cursor-pointer transition-all ease-out duration-150 border-blue-950 border-2 hover:scale-110" data-id = ${expense.id}
          >
            Remove
          </button>`;
      expense_list.appendChild(li);
      total_display.classList.remove("hidden");
      expenseword.classList.remove("hidden");
    });
  }

  expense_list.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let eid = e.target.getAttribute("data-id");
      expenses = expenses.filter((item) => item.id != eid);
      renderexpense();
      saveexpenses();
      calculatetotal();

      if (expenses.length === 0) {
        total_display.classList.add("hidden");
        expenseword.classList.add("hidden");
      }
    }
  });

  function calculatetotal() {
    let money = 0;
    expenses.forEach((expense) => {
      money += parseInt(expense.amount);
    });
    total.textContent = `$ ${money}`;
  }

  function saveexpenses() {
    localStorage.setItem("expenses2", JSON.stringify(expenses));
  }
});
