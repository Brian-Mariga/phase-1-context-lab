/* Your Code Here */
function createEmployeeRecord(recordDetail) {
  return {
    firstName: recordDetail[0],
    familyName: recordDetail[1],
    title: recordDetail[2],
    payPerHour: recordDetail[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRowData) {
  return employeeRowData.map(function (recordDetail) {
    return createEmployeeRecord(recordDetail);
  });
}

function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
}

function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function hoursWorkedOnDate(exactDate) {
  let inEvent = this.timeInEvents.find(function (e) {
    return e.date === exactDate;
  });

  let outEvent = this.timeOutEvents.find(function (e) {
    return e.date === exactDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(dateChosen) {
  let grossWage = hoursWorkedOnDate.call(this, dateChosen) * this.payPerHour;
  return parseFloat(grossWage.toString());
}

function findEmployeeByFirstName(orgArray, firstName) {
  return orgArray.find(function (deets) {
    return deets.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, deets) {
    return memo + allWagesFor.call(deets);
  }, 0);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
