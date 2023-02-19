Rails.application.routes.draw do
  resources :students
  resources :users, only: [:index, :show, :create]

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
