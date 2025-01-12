// Interface for book records
interface BookRecord {
    user: string;
    book: string;
    issueDate: string;
    returnDate: string;
    returned: boolean;
  }
  
  // Initialize book records from localStorage or use default data
  const bookRecords: BookRecord[] = JSON.parse(localStorage.getItem('bookRecords') || '[]') || [
    { user: 'John Doe', book: 'Book Title 1', issueDate: '01/01/2025', returnDate: '01/15/2025', returned: false },
    { user: 'Jane Smith', book: 'Book Title 2', issueDate: '01/05/2025', returnDate: '01/20/2025', returned: false }
  ];
  
  function saveRecords(records: BookRecord[]) {
    localStorage.setItem('bookRecords', JSON.stringify(records));
  }
  
  function renderTable(records: BookRecord[]) {
    const tbody = document.querySelector('tbody')!;
    tbody.innerHTML = '';
  
    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.user}</td>
            <td>${record.book}</td>
            <td>${record.issueDate}</td>
            <td>${record.returnDate}</td>
            <td>
                ${record.returned ? '<p>Returned</p>' : '<a href="#" class="btn btn-primary btn-sm return-btn">Return</a>'}
            </td>
        `;
        tbody.appendChild(row);
    });
  
    document.querySelectorAll('.return-btn').forEach((btn, index) => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            bookRecords[index].returned = true;
            saveRecords(bookRecords);
            renderTable(bookRecords);
        });
    });
  }
  function returned() {
    document.getElementById("returned")?.classList.remove('btn');
    document.getElementById("returned")?.classList.remove('btn-primary');
    document.getElementById("returned")?.classList.remove('btn-sm');
    document.getElementById("returned").innerHTML ="returned";
    document.getElementById("returned").style.color="green";
  
  
  
    
  
  
    
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderTable(bookRecords);
  
    const searchBar = document.querySelector<HTMLInputElement>('input[type="search"]')!;
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredRecords = bookRecords.filter(record => 
            record.user.toLowerCase().includes(query) || 
            record.book.toLowerCase().includes(query)
    );
        renderTable(filteredRecords);
    });
  });
  