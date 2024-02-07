export default class Specialist {
    #specialistID = -1;
    #name = '';
    #startTime = '';
    #endTime = '';
    #skills = [];
  
    constructor({
        specialistID,
        name,
        startTime,
        endTime,
        skills
    }) {
        this.#specialistID = specialistID;
        this.#name = name;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#skills = skills;
    }
  
    get specialistID() { 
        return this.#specialistID; 
    }
  
    get specialistName() { 
        return this.#name; 
    }
    set specialistName(newName) {
      if (typeof newName === 'string') {
        this.#name = newName;
      }
    }
  
    get startTime() { 
        return this.#startTime; 
    }
    set startTime(newTime) {
      if (typeof newTime === 'Date') {
        this.#startTime = newTime;
      }
    }
  
    get endTime() { 
        return this.#endTime; 
    }
    set endTime(newTime) {
        if (typeof newTime === 'object' && newTime instanceof Date) {
            this.#startTime = newTime;
        }
    }

    get skills() { 
        return this.#skills; 
    }
    set skills(newSkills) {
        if (Array.isArray(newSkills)) {
            if (newSkills.every(skill => typeof skill === 'object' && skill !== null)) {
                this.#skills = newSkills;
            } 
        } else {
            console.error('Invalid value for skills. Should be an array of skill objects.');
        }
    }
  
    render() {
        const specialistDiv = document.createElement('div');
        specialistDiv.classList.add('specialist');

        const heading = document.createElement('h2');
        heading.textContent = `Specialist ${this.#specialistID}`;
        specialistDiv.appendChild(heading);

        const idParagraph = document.createElement('p');
        idParagraph.textContent = `ID: ${this.#specialistID}`;
        specialistDiv.appendChild(idParagraph);

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `Name: ${this.#name}`;
        specialistDiv.appendChild(nameParagraph);

        const workingHoursParagraph = document.createElement('p');
        workingHoursParagraph.textContent = `Working Hours: ${this.#startTime} - ${this.#endTime}`;
        specialistDiv.appendChild(workingHoursParagraph);

        const skillsList = document.createElement('ul');
        this.#skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.textContent = skill.name;
            skillsList.appendChild(skillItem);
        });
        specialistDiv.appendChild(skillsList);

        document.body.appendChild(specialistDiv);
    }
  };