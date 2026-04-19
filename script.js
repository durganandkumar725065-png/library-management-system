const authModal = document.getElementById('authModal');
const openLoginBtn = document.getElementById('openLoginBtn');
const openLoginBtn2 = document.getElementById('openLoginBtn2');
const closeModal = document.getElementById('closeModal');
const switchAuth = document.getElementById('switchAuth');
const authTitle = document.getElementById('authTitle');
const toggleText = document.getElementById('toggleText');
const authForm = document.getElementById('authForm');
const totalBooksEl = document.getElementById('totalBooks');
const issuedBooksEl = document.getElementById('issuedBooks');
const availableBooksEl = document.getElementById('availableBooks');
const bookListEl = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookLibrary = document.getElementById('bookLibrary');
const searchInput = document.getElementById('searchInput');
const libraryGrid = document.getElementById('libraryGrid');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

let isSignup = false;
let books = [
  { id: 1, title: 'Networked Libraries', author: 'R. Patel', library: 'Central Branch', issued: false },
  { id: 2, title: 'Distributed Systems', author: 'N. Garcia', library: 'East Hub', issued: true },
  { id: 3, title: 'AI in Education', author: 'K. Lin', library: 'North Library', issued: false },
];

const libraries = [
  { name: 'Central Branch', available: 32 },
  { name: 'East Hub', available: 24 },
  { name: 'North Library', available: 18 },
];

function updateDashboard() {
  const total = books.length;
  const issued = books.filter((book) => book.issued).length;
  const available = total - issued;
  totalBooksEl.textContent = total;
  issuedBooksEl.textContent = issued;
  availableBooksEl.textContent = available;
}

function renderLibraryCards() {
  libraryGrid.innerHTML = libraries
    .map(
      (library) => `
      <article class="library-card">
        <h3>${library.name}</h3>
        <p>Available: ${library.available}</p>
      </article>`
    )
    .join('');
}

function renderBookList(filter = '') {
  const normalized = filter.trim().toLowerCase();
  const visibleBooks = books.filter((book) => {
    if (!normalized) return true;
    return (
      book.title.toLowerCase().includes(normalized) ||
      book.author.toLowerCase().includes(normalized) ||
      book.library.toLowerCase().includes(normalized)
    );
  });

  if (visibleBooks.length === 0) {
    bookListEl.innerHTML = '<div class="book-card"><p>No books found. Try another search or add a new book.</p></div>';
    return;
  }

  bookListEl.innerHTML = visibleBooks
    .map(
      (book) => `
      <div class="book-card">
        <h4>${book.title}</h4>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Library:</strong> ${book.library}</p>
        <p><strong>Status:</strong> ${book.issued ? 'Issued' : 'Available'}</p>
        <div class="card-actions">
          <button class="btn btn-secondary" onclick="toggleIssue(${book.id})">${book.issued ? 'Return' : 'Issue'}</button>
        </div>
      </div>`
    )
    .join('');
}

function toggleIssue(id) {
  books = books.map((book) => {
    if (book.id === id) {
      return { ...book, issued: !book.issued };
    }
    return book;
  });
  updateDashboard();
  renderBookList(searchInput.value);
}

window.toggleIssue = toggleIssue;

function openModal() {
  authModal.classList.remove('hidden');
}

function closeModalWindow() {
  authModal.classList.add('hidden');
}

function toggleAuthMode() {
  isSignup = !isSignup;
  authTitle.textContent = isSignup ? 'Create an Account' : 'Login to Library';
  toggleText.textContent = isSignup ? 'Already have an account?' : "Don't have an account?";
  switchAuth.textContent = isSignup ? 'Login' : 'Signup';
}

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();
  const library = bookLibrary.value;
  if (!title || !author) return;

  books.push({
    id: Date.now(),
    title,
    author,
    library,
    issued: false,
  });

  bookTitle.value = '';
  bookAuthor.value = '';
  bookLibrary.value = 'Central Branch';
  updateDashboard();
  renderBookList(searchInput.value);
});

searchInput.addEventListener('input', () => {
  renderBookList(searchInput.value);
});

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closeModalWindow();
  alert(isSignup ? 'Signup successful! You can now login.' : 'Login successful!');
});

openLoginBtn.addEventListener('click', openModal);
openLoginBtn2.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalWindow);
switchAuth.addEventListener('click', toggleAuthMode);
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

window.addEventListener('click', (event) => {
  if (event.target === authModal) {
    closeModalWindow();
  }
});

updateDashboard();
renderBookList();
renderLibraryCards();
let books = [];

function addBook() {
    let name = document.getElementById("bookName").value;
    let library = document.getElementById("libraryName").value;
    let image = document.getElementById("imageUrl").value;

    if (name === "" || library === "" || image === "") {
        alert("Fill all fields");
        return;
    }

    books.push({ name, library, image, issued: false });

    displayBooks();
}

function displayBooks() {
    let grid = document.getElementById("bookGrid");
    grid.innerHTML = "";

    books.forEach((book, index) => {
        let div = document.createElement("div");
        div.className = "book";

        div.innerHTML = `
        <div class="book-inner">
            <div class="book-front" style="background-image:url('${book.image}')">
                ${book.name}
            </div>
            <div class="book-back">
                <h3>${book.name}</h3>
                <p>Library: ${book.library}</p>
                <button onclick="issueBook(${index})">
                    ${book.issued ? "Issued" : "Issue"}
                </button>
            </div>
        </div>
        `;

        grid.appendChild(div);
    });
}

function issueBook(index) {
    books[index].issued = true;
    displayBooks();
}