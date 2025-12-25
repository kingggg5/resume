const express = require('express');
const router = express.Router();
const repository = require('../data/repository');

const handleError = (res, error) => {
    console.error('API Error:', error.message);
    res.status(400).json({ error: error.message });
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
router.get('/all', async (req, res) => {
    try {
        const data = await repository.getAllData();
        res.json(data);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/profile', async (req, res) => {
    try {
        const profile = await repository.getProfile();
        res.json(profile);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/profile', async (req, res) => {
    try {
        const profile = await repository.updateProfile(req.body);
        res.json(profile);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/hero', async (req, res) => {
    try {
        const hero = await repository.getHero();
        res.json(hero);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/hero', async (req, res) => {
    try {
        const hero = await repository.updateHero(req.body);
        res.json(hero);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/about', async (req, res) => {
    try {
        const about = await repository.getAbout();
        res.json(about);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/about', async (req, res) => {
    try {
        const about = await repository.updateAbout(req.body);
        res.json(about);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/skills', async (req, res) => {
    try {
        const skills = await repository.getSkills();
        res.json(skills);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/skills', async (req, res) => {
    try {
        const skill = { ...req.body, id: generateId() };
        const result = await repository.addSkill(skill);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/skills/:id', async (req, res) => {
    try {
        const skill = await repository.updateSkill(req.params.id, req.body);
        res.json(skill);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/skills/:id', async (req, res) => {
    try {
        await repository.deleteSkill(req.params.id);
        res.json({ success: true });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/projects', async (req, res) => {
    try {
        const projects = await repository.getProjects();
        res.json(projects);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/projects', async (req, res) => {
    try {
        const project = { ...req.body, id: generateId() };
        const result = await repository.addProject(project);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/projects/:id', async (req, res) => {
    try {
        const project = await repository.updateProject(req.params.id, req.body);
        res.json(project);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/projects/:id', async (req, res) => {
    try {
        await repository.deleteProject(req.params.id);
        res.json({ success: true });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/experience', async (req, res) => {
    try {
        const experience = await repository.getExperience();
        res.json(experience);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/experience', async (req, res) => {
    try {
        const experience = { ...req.body, id: generateId() };
        const result = await repository.addExperience(experience);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/experience/:id', async (req, res) => {
    try {
        const experience = await repository.updateExperience(req.params.id, req.body);
        res.json(experience);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/experience/:id', async (req, res) => {
    try {
        await repository.deleteExperience(req.params.id);
        res.json({ success: true });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/contact', async (req, res) => {
    try {
        const contact = await repository.getContact();
        res.json(contact);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/contact', async (req, res) => {
    try {
        const contact = await repository.updateContact(req.body);
        res.json(contact);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/settings', async (req, res) => {
    try {
        const settings = await repository.getSettings();
        res.json(settings);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/settings', async (req, res) => {
    try {
        const settings = await repository.updateSettings(req.body);
        res.json(settings);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await repository.getStats();
        res.json(stats);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/stats', async (req, res) => {
    try {
        const stats = await repository.updateStats(req.body);
        res.json(stats);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
