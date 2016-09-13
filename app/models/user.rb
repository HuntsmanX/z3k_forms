class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:staff]
  store :settings, accessors: [:avatar_path, :timezone]

  def self.from_omniauth(auth)
    user = where(email: auth.info.email).first_or_initialize
    user.update_staff_attributes(auth)
    user.save
    user
  end

  def update_staff_attributes(auth)
    self.city_id     = auth.info.city_id
    self.avatar_path = 'system/users/avatars/' + auth.info.user_id.to_s + '/large/' + auth.info.avatar if auth.info.user_id && auth.info.avatar
    self.timezone    = auth.info.timezone
  end

end
