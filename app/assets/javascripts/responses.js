$(function() {
  $('#testee_type_local').change(function (){
    $('#content').show();
  }
  )
  $('#testee_type_recrutment').change(function (){
    $('#content').hide();
  }
  )
  $('#testee_type_staff').change(function (){
    $('#content').hide();
  }
  )
});
