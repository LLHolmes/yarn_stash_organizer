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

end
