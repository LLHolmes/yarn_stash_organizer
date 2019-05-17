class YarnBrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :material, :weight, :nameDiv, :materialDiv

  def nameDiv
    "#{object.name.downcase.split(" ").join("-")}"
  end

  def materialDiv
    "#{object.material.downcase.split(" ").join("-")}"
  end

end
