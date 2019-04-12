Rails.application.routes.draw do
  resources :brands, except: [:index] do
    resources :yarns, only: [:index]
  end

  resources :tools, except: [:show]

  resources :yarns, except: [:show]

  resources :projects do
    resources :yarns, only: [:index]
    resources :tools, only: [:index, :new]
  end

  resources :finish_projects, only: [:edit, :update]

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", registrations: 'registrations' }

  root 'application#home'
end
