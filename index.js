const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
    "Enter a title for your project: ", //0
    "Enter a description for your project: ", //1
    "Enter installation instructions for your project: ", //2
    "Enter usage information for your project: ", //3
    "Enter contribution guidelines for your project: ", //4
    "Enter test instructions for your project: ", //5
    "Enter your Github Username: ", //6
    "Choose a license for your project: ", //7
    "Enter your email address: " //8
];

function writeToFile(fileName, data) {
    let licenseString;
    switch (data.license) {
        case "GNU AGPLv3": licenseString = "Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.";
            break;
        case "GNU GPLv3": licenseString = "Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.";
            break;
        case "GNU LGPLv3": licenseString = "Permissions of this copyleft license are conditioned on making available complete source code of licensed works and modifications under the same license or the GNU GPLv3. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work through interfaces provided by the licensed work may be distributed under different terms and without source code for the larger work.";
            break; 
        case "Mozilla Public License 2.0": licenseString = "Permissions of this weak copyleft license are conditioned on making available source code of licensed files and modifications of those files under the same license (or in certain cases, one of the GNU licenses). Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work may be distributed under different terms and without source code for files added in the larger work.";
            break;
        case "Apache License 2.0": licenseString = "A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
            break;
        case "MIT License": licenseString = "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
            break; 
        case "Boost Software License 1.0": licenseString = "A simple permissive license only requiring preservation of copyright and license notices for source (and not binary) distribution. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
            break;
        case "Unlicensed": licenseString = "A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.";
            break;
        default: licenseString = "A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.";
            break;
    }
    fs.writeFile("./" + fileName, `# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#Installation_Instructions)
- [Usage](#Usage_Information)
- [Contribution](#Contribution_Guidelines)
- [Test](#Test_Instructions)
- [License](#License)
- [Questions](#Questions)

## Installation_Instructions
${data.installation}

## Usage_Information
${data.usage}

## Contribution_Guidelines
${data.contribution}

## Test_Instructions
${data.test}

## License
${data.license}
${licenseString}

## Questions
Github Account: ${data.githubName} (link: https://github.com/${data.githubName})
Email: ${data.email}`, (err) => err ? console.error(err) : console.log("Readme successfully generated!"));
}

function init() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: questions[0]
        },
        {
            name: "description",
            type: "input",
            message: questions[1]
        },
        {
            name: "installation",
            type: "input",
            message: questions[2]
        },
        {
            name: "usage",
            type: "input",
            message: questions[3]
        },
        {
            name: "contribution",
            type: "input",
            message: questions[4]
        },
        {
            name: "test",
            type: "input",
            message: questions[5]
        },
        {
            name: "githubName",
            type: "input",
            message: questions[6]
        },
        {
            name: "license",
            type: "list",
            message: questions[7],
            choices: ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "Unlicensed"]
        },
        {
            name: "email",
            type: "input",
            message: questions[8]
        },
    ]).then((answer) => {
        let currentInfo = answer;
        writeToFile("README.md", currentInfo);
    });
}

// Function call to initialize app
init();
