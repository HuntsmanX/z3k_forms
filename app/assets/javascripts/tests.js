function show_time_for_test(){
    $("#set_time_for_test").show();
    if($( "#test_time_limit" )[0].checked == false){
        $("#set_time_for_test").hide();
    }
}

