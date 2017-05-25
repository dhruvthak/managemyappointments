$(document).ready(function() {

    setCurrentDateRange($("#date_value")); // Set the min for input[type="date"] to today"s date.

    // Bind functions to DOM elements
    $("#switchable_button").click(handleButtonChanges.checkStatus);
    $("#cancel_form").click(handleButtonChanges.hideForm);
    $("#search").click(getAppointments);
});
var getAppointments = function() {
    // Handles Ajax calls based on Search parameter provided.
    var elem = $("#searchBox");
    var searchstr = elem.val();
    $.ajax({
        type: "POST",
        url: "controls.php",
        data: {
            "mode": "select",
            "query": searchstr
        },
        success: function(response) {
            populateData(response);
        },
        error: function() {
            ErrorHandleBar("Sorry! Unable to retrieve data.");
        }
    });


};

var handleButtonChanges = (function() {

    var currentstate = false; // flag for handling current state.
    var formData = $(".new_entry_form");

    var showForm = function() {

        // Function to unhide the form.
        formData.each(function(i, obj) {

            $(this).show("200");

        });
    };

    return {
        checkStatus: function(e) {

            // Handles UI changes along with triggering form validation and submission.
            if (currentstate === false) {
                // form is not visible yet. Unhide form.
                $(e.target).text("ADD");
                showForm();
                currentstate = true;
            } else if (currentstate === true) {

                // form is visible yet. Hide form.
                if (formValidation.runIt()) {
                    $("#addition_form").submit();
                }
            }
        },
        hideForm: function() {

            // Function to hide the form when Cancel button is pressed.
            $("#switchable_button").text("NEW");
            formData.each(function(i, obj) {

                $(this).hide("200");
            });
            currentstate = false;
        }
    }
})();

var formValidation = (function() {

    var validateDate = function(elem) {

        // Regex date validation along with Date.parse validation.
        var temp_date = elem.val();
        var regex = new RegExp("(?:19|20)[0-9]{2}[- /.](?:(?:0[1-9]|1[0-2])[- /.](?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])[- /.](?:30))|(?:(?:0[13578]|1[02])-31))");
        if (Date.parse(temp_date) && regex.test(temp_date)) {
            return true;
        } else {
            ErrorHandleBar("Please Enter Date in YYYY-MM-DD Format and try again.");
            return false;
        }
    };
    var validatePastDate = function(elem) {

        // Check if the date is not in the Past.
        var temp_date = elem.val();
        temp_date = Date.parse(temp_date);
        var currentdate = Date.parse(getCurrentDate());
        if (currentdate <= temp_date) {
            return true;
        } else {
            ErrorHandleBar("Date must be " + elem.attr('min') + " or later.");
            return false;
        }
    };
    var validateTime = function(elem) {

        // Regex to validate Time input
        var temp_time = elem.val();
        var regex = new RegExp("(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){1}");
        if (regex.test(temp_time)) {
            return true;
        } else {
            ErrorHandleBar("Please Enter Time in HH:MM (24-hour) Format and try again.");
            return false;
        }
    };

    return {

        runIt: function() {

            // Validation for all Form fields ie., Date, Time and Description.
            var isValid = true;
            $(".input_to_validate").each(function(i) {
                if (!($(this).val())) {

                    // Check if the value is empty.
                    $(this).parents("div.form-group").addClass("has-error");
                    isValid = false;
                    ErrorHandleBar("Please fill all fields and try again.");
                } else {
                    switch (i) {
                        case 0:

                            // Check if the value of Date field is valid format and is not a Past Date.
                            if (!validateDate($(this)) || !validatePastDate($(this))) {
                                isValid = false;
                                $(this).parents("div.form-group").addClass("has-error");
                            } else {
                                $(this).parents("div.form-group").removeClass("has-error").addClass("has-success");
                            }
                            break;
                        case 1:

                            // Check if the value of Time field is of valid format.
                            if (!validateTime($(this))) {
                                isValid = false;
                                $(this).parents("div.form-group").addClass("has-error");
                            } else {
                                $(this).parents("div.form-group").removeClass("has-error").addClass("has-success");
                            }
                            break;
                        case 2:

                            //Remove Error sign since the description has been filled.
                            $(this).parents("div.form-group").removeClass("has-error").addClass("has-success");
                            break;
                    }
                }
            });
            return isValid;
        }
    }
})();

var setCurrentDateRange = function(elem) {

    // Set the min value to be today"s date on input[type="date"].
    var datefield = elem;
    var dateval = getCurrentDate();
    datefield.attr("min", dateval);
};

var getCurrentDate = function() {

    // Returns current date in YYYY-MM-DD format.
    var today = new Date();
    var d = today.getDate() /*.toString();*/
    var m = (today.getMonth() + 1) /*.toString();*/ //Starts from 0!
    var y = today.getFullYear();

    //If day or month is single digit, prepend 0.
    if (d.length < 2) {
        d = "0" + d;
    }
    if (m.length < 2) {
        m = "0" + m;
    }
    var dateval = y + "-" + m + "-" + d;
    return dateval;
};
var formatStringDate = function(date) {

    // Returns date in String Format ie., January 12
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getUTCDate();
    var monthIndex = date.getMonth();
    return monthNames[monthIndex] + " " + day;
};
var formatStringTime = function(time) {

    // Returns Time in 12-Hour format ie., 11:05 PM
    var t = time.split(":");
    var hr = t[0];
    var suffix = hr >= 12 ? "PM" : "AM";
    hr = suffix == "PM" ? (((hr + 11) % 12) + 1) : hr;

    var min = t[1] + " " + suffix;
    return hr + ":" + min;
};
var populateData = function(data) {

    // Populates Ajax data into the Table and hides table if no result.
    var result_table = $("#result_table").find("tbody");
    var result = data;
    if (data && data !== "") {

        result_table.parent().removeClass("hidden");
        result_table.find("tr").remove();

        $(result).each(function(i) {

            var date_time = data[i]["app_date"].split(" ");

            date_time[0] = formatStringDate(new Date(date_time[0]));
            date_time[1] = formatStringTime(date_time[1]);

            result_table.append($("<tr>")
                .append($("<td>").text(date_time[0]))
                .append($("<td>").text(date_time[1]))
                .append($("<td>").text(data[i]["app_description"])));
        });

    } else {
        ErrorHandleBar("Sorry! No Result found.");
        result_table.parent().addClass("hidden");
    }
};
var ErrorHandleBar = function(message = "Something went wrong!") {

    // Helper function to show Errors.
    $("#info_area").removeClass("hidden").text(message);
};
