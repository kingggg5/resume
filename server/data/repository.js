const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

class DataRepository {
    async readData() {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading data file:', error);
            throw new Error('Failed to read data');
        }
    }

    async writeData(data) {
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error writing data file:', error);
            throw new Error('Failed to write data');
        }
    }

    async getProfile() {
        const data = await this.readData();
        return data.profile;
    }

    async updateProfile(profile) {
        const data = await this.readData();
        data.profile = { ...data.profile, ...profile };
        await this.writeData(data);
        return data.profile;
    }

    async getHero() {
        const data = await this.readData();
        return data.hero;
    }

    async updateHero(hero) {
        const data = await this.readData();
        data.hero = { ...data.hero, ...hero };
        await this.writeData(data);
        return data.hero;
    }

    async getAbout() {
        const data = await this.readData();
        return data.about;
    }

    async updateAbout(about) {
        const data = await this.readData();
        data.about = { ...data.about, ...about };
        await this.writeData(data);
        return data.about;
    }

    async getSkills() {
        const data = await this.readData();
        return data.skills;
    }

    async addSkill(skill) {
        const data = await this.readData();
        data.skills.push(skill);
        await this.writeData(data);
        return skill;
    }

    async updateSkill(id, skillData) {
        const data = await this.readData();
        const index = data.skills.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error('Skill not found');
        }
        data.skills[index] = { ...data.skills[index], ...skillData, id };
        await this.writeData(data);
        return data.skills[index];
    }

    async deleteSkill(id) {
        const data = await this.readData();
        const index = data.skills.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error('Skill not found');
        }
        data.skills.splice(index, 1);
        await this.writeData(data);
        return true;
    }

    async getProjects() {
        const data = await this.readData();
        return data.projects;
    }

    async addProject(project) {
        const data = await this.readData();
        data.projects.push(project);
        await this.writeData(data);
        return project;
    }

    async updateProject(id, projectData) {
        const data = await this.readData();
        const index = data.projects.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Project not found');
        }
        data.projects[index] = { ...data.projects[index], ...projectData, id };
        await this.writeData(data);
        return data.projects[index];
    }

    async deleteProject(id) {
        const data = await this.readData();
        const index = data.projects.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Project not found');
        }
        data.projects.splice(index, 1);
        await this.writeData(data);
        return true;
    }

    async getExperience() {
        const data = await this.readData();
        return data.experience;
    }

    async addExperience(experience) {
        const data = await this.readData();
        data.experience.push(experience);
        await this.writeData(data);
        return experience;
    }

    async updateExperience(id, experienceData) {
        const data = await this.readData();
        const index = data.experience.findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error('Experience not found');
        }
        data.experience[index] = { ...data.experience[index], ...experienceData, id };
        await this.writeData(data);
        return data.experience[index];
    }

    async deleteExperience(id) {
        const data = await this.readData();
        const index = data.experience.findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error('Experience not found');
        }
        data.experience.splice(index, 1);
        await this.writeData(data);
        return true;
    }

    async getContact() {
        const data = await this.readData();
        return data.contact;
    }

    async updateContact(contact) {
        const data = await this.readData();
        data.contact = { ...data.contact, ...contact };
        await this.writeData(data);
        return data.contact;
    }

    async getSettings() {
        const data = await this.readData();
        return data.settings;
    }

    async updateSettings(settings) {
        const data = await this.readData();
        data.settings = { ...data.settings, ...settings };
        await this.writeData(data);
        return data.settings;
    }

    async getStats() {
        const data = await this.readData();
        return data.stats;
    }

    async updateStats(stats) {
        const data = await this.readData();
        data.stats = { ...data.stats, ...stats };
        await this.writeData(data);
        return data.stats;
    }

    async getAllData() {
        return await this.readData();
    }
}

module.exports = new DataRepository();
