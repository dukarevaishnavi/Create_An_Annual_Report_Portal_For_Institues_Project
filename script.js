const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'staff', password: 'staff2024' }
];

const reports = [
  {
    title: 'Computer Science Engineering Report 2024',
    year: '2024',
    department: 'Computer Science',
    file: '<iframe title="cse" width="900" height="573.5" src="https://app.powerbi.com/view?r=eyJrIjoiNDliOWFmNDMtNmJlMC00Mzc4LWFkNWMtNWI5ODc4MGE3ZWYxIiwidCI6ImE4NzY5NDhhLWM3M2ItNDEyYS1hY2M3LThhN2U0NTQ5NDBiYyJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    title: 'Civil Engineering Report 2024',
    year: '2024',
    department: 'Civil',
    file: '<iframe title="civil" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiZTZhMjAyZTAtMTQxZS00MDVjLTg1NjYtYTMyYzVhNzA1ZTAxIiwidCI6ImE4NzY5NDhhLWM3M2ItNDEyYS1hY2M3LThhN2U0NTQ5NDBiYyJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    title: 'Electrical Engineering Report 2024',
    year: '2024',
    department: 'Electrical',
    file: '<iframe title="miniprojectttttt" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiODcyZGQ3OTYtMmQzOS00YzdiLTg2OWItNGNlNTgzMDM0ZDM3IiwidCI6ImE4NzY5NDhhLWM3M2ItNDEyYS1hY2M3LThhN2U0NTQ5NDBiYyJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    title: 'Mechanical Engineering Report 2024',
    year: '2024',
    department: 'Mechanical',
    file: '<iframe title="m" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiYTIzOGI1MmMtNGU2YS00M2QzLWJlZGQtMmUxZTg1MzIxMjc5IiwidCI6ImE4NzY5NDhhLWM3M2ItNDEyYS1hY2M3LThhN2U0NTQ5NDBiYyJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    title: 'General Science Engineering Report 2024',
    year: '2024',
    department: 'General Science',
    file: '<iframe title="gnsci" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiZGI5OGNjNTAtZGE2YS00ZWNiLTkzOTUtNTQ2NWNjZGM5YzkzIiwidCI6ImE4NzY5NDhhLWM3M2ItNDEyYS1hY2M3LThhN2U0NTQ5NDBiYyJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
];

function checkLogin() {
  const isLoggedIn = localStorage.getItem('loggedIn');
  if (isLoggedIn === 'true') {
    showPortal();
  }
}

function handleLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const error = document.getElementById('loginError');
  const found = users.find(u => u.username === user && u.password === pass);
  if (found) {
    localStorage.setItem('loggedIn', 'true');
    showPortal();
  } else {
    error.textContent = 'Invalid username or password';
  }
}

function handleLogout() {
  localStorage.removeItem('loggedIn');
  location.reload();
}

function showPortal() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('portalPage').style.display = 'block';
  renderReports();
}

const reportList = document.getElementById('reportList');
const searchInput = document.getElementById('searchInput');
const departmentSelect = document.getElementById('departmentSelect');

function renderReports() {
  const search = searchInput.value.toLowerCase();
  const department = departmentSelect.value;

  reportList.innerHTML = '';
  const filtered = reports.filter(report =>
    (report.title.toLowerCase().includes(search) || report.year.includes(search)) &&
    (department === '' || report.department === department)
  );

  if (filtered.length === 0) {
    reportList.innerHTML = '<p>No reports found.</p>';
    return;
  }

  filtered.forEach(report => {
    const card = document.createElement('div');
    card.className = 'card';

    let content = `
      <div>
        <h2>${report.title}</h2>
        <p>${report.department} | Year: ${report.year}</p>
    `;

    if (report.file.includes('<iframe')) {
      content += `<div>${report.file}</div>`;
    } else if (report.file) {
      content += `<a href="${report.file}" class="view-button" target="_blank">View</a>`;
    } else {
      content += `<p style="color: grey;">No file available</p>`;
    }

    content += `</div>`;
    card.innerHTML = content;
    reportList.appendChild(card);
  });
}

searchInput?.addEventListener('input', renderReports);
departmentSelect?.addEventListener('change', renderReports);

checkLogin();
