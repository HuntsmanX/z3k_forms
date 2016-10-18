Rails.application.routes.draw do

  root 'dashboards#show'

  devise_for :users, controllers: { :omniauth_callbacks => "users/omniauth_callbacks" }

  devise_scope :user do
    get 'sign_in' => redirect('users/auth/staff'), as: :new_user_session
    get 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  resource  :dashboard

  resources :tests

  namespace :test do
    resources :sections
    resources :questions
  end

  resources :responses

  namespace :response do
    resources :sections
    resources :questions
  end

  get 'start/:id', to: 'responses#start', as: :start

  resources :testees do
    post '/by_name', to: 'testees#by_name', on: :collection
  end

end
