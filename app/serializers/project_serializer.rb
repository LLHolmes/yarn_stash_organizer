class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :pattern_info
  # belongs_to :user
  has_many :tools
  has_many :yarns
end
