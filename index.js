const { writeFile, copyFile } = require('./utils/generate');
const inquirer = require("inquirer");

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'position',
            message: 'What is your postion?',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your employee ID?'
        }
])};

//adding teammembers section
const promptAddMember = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
        
        ])
        .then(memberData => {
            members.push(memberData);
            if (memberData.confirmAddMember) {
            return promptMember();
            } else {
            return memberData;
        }
    });
}


promptUser()
  //.then(promptProject)
  //.then(portfolioData => {
    //return generatePage(portfolioData);
  //})
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });