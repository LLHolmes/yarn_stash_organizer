class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :pattern_info

  # belongs_to :user
  has_many :tools
  has_many :yarns, serializer: ProjectYarnSerializer
  has_many :notes
  has_many :brands, serializer: ProjectBrandSerializer
end
