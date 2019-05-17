class ProjectBrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :nameDiv

  def nameDiv
    "#{object.name.downcase.split(" ").join("-")}"
  end

end
