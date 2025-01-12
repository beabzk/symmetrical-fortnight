// Initialize book records from localStorage or use default data
var bookRecords = JSON.parse(localStorage.getItem('bookRecords') || '[]') || [
    { user: 'John Doe', book: 'Book Title 1', issueDate: '01/01/2025', returnDate: '01/15/2025', returned: false },
    { user: 'Jane Smith', book: 'Book Title 2', issueDate: '01/05/2025', returnDate: '01/20/2025', returned: false }
];
function saveRecords(records) {
    localStorage.setItem('bookRecords', JSON.stringify(records));
}
function renderTable(records) {
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    records.forEach(function (record) {
        var row = document.createElement('tr');
        row.innerHTML = "\n            <td>".concat(record.user, "</td>\n            <td>").concat(record.book, "</td>\n            <td>").concat(record.issueDate, "</td>\n            <td>").concat(record.returnDate, "</td>\n            <td>\n                ").concat(record.returned ? '<p>Returned</p>' : '<a href="#" class="btn btn-primary btn-sm return-btn">Return</a>', "\n            </td>\n        ");
        tbody.appendChild(row);
    });
    document.querySelectorAll('.return-btn').forEach(function (btn, index) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            bookRecords[index].returned = true;
            saveRecords(bookRecords);
            renderTable(bookRecords);
        });
    });
}
function returned() {
    var _a, _b, _c;
    (_a = document.getElementById("returned")) === null || _a === void 0 ? void 0 : _a.classList.remove('btn');
    (_b = document.getElementById("returned")) === null || _b === void 0 ? void 0 : _b.classList.remove('btn-primary');
    (_c = document.getElementById("returned")) === null || _c === void 0 ? void 0 : _c.classList.remove('btn-sm');
    document.getElementById("returned").innerHTML = "returned";
    document.getElementById("returned").style.color = "green";
}
document.addEventListener('DOMContentLoaded', function () {
    renderTable(bookRecords);
    var searchBar = document.querySelector('input[type="search"]');
    searchBar.addEventListener('input', function () {
        var query = searchBar.value.toLowerCase();
        var filteredRecords = bookRecords.filter(function (record) {
            return record.user.toLowerCase().includes(query) ||
                record.book.toLowerCase().includes(query);
        });
        renderTable(filteredRecords);
    });
});
