Rails.application.routes.draw do
  resources :pages, :only => [ :new, :create ]
  resources :posts, :only => [ :index, :new, :create ]
  resources :experiments, :only => [ :index, :new, :create ]

  resources :contacts, :only => [ :index, :show, :create ]
  get 'contact', :to => 'contacts#new', :as => :new_contact
  get 'contacted', :to => 'contacts#contacted'

  get 'login', :to => 'sessions#new', :as => 'login'
  get 'logout', :to => 'sessions#destroy', :as => 'logout'
  resources :sessions, :only => [ :create ]

  resources :contents, :path => '', :except => [ :index, :new, :create ]

  root 'contents#index'
end
