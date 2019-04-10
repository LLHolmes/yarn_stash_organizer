Rails.application.routes.draw do
  resources :brands, except: [:index] do
    resources :yarns, only: [:index, :new]
  end
  resources :tools, except: [:show]
  resources :yarns, except: [:show]
  resources :projects
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", registrations: 'registrations' }

  root 'application#home'
end
