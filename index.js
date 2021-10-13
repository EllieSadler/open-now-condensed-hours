function hoursOpening() {
    // convert military time to standard time
    getFormattedTime = function (fourDigitTime) {
        var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? "PM" : "AM";
        var minutes = fourDigitTime.substring(2);

        if (minutes == "00") {
            return hours + amPm;
        } else {
            return hours + ":" + minutes + " " + amPm;
        }
    };

    var today = new Date(),
        months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayOf = days[today.getDay()],
        hour = today.getHours(),
        minute = today.getMinutes(),
        currentTime = hour + ":" + minute,
        //currentTime = "09:10", // for testing only
        dayHours,
        timeOpen,
        timeClose;

    // Map List Handling
    $(".listItem .list-hours").each(function () {
        // display day of hours only
        $(this)
            .find(".day-hour-row")
            .each(function () {
                dayHours = $(this).find(".daypart").text().split(":")[0];
                dayTime = $(this).find(".time").html();
                if (dayHours === dayOf) {
                    timeOpen = $(this).find(".time-open").text();
                    timeClose = $(this).find(".time-close").text();

                    // if the location is currently open
                    if (timeOpen <= currentTime && currentTime < timeClose) {
                        $(this).html(
                            "Today " +
                                timeOpen +
                                " - " +
                                timeClose +
                                " <strong> OPEN NOW</strong>"
                        );
                        var txt = $(this).html();
                        var newTxt = txt.replace(/(\d+)/g, function (match) {
                            return getFormattedTime(match);
                        });
                        $(this).html(newTxt);
                        // if the location is currently closed
                    } else {
                        $(this).html(
                            "Today " +
                                timeOpen +
                                " - " +
                                timeClose +
                                " <strong> CLOSED</strong>"
                        );
                        var txt = $(this).html();
                        var newTxt = txt.replace(/(\d+)/g, function (match) {
                            return getFormattedTime(match);
                        });
                        $(this).html(newTxt);
                    }
                    // hide all other hours
                } else {
                    $(this).remove();
                }
            });
    });
}

$(document).ready(function () {
    hoursOpening();
});