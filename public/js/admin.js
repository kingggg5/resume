/**
 * Admin Dashboard JavaScript - Full CMS
 * Handles all admin page interactions and API calls for all sections
 */

const API_BASE = '/api';

// State
let data = {
    profile: {},
    hero: {},
    about: {},
    skills: [],
    projects: [],
    experience: [],
    contact: {},
    settings: {},
    stats: {}
};

// ==================== Toast ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastMessage.textContent = message;
    toastIcon.textContent = type === 'success' ? 'check_circle' : 'error';
    toastIcon.className = `material-symbols-outlined ${type === 'success' ? 'text-green-400' : 'text-red-400'}`;

    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ==================== Tab Navigation ====================
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-surface-dark');
    });

    document.getElementById(`tab-${tabName}`).classList.add('active');
    const activeBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('bg-primary', 'text-white');
        activeBtn.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-surface-dark');
    }
}

// ==================== API Functions ====================
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        showToast('Error loading data', 'error');
        return null;
    }
}

async function putData(endpoint, payload) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch (error) {
        console.error('Put error:', error);
        showToast('Error saving data', 'error');
        return null;
    }
}

async function postData(endpoint, payload) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch (error) {
        console.error('Post error:', error);
        showToast('Error saving data', 'error');
        return null;
    }
}

async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting data', 'error');
        return null;
    }
}

// ==================== Load All Data ====================
async function loadAllData() {
    const result = await fetchData('/all');
    if (result) {
        data = result;
        renderDashboard();
        renderHero();
        renderAbout();
        renderSkills();
        renderProjects();
        renderExperience();
        renderContact();
        renderSettings();
        updateSidebar();
    }
}

function updateSidebar() {
    document.getElementById('sidebarName').textContent = data.profile.name || 'Admin CMS';
    document.getElementById('sidebarTitle').textContent = data.profile.title || 'Portfolio Manager';
    if (data.profile.avatar) {
        document.getElementById('sidebarAvatar').style.backgroundImage = `url("${data.profile.avatar}")`;
    }
}

// ==================== Dashboard ====================
function renderDashboard() {
    document.getElementById('statProjects').textContent = data.projects.length;
    document.getElementById('statSkills').textContent = data.skills.length;
    document.getElementById('statExperience').textContent = data.experience.length;
}

// ==================== Hero ====================
function renderHero() {
    document.getElementById('heroHeadline').value = data.hero.headline || '';
    document.getElementById('heroSubheadline').value = data.hero.subheadline || '';
    document.getElementById('heroStatusText').value = data.hero.statusText || '';
    document.getElementById('heroStatusActive').value = String(data.hero.statusActive || false);
    document.getElementById('heroCtaPrimary').value = data.hero.ctaPrimary || '';
    document.getElementById('heroCtaSecondary').value = data.hero.ctaSecondary || '';
    document.getElementById('heroImage').value = data.hero.heroImage || '';
}

async function saveHero() {
    const heroData = {
        headline: document.getElementById('heroHeadline').value,
        subheadline: document.getElementById('heroSubheadline').value,
        statusText: document.getElementById('heroStatusText').value,
        statusActive: document.getElementById('heroStatusActive').value === 'true',
        ctaPrimary: document.getElementById('heroCtaPrimary').value,
        ctaSecondary: document.getElementById('heroCtaSecondary').value,
        heroImage: document.getElementById('heroImage').value
    };
    const result = await putData('/hero', heroData);
    if (result) {
        data.hero = result;
        showToast('Hero saved successfully');
    }
}

// ==================== About ====================
function renderAbout() {
    document.getElementById('profileName').value = data.profile.name || '';
    document.getElementById('profileTitle').value = data.profile.title || '';
    document.getElementById('profileBio').value = data.profile.bio || '';
    document.getElementById('profileAvatar').value = data.profile.avatar || '';
    document.getElementById('aboutTagline').value = data.about.tagline || '';
    document.getElementById('aboutHeadline').value = data.about.headline || '';
    document.getElementById('aboutDescription').value = data.about.description || '';
    document.getElementById('aboutJourney').value = data.about.journey || '';
    document.getElementById('aboutQuote').value = data.about.quote || '';
}

