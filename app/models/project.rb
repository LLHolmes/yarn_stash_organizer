class Project < ApplicationRecord
  belongs_to :user
  has_many :notes
  has_many :tools
  has_many :yarns
  has_many :brands, -> { distinct }, through: :yarns

  validates_uniqueness_of :name, scope: :user_id
  
end
