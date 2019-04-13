class Tool < ApplicationRecord
  belongs_to :project

  accepts_nested_attributes_for :project

  validates_presence_of :name

  def project_attributes=(project_attributes)
    if !project_attributes[:name].empty?
      self.project = Project.find_or_create_by(name: project_attributes[:name], user_id: project_attributes[:user_id])
      self.project.update(project_attributes)
    end
  end

  def tool_with_project
    if self.project.name == "Stash"
      "#{self.name}"
    else
      "#{self.name}  ~  Current Project: #{self.project.name}"
    end
  end

end
