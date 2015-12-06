function int(a) {
    return Math.floor(a)
}

module.exports = {
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
    remainingMilliseconds: 0,
    calcTime: function(a, b) {
        startDate = new Date(a), endDate = new Date(b);
        var c = endDate.getTime() - startDate.getTime();
        this.totalMilliseconds = c / this.MILLISECONDS,
        this.totalSeconds = c / this.SECONDS,
        this.totalMinutes = c / this.MINUTES,
        this.totalHours = c / this.HOURS,
        this.totalDays = c / this.DAYS,
        this.totalMonths = this.calcTotalMonths(this.totalDays, startDate),
        this.totalYears = this.totalMonths / 12,
        this.remainingYears = int(this.totalYears),
        this.remainingMonths = int(this.totalMonths - 12 * this.remainingYears),
        this.remainingDays = int(this.totalDays - this.getDaysFromMonths(startDate, this.totalMonths)),
        this.remainingHours = int(this.totalHours - 24 * int(this.totalDays)),
        this.remainingMinutes = int(this.totalMinutes - 60 * int(this.totalHours)),
        this.remainingSeconds = int(this.totalSeconds - 60 * int(this.totalMinutes)),
        this.remainingMilliseconds = int(this.totalMilliseconds - 1e3 * int(this.totalSeconds));
    },
    isLeapYear: function(a) {
        return a > 0 && !(a % 4) && (a % 100 || !(a % 400))
    },
    calcTotalMonths: function(a, b) {
        for (var c = b.getMonth(), d = b.getFullYear(), e = c, f = d, g = 0; a > this.daysInMonth[e];) a -= this.daysInMonth[e], 2 == e && this.isLeapYear(f) && (a -= 1), e++, 12 == e && (e = 0, f++), g++;
        var h = a / this.daysInMonth[e];
        return g + h
    },
    getDaysFromMonths: function(a, b) {
        b = int(b);
        for (var c = a.getMonth(), d = a.getFullYear(), e = c, f = d, g = 0, h = 0; b > h; h++) g += this.daysInMonth[e], 2 == e && this.isLeapYear(f) && (g += 1), e++, 12 == e && (e = 0, f++);
        return g
    }
};
