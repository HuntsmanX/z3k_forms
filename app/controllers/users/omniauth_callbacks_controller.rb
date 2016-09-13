class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def staff
    @user = User.from_omniauth(request.env["omniauth.auth"])
    sign_in_and_redirect @user
    set_flash_message(:success, :success, kind: "Staff") if is_navigational_format?
  end
  
  def failure
    flash[:danger] = "Authorization failed. Make sure you have enough permissions to access this resource"
    redirect_to root_path
  end

end