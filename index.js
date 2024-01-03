let { addNumbers } = require("./MergeOverlap.js");
const dayjs = require("dayjs");

function calculateWorkExperience(timeframes) {
  let totalYears = 0;
  let totalMonths = 0;
  let totalDays = 0;

  const mergedTimeframes = mergeOverlappingTimeframes(timeframes);

  for (const timeframe of mergedTimeframes) {
    const { years, months, days } = calculateDuration(timeframe);
    totalYears += years;
    totalMonths += months;
    totalDays += days;
  }

  // Simplify the total duration
  totalYears += Math.floor(totalMonths / 12);
  totalMonths %= 12;

  return { years: totalYears, months: totalMonths, days: totalDays };
}

function mergeOverlappingTimeframes(timeframes) {
  const merged = [];

  // Sort the timeframes based on the start date
  const sortedTimeframes = timeframes.sort((a, b) =>
    dayjs(a[0], "DD/MM/YYYY").diff(dayjs(b[0], "DD/MM/YYYY"))
  );

  let [currentStart, currentEnd] = sortedTimeframes[0];

  for (let i = 1; i < sortedTimeframes.length; i++) {
    const [start, end] = sortedTimeframes[i];
    if (
      dayjs(start, "DD/MM/YYYY").isSame(currentEnd) ||
      dayjs(start, "DD/MM/YYYY").isBefore(currentEnd)
    ) {
      // Merge overlapping timeframes
      currentEnd = dayjs.max(
        dayjs(currentEnd, "DD/MM/YYYY"),
        dayjs(end, "DD/MM/YYYY")
      );
    } else {
      // Add the merged timeframe and update currentStart, currentEnd
      merged.push([currentStart, currentEnd]);
      [currentStart, currentEnd] = [start, end];
    }
  }

  // Add the last merged timeframe
  merged.push([currentStart, currentEnd]);

  return merged;
}

function calculateDuration(timeframe) {
  const startDate = parseDate(timeframe[0]);
  const endDate = parseDate(timeframe[1]);

  const diffInDays = dayjs(endDate).diff(startDate, "day");

  const years = Math.floor(diffInDays / 365);
  const months = Math.floor((diffInDays % 365) / 30);
  const days = Math.floor(diffInDays % 30);

  return { years, months, days };
}

function parseDate(dateStr) {
  // Assuming the date format is DD/MM/YYYY
  const [day, month, year] = dateStr.split("/").map(Number);
  return dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD");
}

// const timeframes = [
//   ["01/01/2558", "31/12/2560"],
//   ["01/01/2555", "31/12/2555"],
//   ["01/12/2559", "31/12/2559"],
//   ["01/06/2556", "31/12/2556"],
//   ["01/06/2557", "31/05/2558"],
// ];

const timeframes = [
  ["01/01/2558", "31/12/2560"],
  ["01/01/2555", "31/12/2555"],
  ["01/12/2559", "31/12/2559"],
  ["01/06/2556", "31/12/2556"],
  ["01/06/2557", "31/05/2558"],
];

const totalExperience = calculateWorkExperience(timeframes);
console.log("Total Work Experience:", totalExperience);

// anotherFile.js

const result = addNumbers(5, 7);
console.log(result); // Output: 12
