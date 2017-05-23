$(document).ready(function() {
    getAppointments();
    setCurrentDateRange();
});

var getAppointments = function(searchstr) {
    this.url = 'controls.php'
}

$('#switchable_button').click(function(e) {

    var currentstate = $(this).text(); // The text on the button acts as a flag.
    if (currentstate == 'NEW') {

        // form is not visible yet. Unhide form.
        $(this).text('ADD');
        showForm();

    } else if (currentstate == 'ADD') {

        // form is visible yet. Hide form.
        //$(this).text('NEW');
        //Check if the form is valid, if valid submit it.
        // hideForm();
        if (formValidation()) {
            $('#addition_form').submit();
        }
    }
});

$('#cancel_form').click(function(e) {

    $('#switchable_button').text('NEW');
    hideForm();
});

var showForm = function() {

    $('.new_entry_form').each(function(i, obj) {

        $(this).show('200');

    })
}

var hideForm = function() {

    $('.new_entry_form').each(function(i, obj) {

        $(this).hide('200');
    });
}

var formValidation = function() {
    var isValid = true;
    // var inputDate = $('input[type="date"]');
    // var inputTime = $('input[type="time"]');
    // var inputText = $('input[type="text"]');
    // if (!(inputDate.val())) {
    //
    // }
    // else {
    //
    // }
    $('.input_to_validate').each(function(i) {
        if (!$(this).val()) {
            $(this).parents('div.form-group').addClass('has-error');
            isValid = false;
        } else {
            switch (i) {
                case 0:
                    if (!validateDate() || !validatePastDate()) {
                        isValid = false;
                        $(this).parents('div.form-group').addClass('has-error');
                    } else {
                        $(this).parents('div.form-group').removeClass('has-error').addClass('has-success');
                    }
                    break;
                case 1:
                    if (!validateTime()) {
                        isValid = false;
                        $(this).parents('div.form-group').addClass('has-error');
                    } else {
                        $(this).parents('div.form-group').removeClass('has-error').addClass('has-success');
                    }
                    break;
                case 2:
                    $(this).parents('div.form-group').removeClass('has-error').addClass('has-success');
                    break;
            }
        }
    });
    return isValid;
}

var setCurrentDateRange = function() {
    var datefield = $('input[type="date"]');
    var dateval = getdatayyyymmdd();
    datefield.attr('min', dateval);
}

var validateDate = function() {
    var temp_date = $('input[type="date"]').val();
    if (Date.parse(temp_date)) {
        return true;
    } else {
        return false;
    }
}
var validatePastDate = function() {
    var temp_date = $('input[type="date"]').val();
    var currentdate = getdatayyyymmdd();
    if (currentdate <= temp_date) {
        return true;
    } else {
        return false;
    }
}

var validateTime = function() {
    var temp_time = $('input[type="time"]').val();
    var regex = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]")
    if (regex.test(temp_time)) {
        return true;
    } else {
        return false;
    }
}

var getdatayyyymmdd = function() {
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
