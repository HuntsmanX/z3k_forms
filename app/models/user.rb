class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :confirmable,
         :password_expirable, :password_archivable, :zxcvbnabl


end
