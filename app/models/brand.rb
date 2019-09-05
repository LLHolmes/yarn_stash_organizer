class Brand < ApplicationRecord
  has_many :yarns, dependent: :destroy

  validates_presence_of :name

  def yarns_attributes=(yarns_attributes)
    yarns_attributes.values.each do |yarn_attributes|
      if !yarn_attributes[:color].empty?
        if yarn_attributes[:brand_id].empty?
          yarn = self.yarns.build(yarn_attributes)
          yarn.save
        else
          yarn = Yarn.create(yarn_attributes)
        end
      end
    end
  end

  def yarns_by_color
    yarns.ordered_by_color
  end

end
