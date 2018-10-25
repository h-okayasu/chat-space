$(document).on('turbolinks:load', function(){
function buildHTML(user){
  var html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ user.name }</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${ user.id } data-user-name= ${ user.name }>
                追加
                </a>
              </div>`
  return html;
}

function membersHTML(name, id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input id='chat_group_user' name='group[user_ids][]' type='hidden' value=${ id }>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  return html;
}

  $("#user-search-field").on("keyup",function(){
    var input = $(this).val();
    $('#user-search-result').find('div').remove();

    $.ajax({
      url: '/users',
      type: 'GET',
      data: { word: input },
      dataType: 'json'
    })
    .done(function(data){
      if (data.length !== 0) {
        data.forEach(function(user){
          var html = buildHTML(user);
          $('#user-search-result').append(html);
        });
      }
      else
        alert('該当するユーザーが見当たりませんでした');
    })
    .fail(function(){
      alert('通信失敗');
    });
  });

  $("#user-search-result").on('click', ".user-search-add", function(){
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    var html = membersHTML(name, id);
    $('.chat-group-user__name--member').append(html);
    $(this).parent().remove();
  });
  $('#user-search-result').on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
