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

  # Old urls
  get '/2014/02/26/creating-a-theme-for-atom-githubs-new-editor.html', :to => redirect('/creating-a-theme-for-atom-github-s-new-editor')
  get '/2014/02/18/readable-w3c-archives.html', :to => redirect('/readable-w3c-archives')
  get '/2014/02/18/gulp-node-modules-gulp-util-node-modules-multipipe-node-modules-duplexer2-indexjs54.html', :to => redirect('/gulp-node-modules-gulp-util-node-modules-multipipe-node-modules-duplexer2-indexjs54')
  get '/card_experiments', :to => redirect('/card-experiments')
  
  resources :contents, :path => '', :except => [ :index, :new, :create ]

  root 'contents#index'
end
