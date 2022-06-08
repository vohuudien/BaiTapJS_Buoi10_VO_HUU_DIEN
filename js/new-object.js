function Staff(
  id,
  name,
  email,
  password,
  dateOfWorking,
  basicSalary,
  position,
  hoursOfWorking
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dateOfWorking = dateOfWorking;
  this.basicSalary = basicSalary;
  this.position = position;
  this.hoursOfWorking = hoursOfWorking;
}

Staff.prototype.calTotalIncome = function () {
  if (this.position === "Sếp") {
    return this.basicSalary * 3;
  } else if (this.position === "Trưởng phòng") {
    return this.basicSalary * 2;
  } else {
    return this.basicSalary;
  }
};

Staff.prototype.getRank = function () {
  if (this.hoursOfWorking >= 192) {
    return "Nhân viên xuất sắc";
  } else if (this.hoursOfWorking >= 176) {
    return "Nhân viên giỏi";
  } else if (this.hoursOfWorking >= 160) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
};