async function saveAbout() {
    const profileData = {
        name: document.getElementById('profileName').value,
        title: document.getElementById('profileTitle').value,
        bio: document.getElementById('profileBio').value,
        avatar: document.getElementById('profileAvatar').value
    };
    const aboutData = {
        tagline: document.getElementById('aboutTagline').value,
        headline: document.getElementById('aboutHeadline').value,
        description: document.getElementById('aboutDescription').value,
        journey: document.getElementById('aboutJourney').value,
        quote: document.getElementById('aboutQuote').value
    };

    const profileResult = await putData('/profile', profileData);
    const aboutResult = await putData('/about', aboutData);

    if (profileResult && aboutResult) {
        data.profile = profileResult;
        data.about = aboutResult;
        updateSidebar();
        showToast('About saved successfully');
    }
}

// ==================== Skills ====================
function renderSkills() {
    const container = document.getElementById('skillsGrid');
    const categories = { frontend: 'Frontend', backend: 'Backend', devops: 'DevOps', tools: 'Tools' };

    container.innerHTML = data.skills.map(skill => `
    <div class="bg-surface-dark border border-surface-border rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <span class="material-symbols-outlined">${skill.icon || 'code'}</span>
        </div>
        <div>
          <p class="font-bold">${skill.name}</p>
          <p class="text-xs text-slate-400">${categories[skill.category] || skill.category}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="editSkill('${skill.id}')" class="p-2 text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-[18px]">edit</span></button>
        <button onclick="deleteSkill('${skill.id}')" class="p-2 text-slate-400 hover:text-red-400"><span class="material-symbols-outlined text-[18px]">delete</span></button>
      </div>
    </div>
  `).join('');
}

function showSkillModal() {
    document.getElementById('skillModal').classList.remove('hidden');
    document.getElementById('skillModalTitle').textContent = 'Add Skill';
    document.getElementById('skillForm').reset();
    document.getElementById('skillId').value = '';
}

function closeSkillModal() {
    document.getElementById('skillModal').classList.add('hidden');
}

function editSkill(id) {
    const skill = data.skills.find(s => s.id === id);
    if (skill) {
        document.getElementById('skillModal').classList.remove('hidden');
        document.getElementById('skillModalTitle').textContent = 'Edit Skill';
        document.getElementById('skillId').value = skill.id;
        document.getElementById('skillName').value = skill.name;
        document.getElementById('skillCategory').value = skill.category || 'frontend';
        document.getElementById('skillIcon').value = skill.icon || '';
    }
}

async function saveSkill(event) {
    event.preventDefault();
    const skillData = {
        name: document.getElementById('skillName').value,
        category: document.getElementById('skillCategory').value,
        icon: document.getElementById('skillIcon').value || 'code'
    };
    const id = document.getElementById('skillId').value;

    if (id) {
        const result = await putData(`/skills/${id}`, skillData);
        if (result) {
            const index = data.skills.findIndex(s => s.id === id);
            data.skills[index] = result;
            showToast('Skill updated');
        }
    } else {
        const result = await postData('/skills', skillData);
        if (result) {
            data.skills.push(result);
            showToast('Skill added');
        }
    }
    renderSkills();
    renderDashboard();
    closeSkillModal();
}

async function deleteSkill(id) {
    if (confirm('Delete this skill?')) {
        const result = await deleteData(`/skills/${id}`);
        if (result) {
            data.skills = data.skills.filter(s => s.id !== id);
            renderSkills();
            renderDashboard();
            showToast('Skill deleted');
        }
    }
}

// ==================== Projects ====================
function renderProjects() {
    const container = document.getElementById('projectsGrid');
    container.innerHTML = data.projects.map(project => `
    <div class="bg-surface-dark border border-surface-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
      <div class="h-40 bg-cover bg-center relative" style='background-image: url("${project.image || ''}")'>
        ${(project.images && project.images.length > 1) ? `<span class="absolute top-2 right-2 bg-black/60 text-xs px-2 py-1 rounded flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">collections</span>${project.images.length}</span>` : ''}
      </div>
      <div class="p-4">
        <p class="text-xs text-primary font-bold uppercase mb-1">${project.category || 'Project'}</p>
        <h4 class="font-bold mb-2">${project.title}</h4>
        <p class="text-sm text-slate-400 line-clamp-2 mb-3">${project.description}</p>
        <div class="flex flex-wrap gap-1 mb-4">
          ${(project.tags || []).map(tag => `<span class="text-xs bg-background-dark px-2 py-0.5 rounded">${tag}</span>`).join('')}
        </div>
        <div class="flex justify-end gap-2 pt-2 border-t border-surface-border">
          <button onclick="editProject('${project.id}')" class="p-2 text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-[18px]">edit</span></button>
          <button onclick="deleteProject('${project.id}')" class="p-2 text-slate-400 hover:text-red-400"><span class="material-symbols-outlined text-[18px]">delete</span></button>
        </div>
      </div>
    </div>
  `).join('');
}

