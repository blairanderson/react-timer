var Time = require('./time');

var Timer = function Timer (opts) {
    this.updateText = opts.updateText;
    this.hours = opts.hours || 0
    this.minutes = opts.minutes || 0
    this.seconds = opts.seconds || 0
    this.endTime = (this.seconds*1000) + (this.minutes * 60000) + (this.hours*3600000);
    console.log(this.endTime);
    this.expiredMessage = "Time Expired!";
    this.title = "";
    this.label = "";
    this.progress = 0;
    this.startTime = 0;
    this.totalTime = 0;
    this.beep = null;
    this.currDate = null;
    this.endDate = null;
    this.ticker = null;
    this.volume = 1;
    this.sequence = [];
};

Timer.prototype.start = function() {
    var first;
    if (this.sequence.length === 0) {
        this.initializeTimer(this.startTime, this.endTime, this.label)
    } else {

      first = this.sequence.shift();
      this.initializeTimer(0, first.duration * 1e3, first.label)
    }
};

Timer.prototype.stop = function() {
  clearInterval(this.ticker)
  this.ticker = null;
};

Timer.prototype.initializeTimer = function(startTime, endTime, label) {
    this.endTime = endTime;
    this.startTime = startTime;
    this.label = label;
    this.totalTime = this.endTime - this.startTime;
    this.endDate = new Date((new Date).getTime() + this.totalTime);
    this.currDate = new Date;
    this.expiredMessage = this.expiredMessage || "Time Expired" + (label ? ": " : "") + label;
    this.update();
    if (!this.ticker) {
      this.ticker = setInterval(this.update.bind(this), 1e3 / 4)
    }
};

Timer.prototype.update = function() {
    this.updateParts(
      Time.calcTime(this.currDate.getTime(), this.endDate.getTime())
    )
};

Timer.prototype.updateParts = function(time) {
    if (time.totalSeconds < 0) {
        this.onTimeComplete();
        return
    }
    var clockTime = [];
    var yearText, monthText, dayText, hourText, minText, secText;
    yearText = monthText = dayText = hourText = minText = secText = "";
    if (time.remainingYears > 0) {
        clockTime.push(padTimeText(time.remainingYears) + "y");
        yearText = getTimeText(time.remainingYears, "year")
    }
    if (time.remainingMonths > 0) {
        clockTime.push(padTimeText(time.remainingMonths) + "m");
        monthText = getTimeText(time.remainingMonths, "month")
    }
    if (time.remainingDays > 0) {
        clockTime.push(padTimeText(time.remainingDays) + "d");
        dayText = getTimeText(time.remainingDays, "day")
    }
    if (time.remainingHours > 0) {
        clockTime.push(padTimeText(time.remainingHours) + "h");
        hourText = getTimeText(time.remainingHours, "hour")
    }
    if (time.remainingMinutes > 0) {
        clockTime.push(padTimeText(time.remainingMinutes));
        minText = getTimeText(time.remainingMinutes, "minute")
    } else {
        clockTime.push(padTimeText(0))
    }
    if (time.remainingSeconds > 0) {
        clockTime.push(padTimeText(time.remainingSeconds));
        secText = getTimeText(time.remainingSeconds, "second")
    } else {
        clockTime.push(padTimeText(0))
    }
    var slabel = this.label && this.label != "" ? this.label + "<br />" : "";
    var timeText = slabel + yearText + monthText + dayText + hourText + minText + secText;
    this.updateText(timeText);
    this.progress = (this.totalTime - time.totalMilliseconds) / this.totalTime;
    this.currDate = new Date
};

Timer.prototype.onTimeComplete = function() {
  this.progress = 1;
  if (this.beep && this.beep.play) {
    this.beep.volume = this.volume;
    this.beep.play()
  }
  if (this.sequence.length === 0) {
    clearInterval(this.ticker);
    this.updateText(this.expiredMessage);
    this.showAlert()
  } else {
    var next = this.sequence.shift();
    this.initializeTimer(0, next.duration * 1e3, next.label)
  }
};

function getSModifier(value) {
    var mod;
    if (value == 0) {
        mod = ""
    } else if (value == 1) {
        mod = " "
    } else {
        mod = "s "
    }
    return mod
}

function padTimeText(value) {
    return value < 10 ? "0" + value : "" + value
}

function getTimeText(time, label) {
    var timeText = "";
    if (time > 0) {
        timeText = time + " " + label + getSModifier(time)
    }
    return timeText
}

module.exports = Timer;
