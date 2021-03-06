class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def home
    render '/home.html.erb'
  end

  private
    def after_sign_in_path_for(resource)
      request.env['omniauth.origin'] || root_path
    end

    def after_sign_up_path_for(resource)
      request.env['omniauth.origin'] || root_path
    end

end
