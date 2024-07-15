const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const balance = document.getElementById("balance");
const expense = document.getElementById("expense");
const income = document.getElementById("income");
const form = document.getElementById("transactionForm");
const nameOf = document.getElementById("name");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const list = document.getElementById("transactionList");
const status = document.getElementById("status");

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
});

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(this);

  transactions.push({
    id: transactions.length + 1,
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: "on" === formData.get("type") ? "income" : "expense",
  });

  this.reset();
  saveTransaction();
  renderList();
}

function renderList() {
  list.innerHTML = "";

  // status.textContent = "";
  // if (transactions.length === 0) {
  //   status.textContent = "No transactions yet.";
  //   return;
  // }

  transactions.forEach(({ id, name, amount, date, type }) => {
    let sign = "income" === type ? 1 : -1;
    const li = document.createElement("li");

    li.innerHTML = `
            <p>${new Date(date).toLocaleDateString()}</p>
            <div class = "name">
              <h4>${name}</h4>
            </div>
            <div class="amount ${type}">
              <span>${formatter.format(amount * sign)}</span>
            </div>
            
          `;
    list.appendChild(li);
  });
}

function saveTransaction() {
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  localStorage.setItem("transactions", JSON.stringify(transactions));
}
