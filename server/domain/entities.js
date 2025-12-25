class Profile {
  constructor({ name, title, bio, avatar }) {
    this.name = name;
    this.title = title;
    this.bio = bio;
    this.avatar = avatar;
  }

  validate() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required');
    }
    return true;
  }
}

class Skill {
  constructor({ id, name }) {
    this.id = id || this.generateId();
    this.name = name;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  validate() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Skill name is required');
    }
    return true;
  }
}

class Project {
  constructor({ id, title, description, image, tags }) {
    this.id = id || this.generateId();
    this.title = title;
    this.description = description;
    this.image = image || '';
    this.tags = tags || [];
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  validate() {
    if (!this.title || this.title.trim() === '') {
      throw new Error('Project title is required');
    }
    return true;
  }
}

class Experience {
  constructor({ id, title, company, period, icon }) {
    this.id = id || this.generateId();
    this.title = title;
    this.company = company;
    this.period = period;
    this.icon = icon || 'work';
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  validate() {
    if (!this.title || this.title.trim() === '') {
      throw new Error('Experience title is required');
    }
    if (!this.company || this.company.trim() === '') {
      throw new Error('Company is required');
    }
    return true;
  }
}

module.exports = {
  Profile,
  Skill,
  Project,
  Experience
};
