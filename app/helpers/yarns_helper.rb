module YarnsHelper

  def yarn_amount(yarn)
    if yarn.count && yarn.count == 1
      if yarn.scrap && yarn.scrap.to_f > 0.0
        "(#{yarn.count} skein, #{yarn.scrap.to_f} oz. scrap)"
      else
        "(#{yarn.count} skein)"
      end
    elsif yarn.count && yarn.count > 1
      if yarn.scrap && yarn.scrap.to_f > 0.0
        "(#{yarn.count} skeins, #{yarn.scrap.to_f} oz. scrap)"
      else
        "(#{yarn.count} skeins)"
      end
    elsif yarn.scrap && yarn.scrap.to_f > 1
      "(#{yarn.scrap.to_f} oz. scrap)"
    end
  end

  def brand_yarn_links(yarn)
    "#{link_to yarn.brand.name, brand_path(yarn.brand)} - #{link_to yarn.color, edit_yarn_path(yarn)}".html_safe
  end

  def list_project(object)
    if object.project != current_user.stash
      "~  Current Project: #{link_to object.project.name, project_path(object.project)}".html_safe
    end
  end

end
