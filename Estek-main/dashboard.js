/* ============================================================
   ESTEK DASHBOARD — CRUD Operations & UI Logic
   ============================================================ */

// ===== UTILITY HELPERS =====
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateStr) {
  const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

// ===== LOCAL STORAGE =====
function getProjects() {
  return JSON.parse(localStorage.getItem('estek_projects') || '[]');
}

function saveProjects(projects) {
  localStorage.setItem('estek_projects', JSON.stringify(projects));
}

function getArticles() {
  return JSON.parse(localStorage.getItem('estek_articles') || '[]');
}

function saveArticles(articles) {
  localStorage.setItem('estek_articles', JSON.stringify(articles));
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${escapeHtml(message)}`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
    if (container.children.length === 0) container.remove();
  }, 3000);
}

// ===== SECTION ROUTING =====
function switchSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  
  // Show target section
  const target = document.getElementById(`section-${sectionName}`);
  if (target) target.classList.add('active');
  
  // Update sidebar active
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionName) {
      link.classList.add('active');
    }
  });
  
  // Close mobile sidebar
  closeMobileSidebar();
  
  // Render content
  if (sectionName === 'overview') renderOverview();
  else if (sectionName === 'projects') renderProjectsList();
  else if (sectionName === 'articles') renderArticlesList();
  else if (sectionName === 'settings') renderSettings();
}

// ===== SETTINGS RENDERING =====
function renderSettings() {
  const customAuth = JSON.parse(localStorage.getItem('estek_custom_auth') || 'null');
  const currentUsername = customAuth ? customAuth.username : 'estek';
  const currentHint = customAuth ? (customAuth.hint || '') : '';
  
  document.getElementById('settings-username').value = currentUsername;
  document.getElementById('settings-hint').value = currentHint;
  document.getElementById('settings-password').value = '';
  document.getElementById('settings-confirm').value = '';
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  
  const username = document.getElementById('settings-username').value.trim();
  const hint = document.getElementById('settings-hint').value.trim();
  const password = document.getElementById('settings-password').value;
  const confirm = document.getElementById('settings-confirm').value;
  
  if (password || confirm) {
    if (password !== confirm) {
      showToast('Şifreler uyuşmuyor!', 'error');
      return;
    }
    if (password.length < 4) {
      showToast('Şifre en az 4 karakter olmalıdır!', 'error');
      return;
    }
  }
  
  // Get existing info if not changed
  const customAuth = JSON.parse(localStorage.getItem('estek_custom_auth') || 'null');
  let newPass = customAuth ? customAuth.password : atob('ZXN0ZWsyMDI2'); // Default estek2026
  
  if (password) {
    newPass = password;
  }
  
  const settingsData = {
    username: username,
    password: newPass,
    hint: hint
  };
  
  localStorage.setItem('estek_custom_auth', JSON.stringify(settingsData));
  showToast('Ayarlar başarıyla kaydedildi!');
}

// ===== OVERVIEW RENDERING =====
function renderOverview() {
  const projects = getProjects();
  const articles = getArticles();
  
  // Stats
  document.getElementById('stat-projects').textContent = projects.length;
  document.getElementById('stat-articles').textContent = articles.length;
  
  // Unique technologies
  const allTech = new Set();
  projects.forEach(p => p.technologies?.forEach(t => allTech.add(t)));
  document.getElementById('stat-technologies').textContent = allTech.size;
  
  // Latest update
  const allDates = [...projects, ...articles].map(i => new Date(i.createdAt));
  if (allDates.length > 0) {
    const latest = new Date(Math.max(...allDates));
    document.getElementById('stat-latest').textContent = formatDate(latest.toISOString());
  }
  
  // Recent projects
  const recentProjectsEl = document.getElementById('recent-projects-list');
  const recentProjects = projects.slice(-5).reverse();
  if (recentProjects.length === 0) {
    recentProjectsEl.innerHTML = '<p class="recent-empty">Henüz proje eklenmemiş.</p>';
  } else {
    recentProjectsEl.innerHTML = recentProjects.map(p => `
      <div class="recent-item">
        <span class="recent-item-title">${escapeHtml(p.title)}</span>
        <span class="recent-item-date">${formatDate(p.createdAt)}</span>
      </div>
    `).join('');
  }
  
  // Recent articles
  const recentArticlesEl = document.getElementById('recent-articles-list');
  const recentArticles = articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  if (recentArticles.length === 0) {
    recentArticlesEl.innerHTML = '<p class="recent-empty">Henüz makale yazılmamış.</p>';
  } else {
    recentArticlesEl.innerHTML = recentArticles.map(a => `
      <div class="recent-item">
        <span class="recent-item-title">${escapeHtml(a.title)}</span>
        <span class="recent-item-date">${formatDate(a.createdAt)}</span>
      </div>
    `).join('');
  }
}

// ===== PROJECTS LIST =====
function renderProjectsList() {
  const container = document.getElementById('projects-list');
  const projects = getProjects();
  
  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-list">
        <div class="empty-icon">📁</div>
        <p>Henüz proje eklenmemiş.</p>
        <button class="btn btn-primary" onclick="openProjectForm()">+ İlk Projenizi Ekleyin</button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = projects.map(project => {
    const techTags = (project.technologies || []).slice(0, 3).map(t => 
      `<span class="item-tag">${escapeHtml(t)}</span>`
    ).join('');
    
    return `
      <div class="item-row">
        <div class="item-info">
          <div class="item-title">${escapeHtml(project.title)}</div>
          <div class="item-meta">
            ${techTags}
            <span>${formatDate(project.createdAt)}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="item-btn" onclick="editProject('${project.id}')">Düzenle</button>
          <button class="item-btn item-btn-danger" onclick="confirmDeleteProject('${project.id}')">Sil</button>
        </div>
      </div>
    `;
  }).join('');
}

// ===== ARTICLES LIST =====
function renderArticlesList() {
  const container = document.getElementById('articles-list');
  const articles = getArticles();
  
  if (articles.length === 0) {
    container.innerHTML = `
      <div class="empty-list">
        <div class="empty-icon">📝</div>
        <p>Henüz makale yazılmamış.</p>
        <button class="btn btn-primary" onclick="openArticleForm()">+ İlk Makalenizi Yazın</button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = articles
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(article => `
      <div class="item-row">
        <div class="item-info">
          <div class="item-title">${escapeHtml(article.title)}</div>
          <div class="item-meta">
            <span class="item-tag">${escapeHtml(article.category || 'Genel')}</span>
            <span>${article.readTime || '-'}</span>
            <span>${formatDate(article.createdAt)}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="item-btn" onclick="editArticle('${article.id}')">Düzenle</button>
          <button class="item-btn item-btn-danger" onclick="confirmDeleteArticle('${article.id}')">Sil</button>
        </div>
      </div>
    `).join('');
}

// ===== PROJECT FORM =====
function openProjectForm(project = null) {
  document.getElementById('project-form-title').textContent = project ? 'Projeyi Düzenle' : 'Yeni Proje Ekle';
  document.getElementById('project-edit-id').value = project ? project.id : '';
  document.getElementById('project-title').value = project ? project.title : '';
  document.getElementById('project-desc').value = project ? project.description : '';
  document.getElementById('project-tech').value = project ? (project.technologies || []).join(', ') : '';
  document.getElementById('project-github').value = project ? (project.githubUrl || '') : '';
  document.getElementById('project-demo').value = project ? (project.demoUrl || '') : '';
  document.getElementById('project-image').value = project ? (project.imageUrl || '') : '';
  
  document.getElementById('project-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProjectForm() {
  document.getElementById('project-modal').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('project-form').reset();
}

function editProject(projectId) {
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);
  if (project) openProjectForm(project);
}

function handleProjectSubmit(event) {
  event.preventDefault();
  
  const editId = document.getElementById('project-edit-id').value;
  const projectData = {
    id: editId || generateId(),
    title: document.getElementById('project-title').value.trim(),
    description: document.getElementById('project-desc').value.trim(),
    technologies: document.getElementById('project-tech').value
      .split(',').map(t => t.trim()).filter(t => t),
    githubUrl: document.getElementById('project-github').value.trim(),
    demoUrl: document.getElementById('project-demo').value.trim(),
    imageUrl: document.getElementById('project-image').value.trim(),
    createdAt: getToday()
  };
  
  let projects = getProjects();
  
  if (editId) {
    // Update existing
    const index = projects.findIndex(p => p.id === editId);
    if (index !== -1) {
      projectData.createdAt = projects[index].createdAt; // Keep original date
      projects[index] = projectData;
    }
    showToast('Proje başarıyla güncellendi!');
  } else {
    // Add new
    projects.push(projectData);
    showToast('Yeni proje eklendi!');
  }
  
  saveProjects(projects);
  closeProjectForm();
  renderProjectsList();
  renderOverview();
}

// ===== ARTICLE FORM =====
function openArticleForm(article = null) {
  document.getElementById('article-form-title').textContent = article ? 'Makaleyi Düzenle' : 'Yeni Makale Ekle';
  document.getElementById('article-edit-id').value = article ? article.id : '';
  document.getElementById('article-title').value = article ? article.title : '';
  document.getElementById('article-summary').value = article ? article.summary : '';
  document.getElementById('article-content').value = article ? article.content : '';
  document.getElementById('article-category').value = article ? (article.category || 'Genel') : 'Web Development';
  document.getElementById('article-readtime').value = article ? (article.readTime || '') : '';
  document.getElementById('article-cover').value = article ? (article.coverImage || '') : '';
  
  document.getElementById('article-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeArticleForm() {
  document.getElementById('article-modal').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('article-form').reset();
}

function editArticle(articleId) {
  const articles = getArticles();
  const article = articles.find(a => a.id === articleId);
  if (article) openArticleForm(article);
}

function handleArticleSubmit(event) {
  event.preventDefault();
  
  const editId = document.getElementById('article-edit-id').value;
  
  // Calculate read time if not provided
  const content = document.getElementById('article-content').value.trim();
  const wordCount = content.split(/\s+/).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));
  
  const articleData = {
    id: editId || generateId(),
    title: document.getElementById('article-title').value.trim(),
    summary: document.getElementById('article-summary').value.trim(),
    content: content,
    category: document.getElementById('article-category').value,
    readTime: document.getElementById('article-readtime').value.trim() || `${estimatedReadTime} dk`,
    coverImage: document.getElementById('article-cover').value.trim(),
    createdAt: getToday()
  };
  
  let articles = getArticles();
  
  if (editId) {
    const index = articles.findIndex(a => a.id === editId);
    if (index !== -1) {
      articleData.createdAt = articles[index].createdAt;
      articles[index] = articleData;
    }
    showToast('Makale başarıyla güncellendi!');
  } else {
    articles.push(articleData);
    showToast('Yeni makale eklendi!');
  }
  
  saveArticles(articles);
  closeArticleForm();
  renderArticlesList();
  renderOverview();
}

