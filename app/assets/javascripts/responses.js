$(function() {

  $('#response_testee_id').select2({
    ajax: {
      url: "/testees/by_name",
      method: 'POST',
      dataType: 'json',
      delay: 1000,
      data: function (params) {
        return {
          name: params.term,
        };
      },
      processResults: function (data, params) {
        return {
          results: $.map(data.employees, function (item) {
            return {
              text: item.full_name,
              id: item.id,
              contacts: item.email ? item.email : item.phone
            }
          })
        };
      },
      cache: true
    },
    minimumInputLength: 2,
    width: '100%',
    templateResult: formatResults
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


  function formatResults(result) {
    if (!result.id && !result.contacts) { return result.text; }
    return $('<span class="employee-item"><p>' + result.text + '</p><p><small>'+ result.contacts +'<small></p></span>');
  }

  function showActiveBlock() {
    var active = $('input:radio:checked', '#new_response').val();

    $('.testee-block').hide();
    $('#response_testee_id').val('');
    $('.' + active + '-testee').show();
  }

});
