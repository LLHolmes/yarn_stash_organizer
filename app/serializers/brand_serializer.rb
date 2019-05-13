class BrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :material, :weight, :skein_weight, :skein_length, :hook, :needle

  has_many :yarns
end
