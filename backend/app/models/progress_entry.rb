class ProgressEntry < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
end
