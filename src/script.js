const transactions = JSON.parse(sessionStorage.getItem("transactions")) || [];
const balance = document.getElementById("balance");
const expense = document.getElementById("expense");
const income = document.getElementById("income");
const form = document.getElementById("transactionForm");
const nameOf = document.getElementById("name");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const list = document.getElementById("transactionList");
const tranStatus = document.getElementById("status");

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
});

form.addEventListener("submit", addTransaction);

function renderList() {
  list.innerHTML = "";

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
            <div class="action">
            <svg width="150" height="100" xmlns="http://www.w3.org/2000/svg" onclick="deleteTransaction(${id})">
              <circle cx="75" cy="50" r="20" fill="red" />
              <text x="75" y="60" font-size="30" text-anchor="middle" fill="white">X</text>
              Sorry, your browser does not support inline SVG.  
            </svg> 
      </div>
          `;
    list.appendChild(li);
  });
}

renderList();

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

function deleteTransaction() {
  let index = transactions.findIndex((trans) => trans.id === id);
  transactions.splice(index, 1);

  saveTransaction();
  renderList();
}

function saveTransaction() {
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  sessionStorage.setItem("transactions", JSON.stringify(transactions));
}
