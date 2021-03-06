class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    # binding.pry
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_path
    end
  end

  # def google_oauth2
  #   @user = User.from_omniauth(request.env["omniauth.auth"])
  #   if @user.persisted?
  #     sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
  #     set_flash_message(:notice, :success, :kind => "Google") if is_navigational_format?
  #   else
  #     session["devise.google_oauth2_data"] = request.env["omniauth.auth"]
  #     redirect_to new_user_registration_path
  #   end
  # end

  # def pinterest
  #   @user = User.from_omniauth(request.env["omniauth.auth"])
  #   if @user.persisted?
  #     sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
  #     set_flash_message(:notice, :success, :kind => "Pinterest") if is_navigational_format?
  #   else
  #     session["devise.pinterest_data"] = request.env["omniauth.auth"]
  #     redirect_to new_user_registration_path
  #   end
  # end

  def failure
    redirect_to root_path
  end

end
