var Timer = function Timer () {
    this.defaultText = "";
    this.expiredMessage = "Time Expired!";
    this.title = "";
    this.label = "";
    this.progress = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.totalTime = 0;
    this.parseError = "";
    this.progressBar = null;
    this.beep = null;
    this.currDate = null;
    this.endDate = null;
    this.ticker = null;
    this.startButton = null;
    this.volume = 1;
    this.sequence = [];
};

Timer.prototype.start = function() {
    if (this.parseError !== "" && this.parseError !== "none") {
        this.progressText.html(this.defaultText);
        this.updateText(this.defaultText);
        return
    }
    if (this.sequence.length === 0) {
        this.initializeTimer(this.startTime, this.endTime, this.label)
    } else {
        var first = this.sequence.shift();
        this.initializeTimer(0, first.duration * 1e3, first.label)
    }
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
        this.ticker = setInterval(this.update, 1e3 / 4)
    }
};

Timer.prototype.update = function() {
    Time.calcTime(this.currDate.getTime(), this.endDate.getTime());
    this.updateParts(Time)
};

Timer.prototype.updateParts = function(Time) {
    if (Time.totalSeconds < 0) {
        this.onTimeComplete();
        return
    }
    var clockTime = [];
    var yearText, monthText, dayText, hourText, minText, secText;
    yearText = monthText = dayText = hourText = minText = secText = "";
    if (Time.remainingYears > 0) {
        clockTime.push(padTimeText(Time.remainingYears) + "y");
        yearText = getTimeText(Time.remainingYears, "year")
    }
    if (Time.remainingMonths > 0) {
        clockTime.push(padTimeText(Time.remainingMonths) + "m");
        monthText = getTimeText(Time.remainingMonths, "month")
    }
    if (Time.remainingDays > 0) {
        clockTime.push(padTimeText(Time.remainingDays) + "d");
        dayText = getTimeText(Time.remainingDays, "day")
    }
    if (Time.remainingHours > 0) {
        clockTime.push(padTimeText(Time.remainingHours) + "h");
        hourText = getTimeText(Time.remainingHours, "hour")
    }
    if (Time.remainingMinutes > 0) {
        clockTime.push(padTimeText(Time.remainingMinutes));
        minText = getTimeText(Time.remainingMinutes, "minute")
    } else {
        clockTime.push(padTimeText(0))
    }
    if (Time.remainingSeconds > 0) {
        clockTime.push(padTimeText(Time.remainingSeconds));
        secText = getTimeText(Time.remainingSeconds, "second")
    } else {
        clockTime.push(padTimeText(0))
    }
    var slabel = this.label && this.label != "" ? this.label + "<br />" : "";
    var timeText = slabel + yearText + monthText + dayText + hourText + minText + secText;
    this.updateText(timeText);
    this.progress = (this.totalTime - Time.totalMilliseconds) / this.totalTime;
    this.currDate = new Date
};

Timer.prototype.updateText = function(text) {
    if (text) {
      this.progressText.html(text)
    }
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
