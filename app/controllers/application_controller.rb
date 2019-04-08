class ApplicationController < ActionController::Base
  def home
    render '/home.html.erb'
  end
end
