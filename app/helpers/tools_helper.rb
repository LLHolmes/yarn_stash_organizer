module ToolsHelper

  def list_tool
    if self.project.name == "Stash"
      "#{self.brand.name} - #{self.color}"
    else
      "#{self.brand.name} - #{self.color}  ~  Current Project: #{self.project.name}"
    end
  end

end
