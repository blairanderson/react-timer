var time = {
  MILLISECONDS: 1,
  SECONDS: 1e3,
  MINUTES: 6e4,
  HOURS: 36e5,
  DAYS: 864e5,
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  totalYears: 0,
  remainingYears: 0,
  totalMonths: 0,
  remainingMonths: 0,
  totalDays: 0,
  remainingDays: 0,
  totalHours: 0,
  remainingHours: 0,
  totalMinutes: 0,
  remainingMinutes: 0,
  totalSeconds: 0,
  remainingSeconds: 0,
  totalMilliseconds: 0,
  remainingMilliseconds: 0
}

module.exports.calcTime = function calcTime(a, b) {
  var startDate = new Date(a), endDate = new Date(b),
      c = endDate.getTime() - startDate.getTime(),
      totalMilliseconds = c / time.MILLISECONDS,
      totalSeconds = c / time.SECONDS,
      totalMinutes = c / time.MINUTES,
      totalHours = c / time.HOURS,
      totalDays = c / time.DAYS,
      totalMonths = calcTotalMonths(totalDays, startDate),
      totalYears = totalMonths / 12,
      remainingYears = int(totalYears),
      remainingMonths = int(totalMonths - 12 * remainingYears),
      remainingDays = int(totalDays - getDaysFromMonths(startDate, totalMonths)),
      remainingHours = int(totalHours - 24 * int(totalDays)),
      remainingMinutes = int(totalMinutes - 60 * int(totalHours)),
      remainingSeconds = int(totalSeconds - 60 * int(totalMinutes)),
      remainingMilliseconds = int(totalMilliseconds - 1e3 * int(totalSeconds));

  return {
    totalMilliseconds: totalMilliseconds,
    totalSeconds: totalSeconds,
    totalMinutes: totalMinutes,
    totalHours: totalHours,
    totalDays: totalDays,
    totalMonths: totalMonths,
    totalYears: totalYears,
    remainingYears: remainingYears,
    remainingMonths: remainingMonths,
    remainingDays: remainingDays,
    remainingHours: remainingHours,
    remainingMinutes: remainingMinutes,
    remainingSeconds: remainingSeconds,
    remainingMilliseconds: remainingMilliseconds
  }
};

function int(a) {
  return Math.floor(a)
}

function isLeapYear(a) {
  return a > 0 && !(a % 4) && (a % 100 || !(a % 400))
};

function calcTotalMonths(a, b) {
  for (var c = b.getMonth(), d = b.getFullYear(), e = c, f = d, g = 0; a > time.daysInMonth[e];) a -= time.daysInMonth[e], 2 == e && isLeapYear(f) && (a -= 1), e++, 12 == e && (e = 0, f++), g++;
  var h = a / time.daysInMonth[e];
  return g + h
};

function getDaysFromMonths(a, b) {
  b = int(b);
  for (var c = a.getMonth(), d = a.getFullYear(), e = c, f = d, g = 0, h = 0; b > h; h++) g += time.daysInMonth[e], 2 == e && isLeapYear(f) && (g += 1), e++, 12 == e && (e = 0, f++);
  return g
};
