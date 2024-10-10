let todoListDataBase = [
    {
        id: 1,
        content: "Hit the gyms",
        status: true,
    },
    {
        id: 2,
        content: "Buy eggs",
        status: false,
    },
    {
        id: 3,
        content: "Read a book",
        status: false,
    },
    {
        id: 4,
        content: "Pay bills",
        status: false,
    },
];

localStorage.setItem("todoList", JSON.stringify(todoListDataBase));