$(document).on('turbolinks:load', function(){
function buildHTML(message){
  var image = message.image ? `<img src = "${ message.image }"}>` :""
  var body = message.body ? `${ message.body } `:""
  var name = message.name ? `${ message.name }`:""
  var date = message.name ? `${ message.date }`:""
  var html = `<div class="messages" data-message-id="${ message.id }">
                <div class="messages__member">
                  ${ name }
                </div>
                <div class="messages__date">
                  ${ date }
                </div>
                <div class="messages__comments">
                  <p class="messages__comments--text">
                    ${ body }
                  </p>
                  <div class= "message__comments">
                   <div class="comments__image">
                   ${ image }
                   </div>
                </div>
              </div>`
  return html;
}

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.right-contents__messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
});

  var interval = setInterval(function() {
     if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var url = window.location.href
      var id = $('.messages').last().data('message-id');
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      var updateHTML = '';
      data.forEach(function(message){
        if (message.id > id){
        updateHTML += buildHTML(message);
        }
      });
      $('.right-contents__messages').append(updateHTML);
    })
    .fail(function(data) {
      alert('miss!')
    });
  } else {
    clearInterval(interval);
   }},10* 1000 );


});
