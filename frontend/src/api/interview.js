export default class InterviewApi {
  static async getInterview(interviewId) {
    try {
      const interviewResponse = await fetch(
        `http://localhost:8080/interview/${interviewId}`,
        {
          method: "GET",
        }
      );
      const interviewBody = await interviewResponse.json();

      if (interviewResponse.status !== 200) {
        return Promise.reject(interviewBody);
      }

      return interviewBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async getInterviewList() {
    try {
      const interviewResponse = await fetch(
        `http://localhost:8080/interview/`,
        {
          method: "GET",
        }
      );
      const interviewBody = await interviewResponse.json();

      if (interviewResponse.status !== 200) {
        return Promise.reject(interviewBody);
      }

      return interviewBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async createInterview(name, startTime, specialistId, skills) {
    try {
      const interviewResponse = await fetch(
        `http://localhost:8080/interview/`,
        {
          method: "POST",
          body: JSON.stringify({ name, startTime, specialistId, skills }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const interviewBody = await interviewResponse.json();

      if (interviewResponse.status !== 200) {
        return Promise.reject(interviewBody);
      }

      return interviewBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async updateInterview(
    { interviewId, name, startTime, specialistId, skills } = {
      interviewId: null,
      name,
      startTime,
      specialistId,
      skills,
    }
  ) {
    try {
      const interviewResponse = await fetch(
        `http://localhost:8080/interview/${interviewId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name, startTime, specialistId, skills }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const interviewBody = await interviewResponse.json();

      if (interviewResponse.status !== 200) {
        return Promise.reject(interviewBody);
      }

      return interviewBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }

  static async deleteInterview(interviewId) {
    try {
      const interviewResponse = await fetch(
        `http://localhost:8080/interview/${interviewId}`,
        {
          method: "DELETE",
        }
      );
      const interviewBody = await interviewResponse.json();

      if (interviewResponse.status !== 200) {
        return Promise.reject(interviewBody);
      }

      return interviewBody;
    } catch (err) {
      return Promise.reject({
        timestamp: new Date().toISOString(),
        statusCode: 400,
        message: err.message,
      });
    }
  }
}
