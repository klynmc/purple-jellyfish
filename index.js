const { writeFile, copyFile } = require('./utils/generate');
const inquirer = require("inquirer");
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

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
const promptMember = memberData => {

  if (!memberData.members) {
    memberData.members = [];
  }

  console.log( `
  ============
  Add a Member
  ============
  `);

  return inquirer.prompt([
      {
          type: 'confirm',
          name: 'confirmAddMember',
          message: 'Would you like to enter another member?',
          default: false
      }
      
      ])
      .then(membersData => {
          memberData.members.push(membersData);
          if (membersData.confirmAddMember) {
          return promptMember(memberData);
          } else {
          return memberData;
      }
  });
}

promptUser()
  .then(promptMember)
  //.then(promptProject)
  //.then(portfolioData => {
    //return generatePage(portfolioData);
  //})
  /* .then(pageHTML => {
    return writeFile(pageHTML);
  }) */
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