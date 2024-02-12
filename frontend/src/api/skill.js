export default class SkillApi {
  static async getSkill({ skillId } = { skillId: null }) {
    try {
      const skillResponse = await fetch(
        `http://localhost:8080/skill/${skillId}`,
        {
          method: "GET",
        }
      );
      const skillBody = await skillResponse.json();

      if (skillResponse.status !== 200) {
        return Promise.reject(skillBody);
      }

      return skillBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async getSkillList() {
    try {
      const skillResponse = await fetch(`http://localhost:8080/skill/`, {
        method: "GET",
      });
      const skillBody = await skillResponse.json();

      if (skillResponse.status !== 200) {
        return Promise.reject(skillBody);
      }

      return skillBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async createSkill(name) {
    try {
      const skillResponse = await fetch(`http://localhost:8080/skill/`, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      const skillBody = await skillResponse.json();

      if (skillResponse.status !== 200) {
        return Promise.reject(skillBody);
      }

      return skillBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async updateSkill({ skillId, name } = { skillId: null, name }) {
    try {
      const skillResponse = await fetch(
        `http://localhost:8080/skill/${skillId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const skillBody = await skillResponse.json();

      if (skillResponse.status !== 200) {
        return Promise.reject(skillBody);
      }

      return skillBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async deleteSkill({ skillId } = { skillId: null }) {
    try {
      const skillResponse = await fetch(
        `http://localhost:8080/skill/${skillId}`,
        {
          method: "DELETE",
        }
      );
      const skillBody = await skillResponse.json();

      if (skillResponse.status !== 200) {
        return Promise.reject(skillBody);
      }

      return skillBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }
}
