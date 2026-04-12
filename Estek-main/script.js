/* ============================================================
   ESTEK — SPA Router, Dynamic Rendering & Animations
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
  div.textContent = str;
  return div.innerHTML;
}

// ===== LOCAL STORAGE HELPERS =====
function getProjects() {
  return JSON.parse(localStorage.getItem('estek_projects') || '[]');
}

function getArticles() {
  return JSON.parse(localStorage.getItem('estek_articles') || '[]');
}

// ===== SEED DATA (runs once) =====
function initSeedData() {
  if (!localStorage.getItem('estek_projects')) {
    const projects = [
      {
        id: generateId(),
        title: '3D Web Editör',
        description: 'Three.js tabanlı tarayıcı içi 3D sahne editörü. Blender benzeri arayüz ile 3D modelleme, ışık düzenleme ve sahne yönetimi yapabilirsiniz. Gerçek zamanlı render desteği ile profesyonel sonuçlar elde edin.',
        technologies: ['JavaScript', 'Three.js', 'WebGL', 'CSS'],
        githubUrl: 'https://github.com/',
        demoUrl: '#',
        imageUrl: './assets/project-1.png',
        createdAt: '2026-03-15'
      },
      {
        id: generateId(),
        title: 'Hava Durumu Uygulaması',
        description: 'Gerçek zamanlı hava durumu verileri gösteren modern web uygulaması. OpenWeather API entegrasyonu ile anlık sıcaklık, nem, rüzgar hızı ve 5 günlük tahmin gösterimi.',
        technologies: ['React', 'CSS', 'REST API'],
        githubUrl: 'https://github.com/',
        demoUrl: '#',
        imageUrl: './assets/project-2.png',
        createdAt: '2026-02-20'
      },
      {
        id: generateId(),
        title: 'Portfolio Web Sitesi',
        description: 'Kişisel portfolyo web sitesi. Glassmorphism tasarım, SPA router, dashboard ile proje ve makale yönetimi. Tamamen responsive ve modern arayüz.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: 'https://github.com/',
        demoUrl: '#',
        imageUrl: './assets/project-3.png',
        createdAt: '2026-01-10'
      }
    ];
    localStorage.setItem('estek_projects', JSON.stringify(projects));
  }

  if (!localStorage.getItem('estek_articles')) {
    const articles = [
      {
        id: generateId(),
        title: 'Modern CSS Teknikleri: Glassmorphism ve Ötesi',
        summary: 'CSS ile modern ve çarpıcı tasarımlar oluşturmanın yollarını keşfedin. Glassmorphism, Neumorphism ve daha fazlası bu yazıda.',
        content: `CSS dünyası sürekli gelişiyor ve her yıl yeni tasarım trendleri ortaya çıkıyor. Bu yazıda, 2026'nın en popüler CSS tekniklerini inceleyeceğiz.

## Glassmorphism Nedir?

Glassmorphism, cam benzeri şeffaf ve bulanık arka planlara sahip bir tasarım yaklaşımıdır. Bu teknik, backdrop-filter özelliği ile elde edilir.

Temel özellikleri şunlardır:
- Şeffaf arka plan (background: rgba ile)
- Bulanıklık efekti (backdrop-filter: blur)
- İnce kenarlıklar
- Hafif gölgeler

## Nasıl Uygulanır?

Glassmorphism efekti için gerekli CSS kodları oldukça basittir. Bir kart elemanına şu özellikleri uygulamanız yeterlidir.

Arka plan rengini rgba ile yarı şeffaf yapın, ardından backdrop-filter: blur(10px) ekleyin. İnce bir border ve border-radius ile tasarımı tamamlayın.

## Neumorphism

Neumorphism ise yumuşak gölgeler kullanarak 3 boyutlu bir görünüm oluşturan bir tasarım trenddir. Box-shadow özelliğinin iki farklı yönde kullanılmasıyla elde edilir.

## Sonuç

Modern CSS teknikleri, web tasarımına yeni bir boyut katıyor. Bu teknikleri projelerinizde kullanarak daha etkileyici ve kullanıcı dostu arayüzler oluşturabilirsiniz.`,
        category: 'CSS',
        coverImage: '',
        readTime: '5 dk',
        createdAt: '2026-04-01'
      },
      {
        id: generateId(),
        title: 'JavaScript ile Asenkron Programlama Rehberi',
        summary: 'Promise, async/await ve callback yapılarını derinlemesine öğrenin. Modern JavaScript geliştirmede asenkron programlamanın temelleri.',
        content: `JavaScript'te asenkron programlama, web geliştirmenin temel taşlarından biridir. Bu yazıda, asenkron JavaScript'in temellerini ele alacağız.

## Callback Fonksiyonları

Callback'ler, asenkron programlamanın en eski yöntemidir. Bir fonksiyona parametre olarak geçirilen ve işlem tamamlandığında çalıştırılan fonksiyonlardır.

Ancak iç içe geçmiş callback'ler "callback hell" denilen okunması zor kod yapılarına yol açabilir.

## Promise Yapısı

Promise'ler, callback hell sorununu çözmek için geliştirilmiştir. Bir işlemin başarılı veya başarısız olma durumlarını temsil eden nesnelerdir.

Promise zincirlemesi (chaining) ile ardışık asenkron işlemleri daha okunabilir şekilde yazabilirsiniz.

## Async/Await

ES2017 ile gelen async/await sözdizimi, Promise tabanlı kodu senkron gibi yazmamızı sağlar. Bu yaklaşım, kodun okunabilirliğini büyük ölçüde artırır.

Bir fonksiyonun başına async anahtar kelimesini koyarak o fonksiyonu asenkron hale getirirsiniz. İçeride await ile Promise sonuçlarını bekleyebilirsiniz.

## Hata Yönetimi

Try-catch blokları ile async/await kullanırken hataları kolayca yakalayabilirsiniz. Bu, kodunuzun daha sağlam ve güvenilir olmasını sağlar.

## Sonuç

Asenkron programlama, modern web geliştirmenin vazgeçilmez bir parçasıdır. Async/await kullanarak daha temiz ve bakımı kolay kod yazabilirsiniz.`,
        category: 'JavaScript',
        coverImage: '',
        readTime: '8 dk',
        createdAt: '2026-03-20'
      },
      {
        id: generateId(),
        title: 'React vs Vue: 2026\'da Hangisini Seçmeli?',
        summary: 'İki popüler frontend framework\'ünün karşılaştırması. Performans, öğrenme eğrisi ve ekosistem açısından detaylı analiz.',
        content: `Frontend framework seçimi, yeni bir projeye başlarken en kritik kararlardan biridir. Bu yazıda React ve Vue.js'i çeşitli açılardan karşılaştıracağız.

## Öğrenme Eğrisi

Vue.js, HTML tabanlı şablon yapısı sayesinde daha düşük bir öğrenme eğrisine sahiptir. React ise JSX sözdizimi ile farklı bir yaklaşım sunar.

Vue'nun Composition API'si, React Hooks'a benzer bir yapı sunar ve bu da iki framework arasındaki farkı azaltır.

## Performans

Her iki framework de sanal DOM kullanır ve performans açısından birbirine çok yakındır. Ancak Vue 3, Proxy tabanlı reaktivite sistemi ile daha verimli güncellemeler yapabilir.

React ise concurrent mode ve fiber mimarisi ile büyük uygulamalarda daha iyi performans sunma potansiyeline sahiptir.

## Ekosistem ve Topluluk

React, daha büyük bir topluluğa ve daha geniş bir ekosisteme sahiptir. Next.js gibi güçlü meta-framework'ler, React ekosistemini daha da güçlendirmektedir.

Vue ise Nuxt.js ile benzer bir çözüm sunar ve Pinia state management kütüphanesi ile modern bir geliştirme deneyimi sağlar.

## Hangisini Seçmeli?

Seçim, projenizin ihtiyaçlarına ve ekibinizin deneyimine bağlıdır. Hızlı prototipleme ve küçük projeler için Vue iyi bir tercih olabilirken, büyük ölçekli kurumsal projeler için React daha uygun olabilir.

## Sonuç

Her iki framework de güçlü ve olgun çözümlerdir. Önemli olan, seçtiğiniz teknolojiyi iyi öğrenmek ve projelerinizde etkili şekilde kullanmaktır.`,
        category: 'Web Development',
        coverImage: '',
        readTime: '6 dk',
        createdAt: '2026-03-05'
      }
    ];
    localStorage.setItem('estek_articles', JSON.stringify(articles));
  }
}

// ===== SVG ICONS =====
const ICONS = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  external: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
};

// ===== SPA ROUTER =====
function router() {
  const hash = window.location.hash || '#home';
  const views = document.querySelectorAll('.view');
  views.forEach(v => v.classList.remove('active'));

  // Update nav active state
  document.querySelectorAll('.nav-link:not(.nav-dashboard)').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === hash || 
        (hash.startsWith('#article/') && link.getAttribute('data-page') === 'articles')) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  if (navMenu) navMenu.classList.remove('open');
  if (navToggle) navToggle.classList.remove('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (hash === '#projects') {
    renderProjects();
    document.getElementById('view-projects').classList.add('active');
  } else if (hash === '#articles') {
    renderArticles();
    document.getElementById('view-articles').classList.add('active');
  } else if (hash.startsWith('#article/')) {
    const articleId = hash.split('/')[1];
    renderArticleDetail(articleId);
    document.getElementById('view-article-detail').classList.add('active');
  } else if (hash === '#contact') {
    document.getElementById('view-contact').classList.add('active');
  } else {
    renderHomePreview();
    document.getElementById('view-home').classList.add('active');
    initRevealAnimations();
    animateSkillBars();
  }
}

// ===== RENDER FUNCTIONS =====

// Render a single project card
function renderProjectCard(project) {
  const techTags = project.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
  
  return `
    <div class="project-card" onclick="openProjectModal('${project.id}')">
      <div class="card-image-wrapper">
        <img src="${project.imageUrl || './assets/project-1.png'}" alt="${escapeHtml(project.title)}" class="card-image">
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(project.title)}</h3>
        <p class="card-desc">${escapeHtml(project.description)}</p>
        <div class="tech-tags">${techTags}</div>
        <div class="card-links">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="card-link" onclick="event.stopPropagation()">${ICONS.github} GitHub</a>` : ''}
          ${project.demoUrl && project.demoUrl !== '#' ? `<a href="${project.demoUrl}" target="_blank" class="card-link" onclick="event.stopPropagation()">${ICONS.external} Demo</a>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Render a single article card
function renderArticleCard(article) {
  return `
    <div class="article-card" onclick="window.location.hash='#article/${article.id}'">
      <div class="card-meta">
        <span class="card-category">${escapeHtml(article.category)}</span>
        <span class="card-date">${formatDate(article.createdAt)}</span>
        <span class="card-read-time">${ICONS.clock} ${article.readTime}</span>
      </div>
      <h3 class="card-title">${escapeHtml(article.title)}</h3>
      <p class="card-summary">${escapeHtml(article.summary)}</p>
      <span class="read-more">Devamını Oku ${ICONS.arrowRight}</span>
    </div>
  `;
}

// Render projects page
function renderProjects() {
  const container = document.getElementById('projects-grid');
  const projects = getProjects();
  
  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📁</div>
        <p>Henüz proje eklenmemiş.</p>
        <a href="dashboard.html" class="btn btn-primary btn-sm">Dashboard'dan Ekle</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = projects.map(renderProjectCard).join('');
}

// Render articles page
function renderArticles() {
  const container = document.getElementById('articles-grid');
  const articles = getArticles();
  
  if (articles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p>Henüz makale yazılmamış.</p>
        <a href="dashboard.html" class="btn btn-primary btn-sm">Dashboard'dan Ekle</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = articles
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(renderArticleCard).join('');
}

// Render article detail
function renderArticleDetail(articleId) {
  const container = document.getElementById('article-detail');
  const articles = getArticles();
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Makale bulunamadı.</p>
        <a href="#articles" class="btn btn-outline btn-sm">${ICONS.arrowLeft} Makalelere Dön</a>
      </div>
    `;
    return;
  }

  // Convert plain text content to HTML paragraphs
  const contentHtml = article.content
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      if (paragraph.startsWith('## ')) {
        return `<h2>${escapeHtml(paragraph.slice(3))}</h2>`;
      }
      if (paragraph.startsWith('### ')) {
        return `<h3>${escapeHtml(paragraph.slice(4))}</h3>`;
      }
      // Handle lists
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map(line => {
          const text = line.startsWith('- ') ? line.slice(2) : line;
          return `<li>${escapeHtml(text)}</li>`;
        }).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(paragraph)}</p>`;
    })
    .join('\n');
  
  container.innerHTML = `
    <button class="back-btn" onclick="window.location.hash='#articles'">
      ${ICONS.arrowLeft} Makalelere Dön
    </button>
    <div class="article-header">
      <div class="card-meta">
        <span class="card-category">${escapeHtml(article.category)}</span>
        <span class="card-date">${formatDate(article.createdAt)}</span>
        <span class="card-read-time">${ICONS.clock} ${article.readTime}</span>
      </div>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="article-summary">${escapeHtml(article.summary)}</p>
    </div>
    ${article.coverImage ? `<img src="${article.coverImage}" alt="${escapeHtml(article.title)}" class="article-cover">` : ''}
    <div class="article-body">${contentHtml}</div>
  `;
}

// Render home page previews
function renderHomePreview() {
  const projects = getProjects().slice(0, 3);
  const articles = getArticles()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  const projectsPreview = document.getElementById('projects-preview');
  const articlesPreview = document.getElementById('articles-preview');
  
  if (projectsPreview) {
    if (projects.length === 0) {
      projectsPreview.innerHTML = '<div class="empty-state"><p>Henüz proje yok. Dashboard\'dan ekleyebilirsiniz.</p></div>';
    } else {
      projectsPreview.innerHTML = projects.map(renderProjectCard).join('');
    }
  }
  
  if (articlesPreview) {
    if (articles.length === 0) {
      articlesPreview.innerHTML = '<div class="empty-state"><p>Henüz makale yok. Dashboard\'dan ekleyebilirsiniz.</p></div>';
    } else {
      articlesPreview.innerHTML = articles.map(renderArticleCard).join('');
    }
  }
}

// ===== PROJECT DETAIL MODAL =====
function openProjectModal(projectId) {
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  const techTags = project.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
  
  const modalContainer = document.getElementById('project-modal');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeProjectModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="tech-tags">${techTags}</div>
          <button class="modal-close" onclick="closeProjectModal()">&times;</button>
        </div>
        <div class="modal-body">
          <img src="${project.imageUrl || './assets/project-1.png'}" alt="${escapeHtml(project.title)}" class="card-image">
          <h2>${escapeHtml(project.title)}</h2>
          <p class="modal-desc">${escapeHtml(project.description)}</p>
          <div class="modal-links">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline btn-sm">${ICONS.github} GitHub</a>` : ''}
            ${project.demoUrl && project.demoUrl !== '#' ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary btn-sm">${ICONS.external} Canlı Demo</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modalContainer = document.getElementById('project-modal');
  modalContainer.innerHTML = '';
  document.body.style.overflow = '';
}

// ===== TYPING ANIMATION =====
class TypeWriter {
  constructor(element, words, waitTime = 2500) {
    this.element = element;
    this.words = words;
    this.waitTime = waitTime;
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.textContent = this.txt;

    let typeSpeed = 80;

    if (this.isDeleting) {
      typeSpeed = 40;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.waitTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===== SCROLL ANIMATIONS =====
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
      });
    });
  }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Init seed data
  initSeedData();
  
  // Init router
  router();
  window.addEventListener('hashchange', router);
  
  // Init typing animation
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    new TypeWriter(typedElement, [
      'Frontend Developer',
      'Web Tasarımcı',
      'Yazılım Geliştirici',
      'UI/UX Meraklısı'
    ], 2500);
  }
  
  // Init navbar scroll
  initNavbarScroll();
  
  // Init mobile menu
  initMobileMenu();
  
  // Init scroll reveal
  initRevealAnimations();
  
  // Init skill bars
  animateSkillBars();

  // ===== HIDDEN DASHBOARD ACCESS =====
  // Ctrl + Shift + D leads to login page
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      window.location.href = 'login.html';
    }
  });
});
