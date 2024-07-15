Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  default_url_options :host => "localhost:3000"

  # Defines the root path route ("/")
  # root "posts#index"
  resources :orders, only: [:index, :show, :create, :destroy]
  devise_scope :user do
    post 'login', to: 'sessions#create'
    post 'register', to: 'registrations#create'
  end
end
