$(function() {

  $('#response_testee_user_id').select2({
    ajax: {
      url: "/testees/by_name",
      method: 'POST',
      dataType: 'json',
      delay: 300,
      data: function(params) {
        return {
          name: params.term,
        };
      },
      processResults: function(data, params) {
        return {
          results: $.map(data.employees, function(item) {
            return {
              text: item.full_name,
              id: item.id,
              contacts: item.email ? item.email : item.phone,
              firstCallDate: item.first_called_on
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

  function formatResults(result) {
    var contacts = result.contacts;
    var firstCallDate = result.firstCallDate;
    var contactsHtml, firstCallDateHtml;

    if (!result.id) { return result.text; }

    if(contacts) { contactsHtml = '<span class="contacts-container"><small>'+ result.contacts +'</small></span>' }
    if(firstCallDate) { firstCallDateHtml = '<span class="first-call-date success label float-right"><i class="material-icons">call</i><small>'+ result.firstCallDate +'</small></span>' }

    return $('<span class="employee-item"><p>' + result.text + '</p><p>'+ contactsHtml + firstCallDateHtml +'</p></span>');
  }

  toggleTesteeFields();

  $('[name="response[testee][source_type]"]').change(function() {
    toggleTesteeFields();
  });

  function toggleTesteeFields() {
    var active = $('[name="response[testee][source_type]"]:checked').val();
    $('.testee-fields').hide();
    $('.testee-fields#' + active).show();
  }

});
