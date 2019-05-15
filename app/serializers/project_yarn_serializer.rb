class ProjectYarnSerializer < ActiveModel::Serializer
  attributes :id, :color, :count, :scrap, :brand_id, :brand_name

  def brand_id
    "#{object.brand.id}"
  end

  def brand_name
    "#{object.brand.name}"
  end

end
