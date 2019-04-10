class Yarn < ApplicationRecord
  belongs_to :project
  belongs_to :brand

  def yarn_with_brand
    if self.project.name == "Stash"
      "#{self.brand.name} - #{self.color}"
    else
      "#{self.brand.name} - #{self.color}  ~  Current Project: #{self.project.name}"
    end
  end

end
