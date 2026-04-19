const welcomeTitle = document.getElementById('welcomeTitle');
const roleLabel = document.getElementById('roleLabel');
const sessionText = document.getElementById('sessionText');
const statTotal = document.getElementById('statTotal');
const statIssued = document.getElementById('statIssued');
const statAvailable = document.getElementById('statAvailable');
const statLibraries = document.getElementById('statLibraries');
const logoutBtn = document.getElementById('logoutBtn');

function getSession() {
  const sessionRaw = localStorage.getItem('library-session');
  return sessionRaw ? JSON.parse(sessionRaw) : null;
}

function redirectToAuth() {
  window.location.href = 'auth.html';
}

function renderDashboard() {
  const session = getSession();
  if (!session) {
    redirectToAuth();
    return;
  }

  welcomeTitle.textContent = `Welcome back, ${session.name}`;
  roleLabel.textContent = `Role: ${session.role}`;
  sessionText.textContent = `You are signed in with ${session.email}. This demo stores your session data in localStorage.`;

  const stats = {
    totalBooks: 142,
    issuedBooks: 37,
    availableBooks: 105,
    libraries: 4,
  };

  statTotal.textContent = stats.totalBooks;
  statIssued.textContent = stats.issuedBooks;
  statAvailable.textContent = stats.availableBooks;
  statLibraries.textContent = stats.libraries;
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('library-session');
  redirectToAuth();
});

renderDashboard();
