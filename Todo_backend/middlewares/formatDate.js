const { parse, format } = require("date-fns");

exports.formatDueDate = (dueDate) => {
  if (!dueDate) return null;
  const parsedDate = parse(dueDate, "yyyy-MM-dd", new Date());
  return format(parsedDate, "yyyy-MM-dd");
};
