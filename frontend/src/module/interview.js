import InterviewApi from "../api/interview.js";

export default class Interview {
  #interviewID = -1;
  #name = "";
  #startTime = "";
  #specialistID = "";
  #skills = [];

  constructor({
    interview_id,
    interview_name,
    interview_specialist,
    interview_start_time,
    skills,
  }) {
    this.#interviewID = interview_id;
    this.#name = interview_name;
    this.#startTime = interview_start_time;
    this.#specialistID = interview_specialist;
    this.#skills = skills;
  }

  get interviewID() {
    return this.#interviewID;
  }

  get name() {
    return this.#name;
  }
  set name(newName) {
    if (typeof newName === "string") {
      this.#name = newName;
    }
  }

  get startTime() {
    return this.#startTime;
  }
  set startTime(newTime) {
    if (typeof newTime === "object" && newTime instanceof Date) {
      this.#startTime = newTime;
    }
  }

  get specialist() {
    return this.#specialistID;
  }
  set specialist(newSpecialist) {
    this.#specialistID = newSpecialist;
  }

  get skills() {
    return this.#skills;
  }
  set skills(newSkills) {
    if (Array.isArray(newSkills)) {
      if (
        newSkills.every((skill) => typeof skill === "object" && skill !== null)
      ) {
        this.#skills = newSkills;
      }
    } else {
      console.error(
        "Invalid value for skills. Should be an array of skill objects."
      );
    }
  }

  render() {
    const interviewListItem = document.createElement("li");
    interviewListItem.classList.add("interview");
    interviewListItem.setAttribute("data-interview-id", this.#interviewID);

    const idParagraph = document.createElement("p");
    idParagraph.textContent = `ID: ${this.#interviewID}`;
    interviewListItem.appendChild(idParagraph);

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = `Name: ${this.#name}`;
    interviewListItem.appendChild(nameParagraph);

    const startTimeParagraph = document.createElement("p");
    startTimeParagraph.textContent = `Start Time: ${this.#startTime}`;
    interviewListItem.appendChild(startTimeParagraph);

    const specialistParagraph = document.createElement("p");
    specialistParagraph.textContent = `Specialist: ${this.#specialistID}`;
    interviewListItem.appendChild(specialistParagraph);

    const skillsList = document.createElement("ul");
    this.#skills.forEach((skill) => {
      const skillItem = document.createElement("li");
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
    interviewListItem.appendChild(skillsList);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => this.handleDelete());
    interviewListItem.appendChild(deleteButton);

    const interviewsList = document.getElementById("interviews");
    interviewsList.appendChild(interviewListItem);
  }

  handleDelete() {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete this interview?"
      );

      if (confirmDelete) {
        InterviewApi.deleteInterview(this.#interviewID);

        const interviewListItem = document.querySelector(
          `[data-interview-id="${this.#interviewID}"]`
        );
        if (interviewListItem) {
          interviewListItem.remove();
          console.log(
            `Interview with ID ${this.#interviewID} deleted successfully.`
          );
        } else {
          console.error(
            `Interview with ID ${this.#interviewID} not found in the DOM.`
          );
        }
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  }
}
