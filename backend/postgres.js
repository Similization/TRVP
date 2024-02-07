import pkg from "pg";
const { Client } = pkg;

class Database {
  constructor(config) {
    this.config = config;
    this.client = new Client(this.config);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Error connecting to the database", err);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log("Disconnected from the database");
    } catch (err) {
      console.error("Error disconnecting from the database", err);
    }
  }

  // specialists
  async getSpecialist(specialistId) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const sqlQuery = `
                SELECT specialist.id AS specialist_id, specialist.name AS specialist_name, specialist.start_time AS specialist_start_time, specialist.end_time AS specialist_end_time, array_agg(skill.name) AS skills
                FROM specialist
                LEFT JOIN specialist_skill ON specialist.id = specialist_skill.specialist
                LEFT JOIN skill ON specialist_skill.skill = skill.id
                WHERE specialist.id = $1
                GROUP BY specialist.id;
            `;

      const result = await this.client.query(sqlQuery, [specialistId]);

      if (result.rows.length > 0) {
        const row = result.rows[0];
        console.log(
          `Specialist ID: ${row.specialist_id}, Name: ${
            row.specialist_name
          }, Start time: ${row.start_time}, End time: ${
            row.end_time
          }, Skills: ${row.skills.join(", ")}`
        );
      } else {
        console.log(`Specialist with ID ${specialistId} not found.`);
      }
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async getSpecialistList() {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const sqlQuery = `
            SELECT specialist.id AS specialist_id, specialist.name AS specialist_name, specialist.start_time AS specialist_start_time, specialist.end_time AS specialist_end_time, array_agg(skill.name) AS skills
                FROM specialist
                LEFT JOIN specialist_skill ON specialist.id = specialist_skill.specialist
                LEFT JOIN skill ON specialist_skill.skill = skill.id
                GROUP BY specialist.id;
            `;

      const result = await this.client.query(sqlQuery);

      console.log("Specialists with Skills:");
      result.rows.forEach((row) => {
        console.log(
          `Specialist ID: ${row.specialist_id}, Name: ${
            row.specialist_name
          }, Start time: ${row.start_time}, End time: ${
            row.end_time
          }, Skills: ${row.skills.join(", ")}`
        );
      });
      return result.rows;
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async createSpecialist(specialistName, startTime, endTime, skillIdList) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const insertSpecialistQuery = `
                INSERT INTO specialist (name, start_time, end_time)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;

      const specialistResult = await this.client.query(insertSpecialistQuery, [
        specialistName,
        startTime,
        endTime,
      ]);
      const specialistId = specialistResult.rows[0].id;

      const insertSkillQuery = `
                INSERT INTO specialist_skill (specialist, skill)
                VALUES ($1, $2);
            `;

      for (const skillId of skillIdList) {
        await this.client.query(insertSkillQuery, [specialistId, skillId]);
      }

      console.log(`Specialist with ID ${specialistId} created successfully.`);
    } catch (err) {
      console.error("Error creating specialist", err);
    } finally {
      await this.client.end();
      console.log("client has disconnected");
    }
  }

  async updateSpecialist(
    specialistId,
    specialistFIO,
    startTime,
    endTime,
    skillIdList
  ) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const updateSpecialistQuery = `
                UPDATE specialist
                SET name = $1, start_time = $2, end_time = $3
                WHERE id = $4;
            `;

      await this.client.query(updateSpecialistQuery, [
        specialistFIO,
        startTime,
        endTime,
        specialistId,
      ]);

      const deleteSkillsQuery = `
                DELETE FROM specialist_skill
                WHERE specialist = $1;
            `;

      await this.client.query(deleteSkillsQuery, [specialistId]);

      const insertSkillQuery = `
                INSERT INTO specialist_skill (specialist, skill)
                VALUES ($1, $2);
            `;

      for (const skillId of skillIdList) {
        await this.client.query(insertSkillQuery, [specialistId, skillId]);
      }

      console.log(`Specialist with ID ${specialistId} updated successfully.`);
    } catch (err) {
      console.error("Error updating specialist", err);
    } finally {
      await this.client.end();
    }
  }

  async deleteSpecialist(specialistId) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const deleteSkillsQuery = `
                DELETE FROM specialist_skill
                WHERE specialist = $1;
            `;

      await this.client.query(deleteSkillsQuery, [specialistId]);

      const deleteSpecialistQuery = `
                DELETE FROM specialist
                WHERE id = $1;
            `;

      await this.client.query(deleteSpecialistQuery, [specialistId]);

      console.log(`Specialist with ID ${specialistId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting specialist", err);
    } finally {
      await this.client.end();
    }
  }

  async getSpecialistInterviewList(specialistId) {}

  // skills
  async getSkill(skillId) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const sqlQuery = `
                SELECT skill.id AS skill_id, skill.name AS skill_name
                FROM skill
                WHERE specialist.id = $1;
            `;

      const result = await this.client.query(sqlQuery, [skillId]);

      if (result.rows.length > 0) {
        const skill = result.rows[0];
        console.log(`Skill ID: ${skill.skill_id}, Name: ${skill.skill_name}`);
        return skill;
      } else {
        console.log(`Skill with ID ${skillId} not found.`);
        return null;
      }
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async getSkillList() {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const sqlQuery = `
                SELECT skill.id AS skill_id, skill.name AS skill_name
                FROM skill;
            `;

      const result = await this.client.query(sqlQuery, [skillId]);

      if (result.rows.length > 0) {
        const skills = result.rows;
        console.log("Skills:");
        result.rows.forEach((row) => {
          console.log(`Skill ID: ${row.skill_id}, Name: ${row.skill_name}`);
        });
        return skills;
      } else {
        console.log(`Skill with ID ${skillId} not found.`);
        return null;
      }
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async createSkill(skillName) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const sqlQuery = `
                INSERT INTO skill (name)
                VALUES ($1)
                RETURNING id;
            `;

      const result = await this.client.query(sqlQuery, [skillName]);

      if (result.rows.length > 0) {
        const skillId = result.rows[0];
        console.log(`Skill ID: ${skillId}}`);
        return skillId;
      } else {
        console.log(`Skill with ID ${skillId} not found.`);
        return null;
      }
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async updateSkill(skillId, skillName) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const sqlQuery = `
                UPDATE skill
                SET name = $1
                WHERE id = $2;
            `;

      const result = await this.client.query(sqlQuery, [skillName, skillId]);

      console.log(`Skill with ID ${skillId} updated successfully.`);
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async deleteSkill(skillId) {
    try {
      this.client = new Client(this.config);
      await this.client.connect();

      const deleteSkillQuery = `
                DELETE FROM skill
                WHERE id = $1;
            `;

      await this.client.query(deleteSkillQuery, [skillId]);

      console.log(`Skill with ID ${specialistId} deleted successfully.`);
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  // interviews
  async getInterview(interviewId) {
    try {
      await this.client.connect();

      const sqlQuery = `
                SELECT interview.id AS interview_id, interview.name AS interview_name, interview.start_date as interview_start_date, array_agg(skill.name) AS skills, interview.specialist as interview_specialist 
                FROM interview
                LEFT JOIN interview_skill ON interview.id = interview_skill.interview
                LEFT JOIN skill ON interview_skill.skill = skill.id
                WHERE interview.id = $1
                GROUP BY interview.id;
            `;

      const result = await this.client.query(sqlQuery, [interviewId]);

      if (result.rows.length > 0) {
        const row = result.rows[0];
        console.log(
          `Interview ID: ${row.interview_id}, Name: ${
            row.interview_name
          }, Date: ${row.interview_start_date}, Skills: ${row.skills.join(
            ", "
          )}, Specialist ID: ${row.specialist}`
        );
      } else {
        console.log(`Interview with ID ${interviewId} not found.`);
      }
      return row;
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async getInterviewList() {
    try {
      await this.client.connect();

      const sqlQuery = `
                SELECT interview.id AS interview_id, interview.name AS interview_name, interview.start_date as interview_start_date, array_agg(skill.name) AS skills, interview.specialist as interview_specialist 
                FROM interview
                LEFT JOIN interview_skill ON interview.id = interview_skill.interview
                LEFT JOIN skill ON interview_skill.skill = skill.id
                GROUP BY interview.id;
            `;

      const result = await this.client.query(sqlQuery);

      if (result.rows.length > 0) {
        console.log("Interviews with Skills:");
        result.rows.forEach((row) => {
          console.log(
            `Interview ID: ${row.interview_id}, Name: ${
              row.interview_name
            }, Date: ${row.interview_start_date}, Skills: ${row.skills.join(
              ", "
            )}, Specialist ID: ${row.specialist}`
          );
        });
        return result.rows;
      } else {
        console.log(`Interview with ID ${interviewId} not found.`);
      }
    } catch (err) {
      console.error("Error executing query", err);
    } finally {
      await this.client.end();
    }
  }

  async createInterview(candidateName, startTime, skillIdList, specialistId) {
    try {
      await this.client.connect();

      const insertInterviewQuery = `
                INSERT INTO interview (ame, start_date, specialist)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;

      const interviewResult = await this.client.query(insertInterviewQuery, [
        candidateName,
        startTime,
        specialistId,
      ]);
      const interviewId = interviewResult.rows[0].id;

      const insertSkillQuery = `
                INSERT INTO specialist_skill (interview, skill)
                VALUES ($1, $2);
            `;

      for (const skillId of skillIdList) {
        await this.client.query(insertSkillQuery, [specialistId, skillId]);
      }

      console.log(`Interview with ID ${interviewId} created successfully.`);
    } catch (err) {
      console.error("Error creating specialist", err);
    } finally {
      await this.client.end();
    }
  }

  async deleteInterview(interviewId) {
    try {
      await this.client.connect();

      const deleteSkillsQuery = `
                DELETE FROM specialist_skill
                WHERE specialist = $1;
            `;

      await this.client.query(deleteSkillsQuery, [specialistId]);

      const deleteSpecialistQuery = `
                DELETE FROM specialist
                WHERE specialist = $1;
            `;

      await this.client.query(deleteSpecialistQuery, [specialistId]);

      console.log(`Specialist with ID ${specialistId} deleted successfully.`);
    } catch (err) {
      console.error("Error updating specialist", err);
    } finally {
      await this.client.end();
    }
  }

  async changeInterviewSpecialist(interviewId, specialistId) {
    try {
      await this.client.connect();

      const updateInteerviewSpecialistQuery = `
                UPDATE interview
                SET specilist = $1
                WHERE id = $2;
            `;

      await this.client.query(updateInteerviewSpecialistQuery, [
        specialistId,
        interviewId,
      ]);

      console.log(
        `Interview with ID ${interviewId} specilist updated successfully.`
      );
    } catch (err) {
      console.error("Error updating interview", err);
    } finally {
      await this.client.end();
    }
  }
}

export { Database };
