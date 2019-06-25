class Ad < ApplicationRecord
  belongs_to :user
  has_many :posts
  has_many :yarns, through: :posts
end
