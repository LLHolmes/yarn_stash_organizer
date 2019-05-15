class ProjectBrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :divName

  def divName
    "#{object.name.downcase.split(" ").join("-")}"
  end

end
