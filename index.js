let { addNumbers } = require("./MergeOverlap.js");
const dayjs = require("dayjs");

function calculateWorkExperience(timeframes) {
  // set default
  let totalYears = 0;
  let totalMonths = 0;
  let totalDays = 0;

  for (const timeframe of timeframes) {
    const { years, months, days } = calculateDuration(timeframe);
    totalYears += years;
    totalMonths += months;
    totalDays += days;
  }

  // Simplify the total duration
  totalYears += Math.floor(totalMonths / 12);
  totalMonths %= 12;

  return {
    years: totalYears,
    months: totalMonths,
    days: totalDays,
  };
}

function calculateDuration(timeframe) {
  // create dayjs object first
  const startDate = parseDate(timeframe[0]);
  const endDate = parseDate(timeframe[1]);

  // get total day for each timeframe
  const diffInDays = dayjs(endDate).diff(startDate, "day");

  //   calculate to Y,M,D
  const years = Math.floor(diffInDays / 365);
  const months = Math.floor((diffInDays % 365) / 30);
  const days = Math.floor(diffInDays % 30);

  return { years, months, days };
}

function parseDate(dateStr) {
  // format is DD/MM/YYYY
  const [day, month, year] = dateStr.split("/").map(Number);

  // create a dayjs object
  const dayjsObject = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD");
  return dayjsObject;
}

const timeframes = [
  ["01/01/2555", "31/12/2555"],
  ["01/06/2556", "31/12/2556"],
  ["01/06/2557", "31/12/2560"],
];

const totalExperience = calculateWorkExperience(timeframes);
console.log("Total Work Experience:", totalExperience);

const result = addNumbers(5, 7);
console.log(result); // Output: 12
