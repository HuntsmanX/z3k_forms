class UsersController < ApplicationController
  
  before_action :authenticate_user!
  authorize_resource
  
  def update
    @user = User.find params[:id]
    if @user.update_attributes user_params
      @notification = { success: 'User details have been successfully updated' }
    else
      @notification = { error: 'Failed to update user details: ' + @user.errors.full_messages.join('; ') }
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:id, :role_id, department_ids: [])
  end
  
end