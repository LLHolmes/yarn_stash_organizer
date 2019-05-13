class ToolSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :project, serializer: YarnProjectSerializer
end
