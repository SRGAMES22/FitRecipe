class Recipe < ApplicationRecord
  belongs_to :user, optional: true
  has_many :favorites, dependent: :destroy

  validates :title, presence: true
  validates :calories, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :protein, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :carbs, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :fat, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :prep_time, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  scope :by_calories, ->(max) { where("calories <= ?", max) if max.present? }
  scope :by_protein, ->(min) { where("protein >= ?", min) if min.present? }
  scope :by_prep_time, ->(max) { where("prep_time <= ?", max) if max.present? }
end
