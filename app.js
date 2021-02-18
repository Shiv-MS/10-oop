const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employee = [];
const employeeID = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function teamBuilder() {

    function createBoss() {
      console.log("Please answer the following questions to build your team!");
      inquirer.prompt([
        {
          type: "input",
          name: "bossName",
          message: "Who's the boss?",
        },
        {
          type: "input",
          name: "bossId",
          message: "What's the bosses id?",
        },
        {
          type: "input",
          name: "bossEmail",
          message: "What's the bosses email?",
        },
        {
          type: "input",
          name: "bossOfficeNumber",
          message: "What's the bosses number?",
        }
      ]).then(answers => {
        const manager = new Manager(answers.bossName, answers.bossId, answers.bossEmail, answers.bossOfficeNumber);
        employee.push(manager);
        employeeID.push(answers.bossId);
        theDreamTeam();
      });
    }
  
    function theDreamTeam() {
  
      inquirer.prompt([
        {
          type: "list",
          name: "teammateType",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "No more team members"
          ]
        }
      ]).then(userChoice => {
        switch(userChoice.teammateType) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
        }
      });
    }
  
    function addEngineer() {
      inquirer.prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the engineer's name?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is the engineer's id?",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is the engineer's email?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is the engineer's GitHub username?",
        }
      ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        employee.push(engineer);
        employeeID.push(answers.engineerId);
        theDreamTeam();
      });
    }
  
    function addIntern() {
      inquirer.prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
        }
      ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        employee.push(intern);
        employeeID.push(answers.internId);
        theDreamTeam();
      });
    }
  
    function buildTeam() {
      // Create the output directory if the output path doesn't exist
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(employee), "utf-8");
    }
  
    createBoss();
  
  }
  
  
  teamBuilder();
