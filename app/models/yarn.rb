class Yarn < ApplicationRecord
  belongs_to :project
  belongs_to :brand
  has_one :post
  has_one :ad, through: :post

  validates_presence_of :color

  accepts_nested_attributes_for :project
  accepts_nested_attributes_for :brand

  scope :ordered_by_color, -> { order(:color) } # belongs in yarn?

  def project_attributes=(project_attributes)
    if !project_attributes[:name].empty?
      self.project = Project.find_or_create_by(name: project_attributes[:name], user_id: project_attributes[:user_id])
      self.project.update(project_attributes)
    elsif !self.project_id
      self.project = User.find(project_attributes[:user_id]).stash
      self.project.save
    end
  end

  def brand_attributes=(brand_attributes)
    if !brand_attributes[:name].empty?
      self.brand = Brand.find_or_create_by(name: brand_attributes[:name])
      self.brand.update(brand_attributes)
    end
  end

  def brand_yarn_with_project
    if self.project.name == "Stash"
      "#{self.brand.name} - #{self.color}"
    else
      "#{self.brand.name} - #{self.color}  ~  Current Project: #{self.project.name}"
    end
  end

end
