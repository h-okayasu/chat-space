class MessagesController < ApplicationController
before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html
        format.json
  # respond_toでは送られてきたデータをhtmlかjsonを判断して、htmlならビューを返す(ここではindex.html.haml)jsonの場合、非同期通信として必要な情報だけを送る(今回では入力されたフォームの情報をcreate.json.jbuilderへ渡す)
      end
      redirect_to group_messages_path(@group), notice: "メッセージを送信しました"
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージの送信に失敗しました"
      render :index
    end
  end

private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
