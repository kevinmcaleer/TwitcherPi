$(function(){

    var $labels = $('#labels');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2222/labels', 
        success: function(labels) {
            $.each(labels, function(i, label){
                $labels.append('<option>' + label.label + '</option>')
            });
        }
    });

})