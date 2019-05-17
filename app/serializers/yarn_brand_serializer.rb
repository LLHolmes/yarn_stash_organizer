class YarnBrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :material, :weight, :nameDiv, :materialDiv

  def nameDiv
    "brand-#{object.name.downcase.split(" ").join("-")}"
  end

  def materialDiv
    "material-#{object.material.downcase.split(" ").join("-")}"
  end

end
