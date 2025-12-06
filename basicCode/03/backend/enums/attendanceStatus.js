const AttendanceStatus = {
  PRESENT: "Present",
  ABSENT: "Absent",
};

Object.freeze(AttendanceStatus); // Making the enum immutable

module.exports = AttendanceStatus;
