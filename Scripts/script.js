$(document).ready(function(){
    let counter=0;
    $('#btnCount').click(function(){
        counter++;
        $('#count').html(counter);
    });
});