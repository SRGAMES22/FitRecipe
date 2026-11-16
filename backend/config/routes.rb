Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/login",    to: "auth#login"
      post "auth/register", to: "auth#register"
      get  "auth/me",       to: "auth#me"

      resources :recipes, only: [:index, :show, :create] do
        member do
          post   :favorite
          delete :unfavorite
        end
      end

      get "favorites", to: "recipes#favorites"

      resources :workouts, only: [:index, :create, :destroy]
      resources :progress_entries, only: [:index, :create, :destroy]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
