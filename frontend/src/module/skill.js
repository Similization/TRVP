import SkillApi from "../api/skill";

export default class Skill {
  #skillID = -1;
  #name = "";

  constructor({ skill_id, skill_name }) {
    this.#skillID = skill_id;
    this.#name = skill_name;
  }

  get skillID() {
    return this.#skillID;
  }

  get skillName() {
    return this.#name;
  }

  set skillName(newName) {
    if (typeof newName === "string") {
      this.#name = newName;
    }
  }

  render() {
    // Create a li element to represent the Skill
    const skillListItem = document.createElement("li");
    skillListItem.classList.add("skill");
    skillListItem.setAttribute("data-skill-id", this.#skillID); // Add data-skill-id attribute

    // Add content to the li (e.g., skill name)
    skillListItem.innerHTML = `<p>Skill ID: ${
      this.#skillID
    }</p><p>Skill Name: ${this.#name}</p>`;

    // Create update button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => this.handleUpdate());

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => this.handleDelete());

    // Append buttons to the li
    skillListItem.appendChild(updateButton);
    skillListItem.appendChild(deleteButton);

    // Append the li to the skills list
    const skillsList = document.getElementById("skills");
    skillsList.appendChild(skillListItem);
  }

  handleUpdate() {
    try {
      // Prompt the user for a new skill name
      const newSkillName = prompt("Enter the new skill name:");

      // Check if the user provided a new skill name
      if (newSkillName !== null) {
        const skillListItem = document.querySelector(
          `[data-skill-id="${this.#skillID}"]`
        );
        if (skillListItem) {
          skillListItem.remove();
          console.log(`Skill with ID ${this.#skillID} deleted successfully.`);
        } else {
          console.error(`Skill with ID ${this.#skillID} not found in the DOM.`);
        }
        // Update the skill name in the frontend
        this.#name = newSkillName;
        this.render(); // Re-render the skill with the updated name

        // Update the skill in the backend
        SkillApi.updateSkill({ skillId: this.#skillID, name: newSkillName });
      }
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  }

  handleDelete() {
    try {
      // Call the SkillApi.deleteSkill method
      SkillApi.deleteSkill({ skillId: this.#skillID })
        .then(() => {
          // Remove the skill from the DOM
          const skillListItem = document.querySelector(
            `[data-skill-id="${this.#skillID}"]`
          );
          if (skillListItem) {
            skillListItem.remove();
            console.log(`Skill with ID ${this.#skillID} deleted successfully.`);
          } else {
            console.error(
              `Skill with ID ${this.#skillID} not found in the DOM.`
            );
          }
        })
        .catch((error) => {
          console.error(
            `Error deleting Skill with ID ${this.#skillID}:`,
            error
          );
        });
    } catch (error) {
      console.error(
        `Error handling delete for Skill with ID ${this.#skillID}:`,
        error
      );
    }
  }

  toString() {
    return `Skill ID: ${this.#skillID}, Name: ${this.#name}`;
  }
}
