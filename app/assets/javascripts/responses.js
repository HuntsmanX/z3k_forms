$(function() {

  $('#response_testee').select2({
    ajax: {
      url: "http://localhost:3000/testees/by_name",
      method: 'POST',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          name: params.term, // search term
        };
      },
      processResults: function (data, params) {
        return {
          results: $.map(data.employees, function (item) {
            return {
              text: item.full_name,
              id: item.id
            }
          })
        };
      },
      cache: true
    },
    minimumInputLength: 2,
    width: '100%'
  });

  showActiveBlock();

  $('#testee_type_local').change(function (){
    showActiveBlock()
  });

  $('#testee_type_recruitment').change(function (){
    showActiveBlock()
  });

  $('#testee_type_staff').change(function (){
    showActiveBlock()
  });


  function showActiveBlock() {
    var active = $('input:radio:checked', '#new_response').val();

    $('.testee-block').hide();

    $('.' + active + '-testee').show();
  }

});

