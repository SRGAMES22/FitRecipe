class User < ApplicationRecord
  has_secure_password

  has_many :recipes, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_recipes, through: :favorites, source: :recipe
  has_many :workouts, dependent: :destroy
  has_many :progress_entries, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  enum subscription_type: { free: 0, weapon_x: 1 }, _default: :free
end
