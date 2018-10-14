$(document).on('turbolink:load', function(){
// $(document).on('turbolink:load' これでturbolinkのバグを解消させてる・・らしい
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
  // #new_message(=投稿フォーム)のフォーム送信ボタンが押された時
    e.preventDefault();
  // デフォルトのイベント発生をキャンセルさせる(変数eによって上に渡してる)
    var formData = new FormData(this);
  // 
    var url = $(this).attr('action');
  // ここでのthisはフォームで入力された内容を指していて、そのアクション属性を指定している。(new_messageのアクションで'groups/1/messages'を指定)
    console.log("success!");
    for(item of formData){
        console.log(item);
    }
    $.ajax({
      url: url,
  // 28行目で用意した変数urlを指定する事でリクエストパスを取得
      type: "POST",
  // HTTPメソッドを指定(rake routesを参照)
      data: formData,
  // リクエストと一緒に送るデータを指定(今回はフォームの内容を代入しているformData)
      dataType: 'json',
  // 送信する際の形式の指定
      processData: false,
      contentType: false
  // processDataとcontentTypeはFormDataを使ってフォームの情報を取得した時は必ずfalseになる
  // ここまでの情報がmessage_controllerのcreateアクションへ送られる
    })
    .done(function(data){
  // ここのdataにはcreate.json.jbuilderで変換されたフォームに入力された情報が入っている
      console.log("success!");
      var html = buildHTML(data);
  // dataの中身をbuildHTMLに渡してhtmlとしての返り値を変数htmlに代入している
      console.log(data);
      $('.right-contents__messages').append(html);
  // .right-contents__messagesへ上で代入したhtmlをappendメソッドによってhtml要素として追加している
      $('#new_message').val('');
  // 投稿フォームに残っている入力データを初期化させる
      $('.form__submit').prop('disabled', false);
    })
  // フォームの送信ボタンを有効にさせている・・らしい
    .fail(function(){
      console.log("error!");
      alert('error');
  // フォーム投稿のどこかのフローの中で不備があった場合はエラーを告知させる
    });
})
});
