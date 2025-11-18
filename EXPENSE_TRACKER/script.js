document.addEventListener("DOMContentLoaded", function () {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let expense_form = document.getElementById("expense-form");
  let expense_name = document.getElementById("expense-name");
  let expense_amount = document.getElementById("expense-amount");
  let expense_list = document.getElementById("expense-list");
  let total_display = document.getElementById("total-box");
  let total = document.getElementById("total");
  let expenseword = document.getElementById("expense-word");

  let money = 0;

  expenses.forEach((element) => {
    renderexpense(element);
  });

  expense_form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = expense_name.value.trim();
    let amount = expense_amount.value.trim();

    if (name && amount > 0) {
      let expense = {
        expenseName: name,
        expenseAmount: amount,
        id: Date.now(),
      };
      expenses.push(expense);
      savetasks(expenses);
      expense_name.value = "";
      expense_amount.value = "";
      renderexpense(expense);
    }

    if (amount < 0) {
      alert("amount should be greater then 0");
      expense_name.value = "";
      expense_amount.value = "";
    }
  });

  function renderexpense(expense) {
    let li = document.createElement("li");
    li.className =
      "flex justify-between w-100 bg-linear-to-l from-blue-400 to-blue-500 p-3 rounded-xl items-center border-blue-900 border mb-7";

    li.innerHTML = ` <p class="text-white/80 font-[Fredoka] text-3xl">
            ${expense.expenseName} : <span>$${expense.expenseAmount}</span>
          </p>
          <button
            class="bg-blue-600 hover:bg-blue-800/70 p-2 rounded-xl cursor-pointer transition-all ease-out duration-150 border-blue-950 border-2 hover:scale-110" data-id = ${expense.id}
          >
            Remove
          </button>`;
    expense_list.appendChild(li);

    total_display.classList.remove("hidden");
    expenseword.classList.remove("hidden");

    money += parseInt(expense.expenseAmount);

    total.textContent = `$ ${money}`;
  }

  expense_list.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let id = parseInt(e.target.getAttribute("data-id"));
      let current_exp = expenses.find((item) => item.id === id);
      expenses = expenses.filter((item) => item.id != id);
      savetasks(expenses);
      money -= parseInt(current_exp.expenseAmount);
      total.textContent = `$ ${money}`;
      e.target.closest("li").remove();

      if (!expenses.length) {
        total_display.classList.add("hidden");
        expenseword.classList.add("hidden");
      }
    }
  });

  function savetasks(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
});
