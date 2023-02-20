Rails.application.routes.draw do
  resources :students
  resources :users, only: [:index, :show, :create]

  post "/signup", to: "users#create"
  get "/user-info/:id", to: "users#user_info"
  get "/me", to: "users#show"
  get "/users-with-no-students", to: "users#users_with_no_students"
  get "/admin-users", to: "users#admin_users"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