// ===== DELETE OPERATIONS =====
let pendingDelete = { type: null, id: null };

function confirmDeleteProject(projectId) {
  pendingDelete = { type: 'project', id: projectId };
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);
  document.getElementById('delete-message').textContent = 
    `"${project?.title || 'Bu proje'}" silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?`;
  document.getElementById('delete-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function confirmDeleteArticle(articleId) {
  pendingDelete = { type: 'article', id: articleId };
  const articles = getArticles();
  const article = articles.find(a => a.id === articleId);
  document.getElementById('delete-message').textContent = 
    `"${article?.title || 'Bu makale'}" silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?`;
  document.getElementById('delete-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
  document.getElementById('delete-modal').style.display = 'none';
  document.body.style.overflow = '';
  pendingDelete = { type: null, id: null };
}

function executeDelete() {
  if (pendingDelete.type === 'project') {
    let projects = getProjects();
    projects = projects.filter(p => p.id !== pendingDelete.id);
    saveProjects(projects);
    renderProjectsList();
    showToast('Proje silindi.', 'info');
  } else if (pendingDelete.type === 'article') {
    let articles = getArticles();
    articles = articles.filter(a => a.id !== pendingDelete.id);
    saveArticles(articles);
    renderArticlesList();
    showToast('Makale silindi.', 'info');
  }
  
  renderOverview();
  closeDeleteModal();
}

// ===== MOBILE SIDEBAR =====
function openMobileSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('active');
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectForm();
    closeArticleForm();
    closeDeleteModal();
  }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  const hash = window.location.hash.replace('#', '') || 'overview';
  switchSection(hash);
  
  // Sidebar link clicks
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      window.location.hash = section;
      switchSection(section);
    });
  });
  
  // Hash change
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'overview';
    switchSection(hash);
  });
  
  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }
  
  // Sidebar overlay click to close
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
  }
  
  // Delete confirm button
  const deleteBtn = document.getElementById('delete-confirm-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', executeDelete);
  }
  
  // Modal overlay click to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
});

// ===== LOGOUT =====
function handleLogout() {
  sessionStorage.removeItem('estek_auth');
  localStorage.removeItem('estek_auth_persistent');
  window.location.href = 'login.html';
}

// ===== INACTIVITY TIMEOUT (15 Minutes) =====
let inactivityTimer;
const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 dakika

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showToast('Oturum süresi doldu, lütfen tekrar giriş yapın.', 'info');
    setTimeout(() => handleLogout(), 1500);
  }, TIMEOUT_DURATION);
}

// User activity listeners
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});

// Initial start
resetInactivityTimer();
