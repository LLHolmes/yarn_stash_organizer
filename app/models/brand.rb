class Brand < ApplicationRecord
  has_many :yarns, dependent: :destroy

  validates_presence_of :name

  def yarns_attributes=(yarns_attributes)
    yarns_attributes.values.each do |yarn_attributes|
      if !yarn_attributes[:color].empty?
        yarn = self.yarns.build(yarn_attributes)
        yarn.save
        if !yarn_attributes[:brand_id].empty?
          yarn.update(yarn_attributes)
          yarn.save
        end
      end
    end
  end

  def yarns_by_color
    self.yarns.sort_by { |yarn| yarn.color }
  end

end
