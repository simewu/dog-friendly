Rails.application.routes.draw do
  resources :users
    get '/', to: 'dog_friendly#index'
    get '/explore', to: 'dog_friendly#explore'
    get '/about', to: 'dog_friendly#about'
    get '/contact', to: 'dog_friendly#contact'
    get '/emergency', to: 'dog_friendly#emergency'
    get '/error', to: 'dog_friendly#error'
    get '/googled20223034b49bf6f.html', to: 'dog_friendly#googled20223034b49bf6f'
    get '/privacy', to: 'dog_friendly#privacy'
    #get '/googlesignin', to: '/auth/google_oauth2'
    
    #google log in stuff
    #get 'login', to: 'logins#new'
    #get 'login/create', to: 'logins#create', as: :create_login
    get '/auth/:provider/callback' => 'sessions#omniauth'
    
    get '*path' => redirect('/error')
    
end



