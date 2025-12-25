const API_BASE = '/api';
let portfolioData = null;

const socialSVGs = {
  github: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  twitter: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
};

async function fetchData() {
  try {
    const response = await fetch(`${API_BASE}/all`);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Failed to load portfolio data:', error);
    return null;
  }
}

async function loadPortfolio() {
  const data = await fetchData();
  if (!data) return;
  portfolioData = data;

  if (data.settings) {
    document.getElementById('siteName').textContent = data.settings.siteName || 'DevPortfolio';
    document.getElementById('footerText').textContent = data.settings.footerText || '';
    const resumeBtn = document.getElementById('resumeBtn');
    if (data.settings.resumeUrl) {
      resumeBtn.href = data.settings.resumeUrl;
      resumeBtn.setAttribute('download', '');
    }
  }

  if (data.hero) {
    document.getElementById('heroHeadline').textContent = data.hero.headline || '';
    document.getElementById('heroSubheadline').textContent = data.hero.subheadline || '';
    document.getElementById('ctaPrimary').textContent = data.hero.ctaPrimary || 'View My Work';
    document.getElementById('ctaSecondary').textContent = data.hero.ctaSecondary || 'Get in Touch';

    if (data.hero.statusActive) {
      document.getElementById('statusBadge').classList.remove('hidden');
      document.getElementById('statusText').textContent = data.hero.statusText || 'Open to work';
    }

    if (data.hero.heroImage || (data.profile && data.profile.avatar)) {
      document.getElementById('heroImage').style.backgroundImage = `url("${data.hero.heroImage || data.profile.avatar}")`;
    }
  }

  if (data.about) {
    document.getElementById('aboutTagline').textContent = data.about.tagline || '';
    document.getElementById('aboutHeadline').textContent = data.about.headline || '';
    document.getElementById('aboutDescription').textContent = data.about.description || '';
    document.getElementById('aboutJourney').textContent = data.about.journey || '';
    document.getElementById('aboutQuote').textContent = data.about.quote || '';

    if (data.about.metrics) {
      const metricsContainer = document.getElementById('metricsContainer');
      const metricsData = [
        { icon: 'translate', color: 'blue', value: data.about.metrics.toeicScore, label: 'TOEIC Score' },
        { icon: 'commit', color: 'green', value: data.about.metrics.gitCommits, label: 'Git Commits' },
        { icon: 'folder', color: 'purple', value: data.about.metrics.projectsCompleted, label: 'Projects Completed' }
      ];
      metricsContainer.innerHTML = metricsData.filter(m => m.value).map(m => `
        <div class="bg-surface-dark p-4 rounded-xl border border-surface-border flex items-center gap-4">
          <div class="bg-${m.color}-500/10 p-2.5 rounded-lg">
            <span class="material-symbols-outlined text-${m.color}-500">${m.icon}</span>
          </div>
          <div>
            <p class="text-2xl font-black">${m.value}</p>
            <p class="text-xs text-slate-400">${m.label}</p>
          </div>
        </div>
      `).join('');
    }
  }

  if (data.contact && data.contact.socials) {
    const socialNames = { github: 'GitHub', linkedin: 'LinkedIn', twitter: 'Twitter' };
    const socialHtml = Object.entries(data.contact.socials)
      .filter(([_, url]) => url && url !== '#')
      .map(([name, url]) => `
        <a href="${url}" target="_blank" title="${socialNames[name] || name}" class="group flex items-center justify-center size-12 rounded-full bg-surface-dark hover:bg-primary/20 border border-surface-border hover:border-primary/50 transition-all text-slate-400 hover:text-primary">
          ${socialSVGs[name] || `<span class="material-symbols-outlined">link</span>`}
        </a>
      `).join('');
    document.getElementById('socialLinks').innerHTML = socialHtml;
    document.getElementById('contactSocials').innerHTML = socialHtml;
  }

  if (data.skills && data.skills.length > 0) {
    const categories = {
      frontend: { title: 'Frontend', icon: 'web' },
      backend: { title: 'Backend', icon: 'storage' },
      devops: { title: 'DevOps & Cloud', icon: 'cloud' },
      tools: { title: 'Tools & Design', icon: 'build' }
    };

    const groupedSkills = data.skills.reduce((acc, skill) => {
      const cat = skill.category || 'tools';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = Object.entries(categories).map(([key, cat]) => {
      const skills = groupedSkills[key] || [];
      if (skills.length === 0) return '';
      return `
        <div class="bg-surface-dark rounded-2xl border border-surface-border p-6 hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">${cat.icon}</span>
            </div>
            <h3 class="text-lg font-bold">${cat.title}</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            ${skills.map(s => `
              <div class="flex items-center gap-2 px-3 py-2 bg-background-dark rounded-lg border border-transparent hover:border-primary/30 transition-colors">
                <span class="material-symbols-outlined text-primary text-[18px]">${s.icon || 'code'}</span>
                <span class="text-sm font-medium">${s.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  if (data.projects && data.projects.length > 0) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = data.projects.map(project => `
      <div class="group bg-surface-dark rounded-xl border border-surface-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer" onclick="openProjectModal('${project.id}')">
        <div class="h-48 bg-cover bg-center relative overflow-hidden" style='background-image: url("${project.image || ''}");'>
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">visibility</span> View Details
            </div>
          </div>
        </div>
        <div class="p-6">
          <p class="text-primary text-xs font-bold uppercase tracking-wider mb-1">${project.category || 'Project'}</p>
          <h3 class="text-xl font-bold mb-2">${project.title}</h3>
          <p class="text-slate-400 text-sm mb-4 line-clamp-2">${project.description}</p>
          <div class="flex flex-wrap gap-2">
            ${(project.tags || []).map(tag => `
              <span class="px-3 py-1 rounded-full bg-background-dark text-xs font-medium border border-surface-border">${tag}</span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  if (data.experience && data.experience.length > 0) {
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = data.experience.map(exp => `
      <div class="relative grid grid-cols-[60px_1fr] gap-6 mb-10 group">
        <div class="flex flex-col items-center">
          <div class="z-10 flex items-center justify-center size-14 rounded-full bg-surface-dark border-4 border-background-dark shadow-sm group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined ${exp.isCurrent ? 'text-primary' : 'text-slate-400'} text-[28px]">${exp.icon || 'work'}</span>
          </div>
        </div>
        <div class="bg-surface-dark rounded-xl p-6 border border-surface-border hover:border-primary/50 transition-all">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
            <div>
              <h3 class="text-xl font-bold group-hover:text-primary transition-colors">${exp.title}</h3>
              <p class="text-slate-400 flex items-center gap-2 mt-1">
                <span class="material-symbols-outlined text-sm">business</span>
                ${exp.company}
                <span class="size-1 bg-slate-400 rounded-full mx-1"></span>
                <span class="text-sm font-mono ${exp.isCurrent ? 'text-primary' : ''}">${exp.period}</span>
              </p>
            </div>
            ${exp.isCurrent ? `<span class="inline-flex items-center rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-300">Current Role</span>` : ''}
          </div>
          ${(exp.highlights || []).length > 0 ? `
            <div class="space-y-2 mb-4">
              ${exp.highlights.map(h => `
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary mt-1 text-[18px]">check_circle</span>
                  <p class="text-slate-300 text-sm">${h}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${(exp.skills || []).length > 0 ? `
            <div class="flex flex-wrap gap-2 pt-4 border-t border-surface-border">
              ${exp.skills.map(s => `<span class="px-3 py-1 rounded-md bg-background-dark text-xs font-mono text-slate-300">${s}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    if (data.education && data.education.length > 0) {
      const educationHtml = `
        <div class="mt-12 pt-10 border-t border-surface-border">
          <h3 class="text-2xl font-bold mb-8 flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">school</span> Education
          </h3>
          ${data.education.map(edu => `
            <div class="relative grid grid-cols-[60px_1fr] gap-6 mb-6">
              <div class="flex flex-col items-center">
                <div class="z-10 flex items-center justify-center size-14 rounded-full bg-surface-dark border-4 border-background-dark shadow-sm">
                  <span class="material-symbols-outlined text-primary text-[28px]">${edu.icon || 'school'}</span>
                </div>
              </div>
              <div class="bg-surface-dark rounded-xl p-6 border border-surface-border">
                <h4 class="text-xl font-bold">${edu.degree}</h4>
                <p class="text-slate-400 flex items-center gap-2 mt-1">
                  <span class="material-symbols-outlined text-sm">domain</span>
                  ${edu.institution}
                  <span class="size-1 bg-slate-400 rounded-full mx-1"></span>
                  <span class="text-sm font-mono">${edu.period}</span>
                </p>
                ${(edu.highlights || []).length > 0 ? `
                  <div class="mt-4 space-y-2">
                    ${edu.highlights.map(h => `
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[16px]">check</span>
                        <span class="text-sm text-slate-300">${h}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      timeline.insertAdjacentHTML('beforeend', educationHtml);
    }
  }

  if (data.contact) {
    document.getElementById('contactHeadline').textContent = data.contact.headline || 'Get In Touch';
    document.getElementById('contactSubheadline').textContent = data.contact.subheadline || '';
    document.getElementById('contactAvailability').textContent = data.contact.availability || '';

    const emailEl = document.getElementById('contactEmail');
    emailEl.textContent = data.contact.email || '-';
    emailEl.href = `mailto:${data.contact.email || ''}`;

    document.getElementById('contactLocation').textContent = data.contact.location || '-';

    if (data.contact.phone) {
      document.getElementById('phoneCard').classList.remove('hidden');
      document.getElementById('phoneCard').classList.add('flex');
      const phoneEl = document.getElementById('contactPhone');
      phoneEl.textContent = data.contact.phone;
      phoneEl.href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
    }

    if (data.contact.lineId) {
      document.getElementById('lineCard').classList.remove('hidden');
      document.getElementById('lineCard').classList.add('flex');
      document.getElementById('contactLine').textContent = data.contact.lineId;
    }
  }
}

function openProjectModal(projectId) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  document.getElementById('modalCategory').textContent = project.category || 'Project';
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.fullDescription || project.description;

  const mainImage = project.images && project.images.length > 0 ? project.images[0] : project.image;
  document.getElementById('modalMainImage').style.backgroundImage = `url("${mainImage}")`;

  const gallery = document.getElementById('modalGallery');
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  gallery.innerHTML = images.map((img, index) => `
    <div class="flex-shrink-0 w-20 h-16 rounded-lg bg-cover bg-center cursor-pointer border-2 ${index === 0 ? 'border-primary' : 'border-transparent hover:border-primary/50'} transition-colors" 
         style='background-image: url("${img}")' 
         onclick="changeMainImage('${img}', this)">
    </div>
  `).join('');

  document.getElementById('modalTags').innerHTML = (project.tags || []).map(tag =>
    `<span class="px-4 py-2 rounded-lg bg-background-dark text-sm font-medium border border-surface-border">${tag}</span>`
  ).join('');

  const githubLink = document.getElementById('modalGithub');
  const liveLink = document.getElementById('modalLive');

  if (project.githubUrl && project.githubUrl !== '#') {
    githubLink.href = project.githubUrl;
    githubLink.classList.remove('hidden');
  } else {
    githubLink.classList.add('hidden');
  }

  if (project.liveUrl && project.liveUrl !== '#') {
    liveLink.href = project.liveUrl;
    liveLink.classList.remove('hidden');
  } else {
    liveLink.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function changeMainImage(imageUrl, element) {
  document.getElementById('modalMainImage').style.backgroundImage = `url("${imageUrl}")`;
  document.querySelectorAll('#modalGallery > div').forEach(el => {
    el.classList.remove('border-primary');
    el.classList.add('border-transparent');
  });
  element.classList.remove('border-transparent');
  element.classList.add('border-primary');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

document.getElementById('projectModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'projectModal') closeProjectModal();
});

document.addEventListener('DOMContentLoaded', loadPortfolio);
