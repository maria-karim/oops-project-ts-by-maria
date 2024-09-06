#! /usr/bin/env node
import inquirer from 'inquirer';
class Employee {
    name;
    role;
    attendance;
    constructor(name, role) {
        this.name = name;
        this.role = role;
        this.attendance = 0; // Attendance starts at 0 days
    }
    markAttendance() {
        this.attendance++;
        console.log(`${this.name} has marked attendance. Total days: ${this.attendance}`);
    }
    getDetails() {
        console.log(`Employee Name: ${this.name}`);
        console.log(`Role: ${this.role}`);
        console.log(`Attendance: ${this.attendance} days\n`);
    }
}
async function createEmployee() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the employee\'s name:',
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter the employee\'s role:',
        },
    ]);
    return new Employee(answers.name, answers.role);
}
async function manageEmployee(employee) {
    let continueManaging = true;
    while (continueManaging) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Mark Attendance', 'Show Details', 'Exit'],
            },
        ]);
        switch (answer.action) {
            case 'Mark Attendance':
                employee.markAttendance();
                break;
            case 'Show Details':
                employee.getDetails();
                break;
            case 'Exit':
                continueManaging = false;
                break;
        }
    }
}
async function runEmployeeManagementSystem() {
    const employee = await createEmployee();
    await manageEmployee(employee);
}
runEmployeeManagementSystem();
