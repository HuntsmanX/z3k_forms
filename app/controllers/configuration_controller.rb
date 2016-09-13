class ConfigurationController < ApplicationController

  before_action :authenticate_user!, except: [:dashboard]

  def dashboard
    flash.now[:notice] = "You need to sign in before continuing." if current_user.blank?
  end

 end