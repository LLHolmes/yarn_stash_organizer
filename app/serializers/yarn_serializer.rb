class YarnSerializer < ActiveModel::Serializer
  attributes :id, :color, :count, :scrap
  belongs_to :project
  belongs_to :brand
end
