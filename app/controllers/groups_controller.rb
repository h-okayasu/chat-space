class GroupsController < ApplicationController

before_action :set_group, only: [:edit, :update]

def index
end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    @group.users << current_user
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      flash.now[:alert] = "グループ名を入力してください"
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
       @group.users << current_user
      redirect_to root_path, notice: 'グループを編集しました'
    else
      render :edit
    end
  end

private

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

end