function showProjectModal() {
    document.getElementById('projectModal').classList.remove('hidden');
    document.getElementById('projectModalTitle').textContent = 'Add Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.add('hidden');
}

function editProject(id) {
    const project = data.projects.find(p => p.id === id);
    if (project) {
        document.getElementById('projectModal').classList.remove('hidden');
        document.getElementById('projectModalTitle').textContent = 'Edit Project';
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectCategory').value = project.category || '';
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectFullDescription').value = project.fullDescription || '';
        document.getElementById('projectImage').value = project.image || '';
        document.getElementById('projectImages').value = (project.images || []).join('\n');
        document.getElementById('projectTags').value = (project.tags || []).join(', ');
        document.getElementById('projectGithub').value = project.githubUrl || '';
        document.getElementById('projectLive').value = project.liveUrl || '';
    }
}

async function saveProject(event) {
    event.preventDefault();
    const imagesText = document.getElementById('projectImages').value;
    const images = imagesText.split('\n').map(u => u.trim()).filter(u => u);

    const projectData = {
        title: document.getElementById('projectTitle').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value,
        fullDescription: document.getElementById('projectFullDescription').value,
        image: document.getElementById('projectImage').value,
        images: images.length > 0 ? images : [document.getElementById('projectImage').value].filter(u => u),
        tags: document.getElementById('projectTags').value.split(',').map(t => t.trim()).filter(t => t),
        githubUrl: document.getElementById('projectGithub').value,
        liveUrl: document.getElementById('projectLive').value
    };
    const id = document.getElementById('projectId').value;

    if (id) {
        const result = await putData(`/projects/${id}`, projectData);
        if (result) {
            const index = data.projects.findIndex(p => p.id === id);
            data.projects[index] = result;
            showToast('Project updated');
        }
    } else {
        const result = await postData('/projects', projectData);
        if (result) {
            data.projects.push(result);
            showToast('Project added');
        }
    }
    renderProjects();
    renderDashboard();
    closeProjectModal();
}

async function deleteProject(id) {
    if (confirm('Delete this project?')) {
        const result = await deleteData(`/projects/${id}`);
        if (result) {
            data.projects = data.projects.filter(p => p.id !== id);
            renderProjects();
            renderDashboard();
            showToast('Project deleted');
        }
    }
}

