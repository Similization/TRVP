export default class InterviewApi {
    static async getInterview({interviewId} = {interviewId: null}) {
        try {
            const interviewResponse = await fetch(
                `http://localhost:8080/interview/${interviewId}`, 
                {
                    method: 'GET'
                });
            const interviewBody = await interviewResponse.json();

            if (interviewResponse.status !== 200) {
                return Promise.reject(interviewBody);
            }

            return interviewBody;
        } catch (err) {
            return Promise.reject({
                timestamp: new Date().toISOString(),
                statusCode: 400,
                message: err.message
            });
        }
    }

    static async getInterviewList() {
        try {
            const interviewResponse = await fetch(
                `http://localhost:8080/interview/`, 
                {
                    method: 'GET'
                });
            const interviewBody = await interviewResponse.json();

            if (interviewResponse.status !== 200) {
                return Promise.reject(interviewBody);
            }

            return interviewBody;
        } catch (err) {
            return Promise.reject({
                timestamp: new Date().toISOString(),
                statusCode: 400,
                message: err.message
            });
        }
    }

    static async createInterview({name, startTime, specialistId, skills} = {name, startTime, endTime, skills}) {
        try {
            const interviewResponse = await fetch(
                `http://localhost:8080/interview/`, 
                {
                    method: 'POST',
                    body: JSON.stringify({name, startTime, endTime, skills}),
                    headers: { 'Content-Type': 'application/json' }
                });
            const interviewBody = await interviewResponse.json();

            if (interviewResponse.status !== 200) {
                return Promise.reject(interviewBody);
            }

            return interviewBody;
        } catch (err) {
            return Promise.reject({
                timestamp: new Date().toISOString(),
                statusCode: 400,
                message: err.message
            });
        }
    }

    static async updateInterview({interviewId, name, startTime, endTime, skills} = {interviewId: null, name, startTime, endTime, skills}) {
        try {
            const interviewResponse = await fetch(
                `http://localhost:8080/interview/${interviewId}`, 
                {
                    method: 'PATCH',
                    body: JSON.stringify({name, startTime, endTime, skills}),
                    headers: { 'Content-Type': 'application/json' }
                });
            const interviewBody = await interviewResponse.json();

            if (interviewResponse.status !== 200) {
                return Promise.reject(interviewBody);
            }

            return interviewBody;
        } catch (err) {
            return Promise.reject({
                timestamp: new Date().toISOString(),
                statusCode: 400,
                message: err.message
            });
        }
    }

    static async deleteInterview({interviewId} = {interviewId: null}) {
        try {
            const interviewResponse = await fetch(
                `http://localhost:8080/interview/${interviewId}`, 
                {
                    method: 'DELETE',
                });
            const interviewBody = await interviewResponse.json();

            if (interviewResponse.status !== 200) {
                return Promise.reject(interviewBody);
            }

            return interviewBody;
        } catch (err) {
            return Promise.reject({
                timestamp: new Date().toISOString(),
                statusCode: 400,
                message: err.message
            });
        }
    }
}