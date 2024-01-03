const { parse, format } = require("date-fns");

function areRangesOverlapping(startDate1, endDate1, startDate2, endDate2) {
  return (
    (startDate1 <= endDate2 && startDate2 <= endDate1) ||
    (startDate2 <= endDate1 && startDate1 <= endDate2)
  );
}

function mergeRanges(startDate1, endDate1, startDate2, endDate2) {
  const mergedStartDate = startDate1 < startDate2 ? startDate1 : startDate2;
  const mergedEndDate = endDate1 > endDate2 ? endDate1 : endDate2;
  return [
    format(mergedStartDate, "dd/MM/yyyy"),
    format(mergedEndDate, "dd/MM/yyyy"),
  ];
}

exports.updateTimeFrames = async function (timeFrames) {
  for (let i = 0; i < timeFrames.length - 1; i++) {
    const [startDate1, endDate1] = timeFrames[i].map((date) =>
      parse(date, "dd/MM/yyyy", new Date())
    );

    for (let j = i + 1; j < timeFrames.length; j++) {
      const [startDate2, endDate2] = timeFrames[j].map((date) =>
        parse(date, "dd/MM/yyyy", new Date())
      );

      if (areRangesOverlapping(startDate1, endDate1, startDate2, endDate2)) {
        const mergedRange = mergeRanges(
          startDate1,
          endDate1,
          startDate2,
          endDate2
        );
        timeFrames.splice(i, 1, mergedRange); // Replace the first overlapping range with the merged range
        timeFrames.splice(j, 1); // Remove the second overlapping range
        i--; // Adjust the loop index
        break; // Exit the inner loop after the replacement
      }
    }
  }

  return timeFrames;
};
