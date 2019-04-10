Rails.application.routes.draw do
  resources :brands, except: [:index] do
    resources :yarns, only: [:index, :new]
  end
  resources :tools, except: [:show]
  resources :yarns, except: [:show]
  resources :projects
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # Routes for Google authentication
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # get 'auth/:provider/callback', to: 'users/omniauth_callbacks#google_oauth2'
  get 'auth/failure', to: redirect('/')
  # Routes for Pinterest authentication
  # '/auth/pinterest'

  root 'application#home'
end
