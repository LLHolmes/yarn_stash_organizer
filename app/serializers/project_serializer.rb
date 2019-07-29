class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :pattern_info, :statusDiv

  has_many :tools
  has_many :yarns, serializer: ProjectYarnSerializer
  has_many :notes

  def statusDiv
    "#{object.status.downcase.split(" ").join("-")}"
  end
end
