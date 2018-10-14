$(document).on('turbolink:load', function(){

function buildHTML(message){
  var html = `<div class="messages">
                <div class="messages__member">
                  ${ message.user.name }
                </div>
                <div class="messages__date">
                  ${ message.created_at.strftime("%Y/%m/%d %H:%M") }
                </div>
                <div class="messages__comments">
                  <p class="messages__comments--text">
                    ${ message.body }
                    ${ message.image.url }
                  </p>
                </div>
             `
             console.log('message')
  return html;
}

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log("success!");
    for(item of formData){
        console.log(item);
    }
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("success!");
      var html = buildHTML(data);
      console.log(data);
      $('.right-contents__messages').append(html);
      $('#new_message').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      console.log("error!");
      alert('error');
    });
})
});
