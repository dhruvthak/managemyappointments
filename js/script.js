$(document).ready(function() {

    setCurrentDateRange(); // Set the min for input[type="date"] to today's date.

    // Bind functions to DOM elements
    $('#switchable_button').click(handleButtonChanges);
    $('#cancel_form').click(hideForm);
    $('#search').click(getAppointments);
});


var getAppointments = function(e) {

    // Handles Ajax calls based on Search parameter provided.
    var searchstr = $("#searchBox").val();
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


}

var currentstate = false; // flag for handleButtonChanges.
var handleButtonChanges = function() {

    // Handles UI changes along with triggering form validation and submission.
    if (currentstate == false) {
        // form is not visible yet. Unhide form.
        $(this).text('ADD');
        showForm();
        currentstate = true;
    } else if (currentstate == true) {

        // form is visible yet. Hide form.
        if (formValidation()) {
            $('#addition_form').submit();
        }
    }
}

var showForm = function() {

    // Function to unhide the form.
    $('.new_entry_form').each(function(i, obj) {

        $(this).show('200');

    })
}

var hideForm = function() {

    // Function to hide the form when Cancel button is pressed.
    $('#switchable_button').text('NEW');
    $('.new_entry_form').each(function(i, obj) {

        $(this).hide('200');
    });
    currentstate = false;
}


var formValidation = function() {

    // Validation for all Form fields ie., Date, Time and Description.
    var isValid = true;
    $('.input_to_validate').each(function(i) {
        if (!$(this).val()) {

            // Check if the value is empty.
            $(this).parents('div.form-group').addClass('has-error');
            isValid = false;
            ErrorHandleBar("Please fill all fields and try again.");
        } else {
            switch (i) {
                case 0:

                    // Check if the value of Date field is valid format and is not a Past Date.
                    if (!validateDate() || !validatePastDate()) {
                        isValid = false;
                        $(this).parents('div.form-group').addClass('has-error');
                    } else {
                        $(this).parents('div.form-group').removeClass('has-error').addClass('has-success');
                    }
                    break;
                case 1:

                    // Check if the value of Time field is of valid format.
                    if (!validateTime()) {
                        isValid = false;
                        $(this).parents('div.form-group').addClass('has-error');
                    } else {
                        $(this).parents('div.form-group').removeClass('has-error').addClass('has-success');
                    }
                    break;
                case 2:

                    //Remove Error sign since the description has been filled.
                    $(this).parents('div.form-group').removeClass('has-error').addClass('has-success');
                    break;
            }
        }
    });
    return isValid;
}

var setCurrentDateRange = function() {

    // Set the min value to be today's date on input[type="date"].
    var datefield = $('input[type="date"]');
    var dateval = getCurrentDate();
    datefield.attr('min', dateval);
}

var validateDate = function() {

    // Regex date validation along with Date.parse validation.
    var temp_date = $('input[type="date"]').val();
    var regex = new RegExp("(?:19|20)[0-9]{2}[- /.](?:(?:0[1-9]|1[0-2])[- /.](?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])[- /.](?:30))|(?:(?:0[13578]|1[02])-31))");
    if (Date.parse(temp_date) && regex.test(temp_date)) {
        return true;
    } else {
        ErrorHandleBar("Please Enter Date in YYYY-MM-DD Format and try again.");
        return false;
    }
}
var validatePastDate = function() {

    // Check if the date is not in the Past.
    var temp_date = $('input[type="date"]').val();
    var currentdate = getCurrentDate();
    if (currentdate <= temp_date) {
        return true;
    } else {
        ErrorHandleBar("Date must be " + getCurrentDate() + " or later.")
        return false;
    }
}

var validateTime = function() {

    // Regex to validate Time input
    var temp_time = $('input[type="time"]').val();
    var regex = new RegExp("(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){1}");
    if (regex.test(temp_time)) {
        return true;
    } else {
        ErrorHandleBar("Please Enter Time in HH:MM (24-hour) Format and try again.")
        return false;
    }
}

var getCurrentDate = function() {

    // Returns current date in YYYY-MM-DD format.
    var today = new Date();
    var d = new String(today.getDate());
    var m = new String(today.getMonth() + 1); //Starts from 0!
    var y = today.getFullYear();

    //If day or month is single digit, prepend 0.
    if (d.length < 2) {
        d = "0" + d;
    }
    if (m.length < 2) {
        m = "0" + m;
    }
    var dateval = new String(y + '-' + m + '-' + d);
    return dateval;
}

function formatStringDate(date) {

    // Returns date in String Format ie., January 12
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getUTCDate();
    var monthIndex = date.getMonth();
    return monthNames[monthIndex] + ' ' + day;
}

function formatStringTime(time) {

    // Returns Time in 12-Hour format ie., 11:05 PM
    var time = time.split(":");
    var hr = time[0];
    var suffix = hr >= 12 ? "PM" : "AM";
    hr = suffix == "PM" ? (((hr + 11) % 12) + 1) : hr;

    var min = time[1] + ' ' + suffix;
    return hr + ":" + min;
}

var populateData = function(data) {

    // Populates Ajax data into the Table and hides table if no result.
    var result_table = $("#result_table tbody");

    if (data && data != "") {

        result_table.parent().removeClass('hidden');
        result_table.find('tr').remove();

        for (var i = data.length - 1; i >= 0; i--) {

            var date_time = data[i]["app_date"].split(" ");

            date_time[0] = formatStringDate(new Date(date_time[0]));
            date_time[1] = formatStringTime(date_time[1]);

            result_table.append($('<tr>')
                .append($('<td>').text(date_time[0]))
                .append($('<td>').text(date_time[1]))
                .append($('<td>').text(data[i]["app_description"])));
        }

    } else {
        ErrorHandleBar("Sorry! No Result found.");
        result_table.parent().addClass('hidden');
    }
}

var ErrorHandleBar = function(message = "Something went wrong!") {

    // Helper function to show Errors.
    $("#info_area").removeClass('hidden').text(message);
}
