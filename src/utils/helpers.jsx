import moment from "moment";

export const ThirtyDayFromStartDate = (start_date) => {
  return start_date
    ? new Date(start_date?.getTime() + 30 * 24 * 60 * 60 * 1000)
    : null;
};

export const CurrencyConversion = (conversionValue, amount) => {
  if (conversionValue && amount) {
    let value = Number(conversionValue?.conversion_rate) * Number(amount);
    // let round = value?.toFixed(2);
    let round = Math.trunc(value);
    // Number(round).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });;
    return Number(round).toLocaleString("en-US");
  } else return 0;
};

export const getDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  while (start <= end) {
    const day = String(start.getDate()).padStart(2, "0");
    const month = String(start.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = start.getFullYear();
    dateArray.push(`${day}/${month}/${year}`);

    // Increment the date by 1 day
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
};

export const calculateDateDuration = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);

  // Calculate duration in days (inclusive)
  const duration = end.diff(start, "days") + 1;

  return duration;
};

export function formatTwoDigits(number) {
  return number.toString().padStart(2, "0");
}

export const dueDateFinder = (milestones) => {
  // Helper function to generate ordinal position as a string
  const generateOrdinalStrings = (length) => {
    const baseStrings = [
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
      "tenth",
    ];
    const ordinalStrings = [];
    for (let i = 0; i < length; i++) {
      ordinalStrings.push(baseStrings[i] || `${i + 1}th`); // Fallback for larger numbers
    }
    return ordinalStrings;
  };

  // Generate ordinal strings based on milestones length
  const ordinalStrings = generateOrdinalStrings(milestones.length);

  // Find the next upcoming milestone
  const currentDate = new Date();
  const nextMilestone = milestones
    .map((milestone, index) => ({
      ...milestone,
      index, // Keep original index for reference
      position: ordinalStrings[index], // Assign position based on original index
    }))
    .filter(
      (milestone) =>
        milestone.payment_status !== "captured" &&
        new Date(milestone.date) > currentDate
    ) // Filter for valid milestones
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
    .at(0); // Get the first milestone in the sorted array

  return nextMilestone;
};

export const monthList = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
