Rails.application.routes.draw do

  root 'dashboards#show'

  devise_for :users, controllers: { :omniauth_callbacks => "users/omniauth_callbacks" }

  devise_scope :user do
    get 'sign_in' => redirect('users/auth/staff'), as: :new_user_session
    get 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  resource  :dashboard
  resources :tests
end
