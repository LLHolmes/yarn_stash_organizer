class Brand < ApplicationRecord
  has_many :yarns, dependent: :destroy

  accepts_nested_attributes_for :yarns, reject_if: :all_blank

  validates_presence_of :name
  # validates_uniqueness_of :name, scope: :user_id

  def yarns_attributes=(yarns_attributes)
    yarns_attributes.values.each do |yarn_attributes|
      binding.pry
      yarn = self.yarns.build(yarn_attributes)
      if !yarn_attributes[:brand_id].empty?
        yarn.update(yarn_attributes)
      end
      yarn.save
    end
  end

  # def project_attributes=(project_attributes)
  #   if !project_attributes[:name].empty?
  #     self.project = Project.find_or_create_by(name: project_attributes[:name], user_id: project_attributes[:user_id])
  #     self.project.update(project_attributes)
  #   end
  # end

  def yarns_by_color
    self.yarns.sort_by { |yarn| yarn.color }
  end

end
