class YarnSerializer < ActiveModel::Serializer
  attributes :id, :color, :count, :scrap

  belongs_to :project, serializer: YarnProjectSerializer
  belongs_to :brand, serializer: YarnBrandSerializer
end
