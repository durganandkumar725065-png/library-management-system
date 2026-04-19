const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginFormCard = document.getElementById('loginFormCard');
const signupFormCard = document.getElementById('signupFormCard');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');
const rememberMe = document.getElementById('rememberMe');
const loginRole = document.getElementById('loginRole');
const signupRole = document.getElementById('signupRole');
const passwordToggles = document.querySelectorAll('.icon-btn');

const defaultUsers = [
  {
    name: 'Admin User',
    email: 'admin@library.com',
    password: 'Admin1234',
    role: 'Admin',
  },
  {
    name: 'Library Member',
    email: 'user@library.com',
    password: 'User1234',
    role: 'User',
  },
];

function getUsers() {
  const stored = localStorage.getItem('library-users');
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users) {
  localStorage.setItem('library-users', JSON.stringify(users));
}

function initializeUsers() {
  const users = getUsers();
  if (users.length === 0) {
    saveUsers(defaultUsers);
  }
}

function showMessage(element, text, success = false) {
  element.textContent = text;
  element.classList.toggle('success', success);
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function switchTabs(activeTab) {
  const isLogin = activeTab === 'login';
  loginTab.classList.toggle('active', isLogin);
  signupTab.classList.toggle('active', !isLogin);
  loginFormCard.classList.toggle('active', isLogin);
  signupFormCard.classList.toggle('active', !isLogin);
  showMessage(loginMessage, '');
  showMessage(signupMessage, '');
}

function togglePassword(event) {
  const button = event.currentTarget;
  const targetId = button.dataset.target;
  const input = document.getElementById(targetId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  button.textContent = input.type === 'password' ? '👁️' : '🙈';
}

loginTab.addEventListener('click', () => switchTabs('login'));
signupTab.addEventListener('click', () => switchTabs('signup'));
passwordToggles.forEach((button) => button.addEventListener('click', togglePassword));

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const role = loginRole.value;

  if (!email || !password) {
    showMessage(loginMessage, 'Please enter both email and password.');
    return;
  }

  if (!validateEmail(email)) {
    showMessage(loginMessage, 'Enter a valid email address.');
    return;
  }

  const users = getUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password || user.role !== role) {
    showMessage(loginMessage, 'Invalid credentials or role. Please try again.');
    return;
  }

  const session = {
    name: user.name,
    email: user.email,
    role: user.role,
    remembered: rememberMe.checked,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem('library-session', JSON.stringify(session));
  showMessage(loginMessage, 'Login successful! Redirecting...', true);
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 900);
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const role = signupRole.value;

  if (!name || !email || !password) {
    showMessage(signupMessage, 'Please complete all fields.');
    return;
  }

  if (!validateEmail(email)) {
    showMessage(signupMessage, 'Please enter a valid email address.');
    return;
  }

  if (password.length < 8) {
    showMessage(signupMessage, 'Password must be at least 8 characters long.');
    return;
  }

  const users = getUsers();
  const exists = users.some((item) => item.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    showMessage(signupMessage, 'This email is already registered. Please login instead.');
    return;
  }

  users.push({ name, email, password, role });
  saveUsers(users);
  signupForm.reset();
  showMessage(signupMessage, 'Account created successfully. You can now login.', true);
});

initializeUsers();
