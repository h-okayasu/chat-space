class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params)
       redirect_to root_path
    else
      render :edit
    end
  end

  def create
    @user = user.new(user_params)
    if @user.save
      redirect_to root_path, notice: "アカウントが作成されました"
    else
      flash[:alert] = "項目にエラーがあります"
    end
  end


private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
