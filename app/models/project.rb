class Project < ApplicationRecord
  belongs_to :user
  has_many :notes
  has_many :tools
  has_many :yarns
  has_many :brands, -> { distinct }, through: :yarns
  accepts_nested_attributes_for :notes, reject_if: :all_blank

  validates_presence_of :name
  validates_uniqueness_of :name, scope: :user_id

  def yarns_by_brand
    self.yarns.sort_by { |yarn| yarn.color }.sort_by { |yarn| yarn.brand.name }
  end
  
  # def yarns_sorted
  #   self.yarns_by_brand.sort_by { |yarn| yarn.brand.material }.sort_by { |yarn| yarn.brand.weight }
  # end

end
