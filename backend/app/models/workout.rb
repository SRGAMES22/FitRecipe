class Workout < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :duration_minutes, numericality: { greater_than: 0 }, allow_nil: true
end
