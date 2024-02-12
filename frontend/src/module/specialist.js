import SkillApi from "../api/skill";
import SpecialistApi from "../api/specialist";

export default class Specialist {
  #specialistID = -1;
  #name = "";
  #startTime = "";
  #endTime = "";
  #skills = [];

  constructor({
    specialist_id,
    specialist_name,
    specialist_start_time,
    specialist_end_time,
    skills,
  }) {
    this.#specialistID = specialist_id;
    this.#name = specialist_name;
    this.#startTime = specialist_start_time;
    this.#endTime = specialist_end_time;
    this.#skills = skills;
  }

  get specialistID() {
    return this.#specialistID;
  }

  get specialistName() {
    return this.#name;
  }
  set specialistName(newName) {
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

  get endTime() {
    return this.#endTime;
  }
  set endTime(newTime) {
    if (typeof newTime === "object" && newTime instanceof Date) {
      this.#endTime = newTime;
    }
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
    const specialistListItem = document.createElement("li");
    specialistListItem.classList.add("specialist");
    specialistListItem.setAttribute("data-specialist-id", this.#specialistID);

    const heading = document.createElement("h2");
    heading.textContent = `Specialist ${this.#specialistID}`;
    specialistListItem.appendChild(heading);

    const idParagraph = document.createElement("p");
    idParagraph.textContent = `ID: ${this.#specialistID}`;
    specialistListItem.appendChild(idParagraph);

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = `Name: ${this.#name}`;
    specialistListItem.appendChild(nameParagraph);

    const workingHoursParagraph = document.createElement("p");
    workingHoursParagraph.textContent = `Working Hours: ${this.#startTime} - ${
      this.#endTime
    }`;
    specialistListItem.appendChild(workingHoursParagraph);

    const skillsList = document.createElement("ul");

    this.#skills.forEach((skill) => {
      const skillItem = document.createElement("li");
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
    specialistListItem.appendChild(skillsList);

    // Create update button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", (event) => this.handleUpdate(event));
    specialistListItem.appendChild(updateButton);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => this.handleDelete());
    specialistListItem.appendChild(deleteButton);

    const specialistsList = document.getElementById("specialists");

    // Append the specialist li to the ul element
    specialistsList.appendChild(specialistListItem);
  }

  // handleUpdate() {
  //   // Get updated values from the update form
  //   const updatedName = document.getElementById("updateSpecialistName").value;
  //   const updatedStartTime = document.getElementById("updateStartTime").value;
  //   const updatedEndTime = document.getElementById("updateEndTime").value;

  //   // Get selected skills from the update form
  //   const updatedSkills = [];
  //   const updateSkillsCheckboxes = document.querySelectorAll(
  //     'input[name="updateSpecialistSkills"]:checked'
  //   );
  //   updateSkillsCheckboxes.forEach((checkbox) =>
  //     updatedSkills.push(checkbox.value)
  //   );

  //   // Assume there's a method to update specialist data on the server
  //   SpecialistApi.updateSpecialist(
  //     this.#specialistID,
  //     updatedName,
  //     updatedStartTime,
  //     updatedEndTime,
  //     updatedSkills
  //   );

  //   // Assuming you have a render method to refresh the UI with updated data
  //   this.render();

  //   // After updating, show the add specialist form and hide the update specialist form
  // }

  // Assuming you have a handleUpdate function
  handleUpdate(event) {
    // Fetch specialist data and update the "Update Specialist" form
    const specialistListItem = event.target.closest(".specialist");

    // Fetch specialist data from the list item
    const specialistId = specialistListItem.dataset.specialistId;
    console.log(specialistId)
    const response = SpecialistApi.getSpecialist(specialistId);
    // Show the "Update Specialist" form and hide the "Add Specialist" form
    document.getElementById("add-specialist-form").style.display = "none";
    document.getElementById("update-specialist-form").style.display = "block";

    // Call a function to fill the "Update Specialist" form with the fetched data
    this.fillUpdateForm(response);
  }

  // Function to fill the "Update Specialist" form
  fillUpdateForm(id, name, startTime, endTime, skills) {
    // Assuming there are input fields and checkboxes in the update form
    const updateSpecialistNameInput = document.getElementById(
      "updateSpecialistName"
    );
    const updateStartTimeInput = document.getElementById("updateStartTime");
    const updateEndTimeInput = document.getElementById("updateEndTime");
    const updateSkillsCheckboxList = document.getElementById(
      "updateSkillsCheckboxList"
    );

    // Fill in the input fields with the fetched data
    updateSpecialistNameInput.value = name;
    updateStartTimeInput.value = startTime;
    updateEndTimeInput.value = endTime;

    // Clear any existing checkboxes in the skills list
    updateSkillsCheckboxList.innerHTML = "";

    // Fetch all available skills (you need to implement this)
    const allSkills = SkillApi.getSkillList();

    // Create checkboxes for each skill and append them to the skills list
    allSkills.forEach((skill) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `updateSkillCheckbox_${skill.id}`;
      checkbox.value = skill.id;
      checkbox.checked = skills.includes(skill.name);

      const label = document.createElement("label");
      label.textContent = skill.name;
      label.htmlFor = `updateSkillCheckbox_${skill.id}`;

      updateSkillsCheckboxList.appendChild(checkbox);
      updateSkillsCheckboxList.appendChild(label);
    });

    // Show the "Update Specialist" form and hide the "Add Specialist" form
    document.getElementById("add-specialist-form").style.display = "none";
    document.getElementById("update-specialist-form").style.display = "block";
  }

  handleDelete() {
    try {
      SpecialistApi.deleteSpecialist(this.#specialistID)
        .then(() => {
          const specialistListItem = document.querySelector(
            `[data-specialist-id="${this.#specialistID}"]`
          );
          if (specialistListItem) {
            specialistListItem.remove();
            console.log(
              `Specialist with ID ${this.#specialistID} deleted successfully.`
            );
          } else {
            console.error(
              `Specialist with ID ${this.#specialistID} not found in the DOM.`
            );
          }
        })
        .catch((error) => {
          console.error(
            `Error deleting Specialist with ID ${this.#specialistID}:`,
            error
          );
        });
    } catch (error) {
      console.error(
        `Error handling delete for Specialist with ID ${this.#specialistID}:`,
        error
      );
    }
  }
}
