Rails.application.routes.draw do
  resources :teachers, except:[:destroy]
  resources :teacher_assignments, except:[:update]
  resources :courses
  resources :enrollments, except:[:update]
  resources :students, except:[:destroy]
  resources :users, except:[:destroy]
  resources :classrooms, only:[:index]

  post "/signup", to: "users#create"
  get "/me", to: "users#logged_user"
  get "/admin-users", to: "users#admin_users"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  
end
