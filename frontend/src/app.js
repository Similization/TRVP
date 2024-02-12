import Skill from "./module/skill.js";
import Specialist from "./module/specialist.js";
import Interview from "./module/interview.js";

import SkillApi from "./api/skill.js";
import SpecialistApi from "./api/specialist.js";
import InterviewApi from "./api/interview.js";

export default class App {
  #skills = [];
  #specialists = [];
  #interviews = [];

  addSkill() {}

  initSkills(skills) {
    try {
      console.log("Skills:", skills);

      // Render each skill
      skills.forEach((skillData) => {
        const skill = new Skill(skillData);
        this.#skills.push(skill);
        skill.render();
      });
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  }

  async initSpecialists(specialists) {
    try {
      console.log("Specialists:", specialists);

      // Render each specialist
      specialists.forEach((specialistData) => {
        const specialist = new Specialist(specialistData);
        this.#specialists.push(specialist);
        specialist.render();
      });
    } catch (error) {
      console.error("Error fetching specialists:", error);
    }
  }

  async initInterviews(interviews) {
    try {
      console.log("Interviews:", interviews);

      // Render each interview
      interviews.forEach((interviewData) => {
        const interview = new Interview(interviewData);
        this.#interviews.push(interview);
        interview.render();
      });
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  }

  async init() {
    const skills = await SkillApi.getSkillList();
    this.initSkills(skills);
    const specialists = await SpecialistApi.getSpecialistList();
    this.initSpecialists(specialists);
    const interviews = await InterviewApi.getInterviewList();
    this.initInterviews(interviews);

    // Get the skillsCheckboxList container
    const skillsCheckboxList = document.getElementById("skillsCheckboxList");

    // Populate the skills with checkboxes dynamically
    this.#skills.forEach((skill) => {
      const skillCheckbox = document.createElement("input");
      skillCheckbox.type = "checkbox";
      skillCheckbox.name = "selectedSkills";
      skillCheckbox.value = skill.skillID;

      const skillLabel = document.createElement("label");
      skillLabel.textContent = skill.skillName;
      skillLabel.appendChild(skillCheckbox);

      skillsCheckboxList.appendChild(skillLabel);
    });

    // Now, you can handle the selected skills when needed, for example, on form submission
    const addSpecialistForm = document.getElementById("addSpecialistForm");
    addSpecialistForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get the selected skill IDs
      const selectedSkillCheckboxes = document.querySelectorAll(
        'input[name="selectedSkills"]:checked'
      );
      const selectedSkillIDs = Array.from(selectedSkillCheckboxes).map(
        (checkbox) => checkbox.value
      );

      // Use the selected skill IDs as needed
      console.log("Selected Skill IDs:", selectedSkillIDs);
    });

    // Handle form submission
    addSpecialistForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form data
      const name = document.getElementById("specialistName").value;
      const startTime = document.getElementById("startTime").value;
      const endTime = document.getElementById("endTime").value;

      // Get the selected skill IDs
      const selectedSkillCheckboxes = document.querySelectorAll(
        'input[name="selectedSkills"]:checked'
      );
      const skills = Array.from(selectedSkillCheckboxes).map(
        (checkbox) => checkbox.value
      );

      try {
        // Use the SkillApi class to add the skill to the database
        const response = await SpecialistApi.createSpecialist(
          name,
          startTime,
          endTime,
          skills
        );
        console.log(response);
        const specialist = new Specialist(response);
        specialist.render();
      } catch (error) {
        console.error("Error creating specialist:", error);
        alert("Error creating specialist. Please try again.");
      }
    });

    const addSkillForm = document.getElementById("addSkillForm");

    addSkillForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const skillNameInput = document.getElementById("skillName");
      const skillName = skillNameInput.value;

      try {
        // Use the SkillApi class to add the skill to the database
        const response = await SkillApi.createSkill(skillName);
        console.log(response);
        const skill = new Skill(response);
        skill.render();
      } catch (error) {
        console.error("Error:", error);
      }
    });

    const specialistSelect = document.getElementById("specialistSelect");

    // Populate the specialistSelect dropdown with options
    this.#specialists.forEach((specialist) => {
      const option = document.createElement("option");
      option.value = specialist.specialistID;
      option.textContent = specialist.specialistName;
      specialistSelect.appendChild(option);
    });

    // Get the skillsCheckboxList container
    const skillsInterviewCheckboxList = document.getElementById(
      "skillsInterviewCheckboxList"
    );

    // Populate the skills with checkboxes dynamically
    this.#skills.forEach((skill) => {
      const skillsInterviewCheckbox = document.createElement("input");
      skillsInterviewCheckbox.type = "checkbox";
      skillsInterviewCheckbox.name = "selectedSkills";
      skillsInterviewCheckbox.value = skill.skillID;

      const skillLabel = document.createElement("label");
      skillLabel.textContent = skill.skillName;
      skillLabel.appendChild(skillsInterviewCheckbox);

      skillsInterviewCheckboxList.appendChild(skillLabel);
    });

    // Handle form submission
    const addInterviewForm = document.getElementById("addInterviewForm");
    addInterviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form data
      const name = document.getElementById("candidateName").value;
      const startTime = document.getElementById("interviewTime").value;

      // Get the selected skill IDs
      const selectedSkillCheckboxes = document.querySelectorAll(
        'input[name="selectedSkills"]:checked'
      );
      const skills = Array.from(selectedSkillCheckboxes).map(
        (checkbox) => checkbox.value
      );

      // Get the selected specialist ID
      const specialistId = specialistSelect.value;

      try {
        // Use the SkillApi class to add the skill to the database
        const response = await InterviewApi.createInterview(
          name,
          startTime,
          specialistId,
          skills
        );
        console.log(response);
        const interview = new Interview(response);
        interview.render();
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
}
