function show_time_section(){
    $("#set_time_for_test").show();
    if($('#test_time_limit_false')[0].checked){
        $("#set_time_for_test").hide();
    }
}
