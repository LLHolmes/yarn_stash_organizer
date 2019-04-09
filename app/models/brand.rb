class Brand < ApplicationRecord
  has_many :yarns
  accepts_nested_attributes_for :yarns
end
