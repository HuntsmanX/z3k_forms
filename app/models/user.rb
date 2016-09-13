class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable,
  # :database_authenticatable, :registerable,
  # :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, omniauth_providers: [:staff]
  
  def self.from_omniauth(auth)
    user = where(staff_uid: auth.uid).first_or_initialize
    user.update_staff_attributes(auth)
    user.guess_role(auth) if user.new_record?
    user.save
    user
  end

end
