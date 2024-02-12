import express from "express";
import { databaseConfig } from "./config.js";
import { Database } from "./postgres.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appHost = "localhost";
const appPort = 8080;

var app = express();
var database = new Database(databaseConfig);

var interviewTime = 90;

function sendGoodResponse(res, data) {
  res.status(200).json(data);
}

function sendBadResponse(res, status, errorMessage, errorDetails = null) {
  res.status(status).json({
    status: "error",
    message: errorMessage,
    error: errorDetails,
  });
}

//logging middleware
app.use("*", (req, res, next) => {
  console.log(req.method, req.baseUrl || req.url, new Date().toISOString());

  next();
});

// Middleware for static app files
app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.get("/", async function (req, res) {
  res.send("Hello World!");
});

// specialists
app.get("/specialist", async function (req, res) {
  var specialistList = await database.getSpecialistList();

  if (specialistList != null) {
    sendGoodResponse(res, specialistList);
  } else {
    sendBadResponse(res, 500, "Something went wrong");
  }
});

app.get("/specialist/:specialistId", async function (req, res) {
  const { specialistId } = req.params;
  var specialist = await database.getSpecialist(specialistId);

  if (specialist != null) {
    sendGoodResponse(res, specialist);
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

app.use("/specialist", express.json());
app.post("/specialist", async function (req, res) {
  const { name, startTime, endTime, skills } = req.body;
  var specialistCreate = await database.createSpecialist(
    name,
    startTime,
    endTime,
    skills
  );

  if (specialistCreate != null) {
    sendGoodResponse(res, "Specialist created");
  } else {
    sendBadResponse(res, 500, "Something went wrong");
  }
});

app.use("/specialist/:specialistId", express.json());
app.patch("/specialist/:specialistId", async function (req, res) {
  const { specialistId } = req.params;
  const { name, startTime, endTime, skills } = req.body;
  var specialistUpdate = await database.updateSpecialist(
    specialistId,
    name,
    startTime,
    endTime,
    skills
  );

  if (specialistUpdate != null) {
    sendGoodResponse(res, "Specialist updated");
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

app.delete("/specialist/:specialistId", async function (req, res) {
  const { specialistId } = req.params;
  var specialistDelete = await database.deleteSpecialist(specialistId);

  if (specialistDelete == null) {
    sendGoodResponse(res, "Specialist deleted");
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

// skills
app.get("/skill", async function (req, res) {
  var skillList = await database.getSkillList();

  if (skillList != null) {
    sendGoodResponse(res, skillList);
  } else {
    sendBadResponse(res, 500, "Something went wrong");
  }
});

app.get("/skill/:skillId", async function (req, res) {
  const { skillId } = req.params;
  var skill = await database.getSkill(skillId);

  if (skill != null) {
    sendGoodResponse(res, skill);
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

app.use("/skill", express.json());
app.post("/skill", async function (req, res) {
  const { name } = req.body;
  var skillCreate = await database.createSkill(name);
  if (skillCreate != null) {
    sendGoodResponse(res, skillCreate);
  } else {
    sendBadResponse(res, 500, "Something went wrong");
  }
});

app.use("/skill/:skillId", express.json());
app.patch("/skill/:skillId", async function (req, res) {
  const { skillId } = req.params;
  const { name } = req.body;
  var skillUpdate = await database.updateSkill(skillId, name);

  if (skillUpdate == null) {
    sendGoodResponse(res, "Skill updated");
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

app.delete("/skill/:skillId", async function (req, res) {
  const { skillId } = req.params;
  var skillDelete = await database.deleteSkill(skillId);

  if (skillDelete == null) {
    sendGoodResponse(res, "Skill deleted");
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

// interviews
app.get("/interview", async function (req, res) {
  var interviewList = await database.getInterviewList();

  if (interviewList != null) {
    sendGoodResponse(res, interviewList);
  } else {
    sendBadResponse(res, 500, "Something went wrong");
  }
});

app.get("/interview/:interviewId", async function (req, res) {
  const { interviewId } = req.params;
  var interview = await database.getInterview(interviewId);

  if (interview != null) {
    sendGoodResponse(res, interview);
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

app.use("/interview", express.json());
app.post("/interview", async function (req, res) {
  const { name, startTime, specialistId, skills } = req.body;
  var interviewCreate = await database.createInterview(
    name,
    startTime,
    specialistId,
    skills
  );
  if (interviewCreate != null) {
    sendGoodResponse(res, interviewCreate);
  } else {
    sendBadResponse(res, 500, "Something went wrong");
  }
});

app.use("/interview/:interviewId", express.json());
app.patch("/interview/:interviewId", async function (req, res) {
  const { interviewId } = req.params;
  const { name, startTime, specialistId, skills } = req.body;
  var interviewUpdate = await database.updateSpecialist(
    interviewId,
    name,
    startTime,
    specialistId,
    skills
  );

  if (interviewUpdate == null) {
    sendGoodResponse(res, "Interview updated");
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

app.delete("/interview/:interviewId", async function (req, res) {
  const { interviewId } = req.params;
  var interviewDelete = await database.deleteInterview(interviewId);

  if (interviewDelete == null) {
    sendGoodResponse(res, "Interview deleted");
  } else {
    sendBadResponse(res, 422, "No data in database with such ID");
  }
});

console.log(`App started at host http://${appHost}:${appPort}`);
const server = app.listen(Number(appPort), appHost, async () => {
  // try {
  //     await database.connect();
  // } catch(error) {
  //     console.log('Disconnect');
  //     process.exit(100);
  // }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    await database.disconnect();
    console.log("HTTP server closed");
  });
});
