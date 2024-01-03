const { parse, format, differenceInCalendarDays } = require("date-fns");

function mergeDateRanges(ranges) {
  const flatRanges = ranges.flatMap((range) => [
    { date: range[0], type: "start" },
    { date: range[1], type: "end" },
  ]);

  flatRanges.sort((a, b) =>
    differenceInCalendarDays(
      parse(a.date, "dd/MM/yyyy", new Date()),
      parse(b.date, "dd/MM/yyyy", new Date())
    )
  );

  let mergedRanges = [];
  let openCount = 0;
  let currentStartDate = null;

  for (const range of flatRanges) {
    if (range.type === "start") {
      if (openCount === 0) {
        currentStartDate = parse(range.date, "dd/MM/yyyy", new Date());
      }
      openCount++;
    } else {
      openCount--;
      if (openCount === 0) {
        const currentEndDate = parse(range.date, "dd/MM/yyyy", new Date());
        if (
          !areRangesOverlapping(currentStartDate, currentEndDate, mergedRanges)
        ) {
          mergedRanges.push([
            format(currentStartDate, "dd/MM/yyyy"),
            format(currentEndDate, "dd/MM/yyyy"),
          ]);
        } else {
          console.log("Ranges overlap, no merge performed.");
        }
        currentStartDate = null;
      }
    }
  }

  return mergedRanges[0] || null;
}

function areRangesOverlapping(startDate, endDate, ranges) {
  return ranges.some((range) => {
    const [rangeStart, rangeEnd] = range.map((date) =>
      parse(date, "dd/MM/yyyy", new Date())
    );
    return (
      (startDate >= rangeStart && startDate <= rangeEnd) ||
      (endDate >= rangeStart && endDate <= rangeEnd) ||
      (startDate <= rangeStart && endDate >= rangeEnd)
    );
  });
}

const ranges1 = ["01/01/2558", "31/12/2560"];
const ranges2 = ["01/06/2557", "31/05/2558"];

const mergedRanges = mergeDateRanges([ranges1, ranges2]);
console.log(mergedRanges);

exports.addNumbers = function (a, b) {
  return a + b;
};
