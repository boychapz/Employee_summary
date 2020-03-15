// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeLocation) {
    super(name, id, email);
    this.officeNumber = officeLocation;
  }
  getOfficeNumber() {
    return this.officeLocation;
  }
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