// ==================== Experience ====================
function renderExperience() {
    const container = document.getElementById('experienceList');
    container.innerHTML = data.experience.map(exp => `
    <div class="bg-surface-dark border border-surface-border rounded-xl p-5 hover:border-primary/50 transition-colors">
      <div class="flex justify-between items-start mb-3">
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">${exp.icon || 'work'}</span>
          </div>
          <div>
            <h4 class="font-bold">${exp.title}</h4>
            <p class="text-sm text-slate-400">${exp.company} • ${exp.period}</p>
            ${exp.isCurrent ? '<span class="inline-block mt-1 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Current</span>' : ''}
          </div>
        </div>
        <div class="flex gap-2">
          <button onclick="editExperience('${exp.id}')" class="p-2 text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-[18px]">edit</span></button>
          <button onclick="deleteExperience('${exp.id}')" class="p-2 text-slate-400 hover:text-red-400"><span class="material-symbols-outlined text-[18px]">delete</span></button>
        </div>
      </div>
      ${(exp.highlights || []).length > 0 ? `
        <ul class="text-sm text-slate-400 ml-16 mb-3 space-y-1">
          ${exp.highlights.slice(0, 2).map(h => `<li>• ${h}</li>`).join('')}
        </ul>
      ` : ''}
      <div class="flex flex-wrap gap-1 ml-16">
        ${(exp.skills || []).map(s => `<span class="text-xs bg-background-dark px-2 py-0.5 rounded">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function showExperienceModal() {
    document.getElementById('experienceModal').classList.remove('hidden');
    document.getElementById('experienceModalTitle').textContent = 'Add Experience';
    document.getElementById('experienceForm').reset();
    document.getElementById('experienceId').value = '';
}

function closeExperienceModal() {
    document.getElementById('experienceModal').classList.add('hidden');
}

function editExperience(id) {
    const exp = data.experience.find(e => e.id === id);
    if (exp) {
        document.getElementById('experienceModal').classList.remove('hidden');
        document.getElementById('experienceModalTitle').textContent = 'Edit Experience';
        document.getElementById('experienceId').value = exp.id;
        document.getElementById('experienceTitle').value = exp.title;
        document.getElementById('experienceCompany').value = exp.company;
        document.getElementById('experiencePeriod').value = exp.period;
        document.getElementById('experienceCurrent').value = String(exp.isCurrent || false);
        document.getElementById('experienceIcon').value = exp.icon || '';
        document.getElementById('experienceHighlights').value = (exp.highlights || []).join('\n');
        document.getElementById('experienceSkills').value = (exp.skills || []).join(', ');
    }
}

async function saveExperience(event) {
    event.preventDefault();
    const expData = {
        title: document.getElementById('experienceTitle').value,
        company: document.getElementById('experienceCompany').value,
        period: document.getElementById('experiencePeriod').value,
        isCurrent: document.getElementById('experienceCurrent').value === 'true',
        icon: document.getElementById('experienceIcon').value || 'work',
        highlights: document.getElementById('experienceHighlights').value.split('\n').map(h => h.trim()).filter(h => h),
        skills: document.getElementById('experienceSkills').value.split(',').map(s => s.trim()).filter(s => s)
    };
    const id = document.getElementById('experienceId').value;

    if (id) {
        const result = await putData(`/experience/${id}`, expData);
        if (result) {
            const index = data.experience.findIndex(e => e.id === id);
            data.experience[index] = result;
            showToast('Experience updated');
        }
    } else {
        const result = await postData('/experience', expData);
        if (result) {
            data.experience.push(result);
            showToast('Experience added');
        }
    }
    renderExperience();
    renderDashboard();
    closeExperienceModal();
}

async function deleteExperience(id) {
    if (confirm('Delete this experience?')) {
        const result = await deleteData(`/experience/${id}`);
        if (result) {
            data.experience = data.experience.filter(e => e.id !== id);
            renderExperience();
            renderDashboard();
            showToast('Experience deleted');
        }
    }
}

// ==================== Contact ====================
function renderContact() {
    document.getElementById('contactEmail').value = data.contact.email || '';
    document.getElementById('contactPhone').value = data.contact.phone || '';
    document.getElementById('contactLine').value = data.contact.lineId || '';
    document.getElementById('contactLocation').value = data.contact.location || '';
    document.getElementById('contactHeadline').value = data.contact.headline || '';
    document.getElementById('contactSubheadline').value = data.contact.subheadline || '';
    document.getElementById('contactAvailability').value = data.contact.availability || '';
    document.getElementById('socialGithub').value = (data.contact.socials || {}).github || '';
    document.getElementById('socialLinkedin').value = (data.contact.socials || {}).linkedin || '';
    document.getElementById('socialTwitter').value = (data.contact.socials || {}).twitter || '';
}

async function saveContact() {
    const contactData = {
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        lineId: document.getElementById('contactLine').value,
        location: document.getElementById('contactLocation').value,
        headline: document.getElementById('contactHeadline').value,
        subheadline: document.getElementById('contactSubheadline').value,
        availability: document.getElementById('contactAvailability').value,
        socials: {
            github: document.getElementById('socialGithub').value,
            linkedin: document.getElementById('socialLinkedin').value,
            twitter: document.getElementById('socialTwitter').value
        }
    };
    const result = await putData('/contact', contactData);
    if (result) {
        data.contact = result;
        showToast('Contact saved successfully');
    }
}

// ==================== Settings ====================
function renderSettings() {
    document.getElementById('settingsSiteName').value = data.settings.siteName || '';
    document.getElementById('settingsPrimaryColor').value = data.settings.primaryColor || '';
    document.getElementById('settingsResumeUrl').value = data.settings.resumeUrl || '';
    document.getElementById('settingsFooterText').value = data.settings.footerText || '';
}

async function saveSettings() {
    const settingsData = {
        siteName: document.getElementById('settingsSiteName').value,
        primaryColor: document.getElementById('settingsPrimaryColor').value,
        resumeUrl: document.getElementById('settingsResumeUrl').value,
        footerText: document.getElementById('settingsFooterText').value
    };
    const result = await putData('/settings', settingsData);
    if (result) {
        data.settings = result;
        showToast('Settings saved successfully');
    }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();

    document.getElementById('skillForm').addEventListener('submit', saveSkill);
    document.getElementById('projectForm').addEventListener('submit', saveProject);
    document.getElementById('experienceForm').addEventListener('submit', saveExperience);
});
