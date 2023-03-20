Rails.application.routes.draw do
  resources :teachers
  resources :teacher_assignments
  resources :courses
  resources :enrollments
  resources :students
  resources :users
  resources :classrooms, only:[:index]

  post "/signup", to: "users#create"
  # get "/me", to: "users#me"
  get "/me", to: "users#logged_user"
  get "/users-with-no-students", to: "users#users_with_no_students"
  get "/admin-users", to: "users#admin_users"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  
end
