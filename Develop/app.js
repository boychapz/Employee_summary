const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output", "team.html");
const outputPath = path.join(OUTPUT_DIR);
const render = require("./lib/htmlRenderer");

const employeeTeam = [];

makeTeam();

function makeTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeType",
        message: "What is the role of this employee?",
        choices: ["Intern", "Engineer", "Manager", "List complete"]
      }
    ])
    .then(function(answers) {
      switch (answers.employeeType) {
        case "Intern":
          console.log("intern");
          makeIntern();
          break;
        case "Engineer":
          console.log("engineer");
          makeEngineer();
          break;
        case "Manager":
          console.log("Manager");
          makeManager();
          break;
        case "List complete":
          console.log("employeeTeam");
          assembleGroup();
          break;
        default:
          console.log("Assembling the group.");
          assembleGroup();
      }
    });
}
function makeManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "Enter the manager's name"
      },
      {
        type: "input",
        name: "managerID",
        message: "Enter the manager's ID"
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Enter the manager's email address"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the office Number"
      }
    ])
    .then(function(answers) {
      console.log(answers);
      const manager = new Manager(
        answers.managerName,
        answers.managerID,
        answers.managerEmail,
        answers.officeNumber
      );
      console.log(manager);
      employeeTeam.push(manager);
      addTeam();
    });
}
function makeEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Enter the engineer's name"
      },
      {
        type: "input",
        name: "engineerID",
        message: "Enter the engineer's ID"
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Enter the engineer's email address"
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Enter the engineer's GitHub"
      }
    ])
    .then(function(answers) {
      console.log(answers);
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerID,
        answers.engineerEmail,
        answers.engineerGithub
      );
      console.log(engineer);
      employeeTeam.push(engineer);
      console.log(employeeTeam);
      addTeam();
    });
}

function addTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addMember",
        message: "Do you want to add another Member?",
        choices: ["Yes", "No"]
      }
    ])
    .then(function(answers) {
      switch (answers.addMember) {
        case "Yes":
          makeTeam();
          break;
        case "No":
          assembleGroup();
          break;
        default:
          console.log("Select one");
          assembleGroup();
      }
    });
}

function makeIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Enter the intern's name"
      },
      {
        type: "input",
        name: "internID",
        message: "Enter the intern's ID"
      },
      {
        type: "input",
        name: "internEmail",
        message: "Enter the intern's email address"
      },
      {
        type: "input",
        name: "internSchool",
        message: "Enter the intern's school"
      }
    ])
    .then(answers => {
      console.log(answers);
      const intern = new Intern(
        answers.internName,
        answers.internID,
        answers.internEmail,
        answers.internSchool
      );
      console.log(intern);
      employeeTeam.push(intern);
      addTeam();
    });
}
function assembleGroup() {
  fs.writeFileSync(outputPath, render(employeeTeam), "utf-8");
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
