// I changed the id and amount to strings because I couldn't figure out how to get the query parameters to work with numbers. Is there a best practice for this?
const expenses = [
    {
        id: "1",
        name: "groceries",
        amount: "200",
        date: "7/1/2024",
    },
    {
        id: "2",
        name: "movies",
        amount: "40",
        date: "7/5/2024",
    },
    {
        id: "3",
        name: "seamless",
        amount: "50",
        date: "7/6/2024",
    }
]

module.exports = expenses