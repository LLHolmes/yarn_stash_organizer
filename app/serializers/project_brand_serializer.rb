class ProjectBrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :div

  def div
    "#{object.name.downcase.split(" ").join("-")}"
  end

end
