class Brand < ApplicationRecord
  has_many :yarns, dependent: :destroy
  accepts_nested_attributes_for :yarns

  def yarns_by_color
    self.yarns.sort_by { |yarn| yarn.color }
  end

end
