export default class SpecialistApi {
  static async getSpecialist(specialistId) {
    try {
      const specialistResponse = await fetch(
        `http://localhost:8080/specialist/${specialistId}`,
        {
          method: "GET",
        }
      );
      const specialistBody = await specialistResponse.json();

      if (specialistResponse.status !== 200) {
        return Promise.reject(specialistBody);
      }

      return specialistBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async getSpecialistList() {
    try {
      const specialistResponse = await fetch(
        `http://localhost:8080/specialist/`,
        {
          method: "GET",
        }
      );
      const specialistBody = await specialistResponse.json();

      if (specialistResponse.status !== 200) {
        return Promise.reject(specialistBody);
      }

      return specialistBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async createSpecialist(name, startTime, endTime, skills) {
    try {
      const specialistResponse = await fetch(
        `http://localhost:8080/specialist/`,
        {
          method: "POST",
          body: JSON.stringify({ name, startTime, endTime, skills }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const specialistBody = await specialistResponse.json();

      if (specialistResponse.status !== 200) {
        return Promise.reject(specialistBody);
      }

      return specialistBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async updateSpecialist(
    specialistId,
    name,
    startTime,
    endTime,
    skills
  ) {
    try {
      const specialistResponse = await fetch(
        `http://localhost:8080/specialist/${specialistId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name, startTime, endTime, skills }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const specialistBody = await specialistResponse.json();

      if (specialistResponse.status !== 200) {
        return Promise.reject(specialistBody);
      }

      return specialistBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async deleteSpecialist(specialistId) {
    try {
      const specialistResponse = await fetch(
        `http://localhost:8080/specialist/${specialistId}`,
        {
          method: "DELETE",
        }
      );
      const specialistBody = await specialistResponse.json();

      if (specialistResponse.status !== 200) {
        return Promise.reject(specialistBody);
      }

      return specialistBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }
}
