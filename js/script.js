$(document).ready(function() {
    getAppointments();
});

var getAppointments = function(searchstr) {
    this.url = 'controls.php',
        $
}

$('#switchable_button').click(function(e) {
    //e.stopPropogation();
    var currentstate = $(this).text(); // The text on the button acts as a flag.
    if (currentstate == 'NEW') {

        // form is not visible yet. Unhide form.
        $(this).text('ADD');
        showForm();

    } else if (currentstate == 'ADD') {

        // form is visible yet. Hide form.
        $(this).text('NEW');
        hideForm();

    }
});

$('#cancel_form').click(function(e) {

    $('#switchable_button').text('NEW');
    hideForm();
});

var showForm = function() {

    $('.new_entry_form').each(function(i, obj) {

        if (i == 0) {
            $(this).fadeIn('200', 'swing');
        } else {
            $(this).slideToggle('200', 'swing');
        }

    })
}

var hideForm = function() {

    $('.new_entry_form').each(function(i, obj) {

        if (i == 0) {
            $(this).fadeOut('200', 'swing');
        } else {
            $(this).slideToggle('200', 'swing');
        }
    });
}
