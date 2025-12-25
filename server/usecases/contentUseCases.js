const repository = require('../data/repository');
const { Profile, Skill, Project, Experience } = require('../domain/entities');

class ContentUseCases {
    async getProfile() {
        return await repository.getProfile();
    }

    async updateProfile(profileData) {
        const profile = new Profile(profileData);
        profile.validate();
        return await repository.updateProfile(profile);
    }

    async getSkills() {
        return await repository.getSkills();
    }

    async addSkill(skillData) {
        const skill = new Skill(skillData);
        skill.validate();
        return await repository.addSkill(skill);
    }

    async deleteSkill(id) {
        return await repository.deleteSkill(id);
    }

    async getProjects() {
        return await repository.getProjects();
    }

    async addProject(projectData) {
        const project = new Project(projectData);
        project.validate();
        return await repository.addProject(project);
    }

    async updateProject(id, projectData) {
        const project = new Project({ ...projectData, id });
        project.validate();
        return await repository.updateProject(id, project);
    }

    async deleteProject(id) {
        return await repository.deleteProject(id);
    }

    async getExperience() {
        return await repository.getExperience();
    }

    async addExperience(experienceData) {
        const experience = new Experience(experienceData);
        experience.validate();
        return await repository.addExperience(experience);
    }

    async updateExperience(id, experienceData) {
        const experience = new Experience({ ...experienceData, id });
        experience.validate();
        return await repository.updateExperience(id, experience);
    }

    async deleteExperience(id) {
        return await repository.deleteExperience(id);
    }

    async getStats() {
        return await repository.getStats();
    }

    async updateStats(statsData) {
        return await repository.updateStats(statsData);
    }

    async getAllContent() {
        return await repository.getAllData();
    }
}

module.exports = new ContentUseCases();
