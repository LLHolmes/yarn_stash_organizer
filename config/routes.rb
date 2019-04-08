Rails.application.routes.draw do
  devise_for :users
  # Routes for Google authentication
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  get 'auth/failure', to: redirect('/')
  # Routes for Pinterest authentication
  # '/auth/pinterest'

  root 'application#welcome'
end
