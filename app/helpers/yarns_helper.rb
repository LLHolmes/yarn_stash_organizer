module YarnsHelper

  def yarn_amount(yarn)
    if yarn.count && yarn.scrap
      if yarn.scrap.to_f == 0.0 && yarn.count == 1
        "(#{yarn.count} skein)"
      elsif yarn.scrap.to_f == 0.0 && yarn.count > 1
        "(#{yarn.count} skeins)"
      elsif yarn.count == 1
        "(#{yarn.count} skein, #{yarn.scrap.to_f} oz. scrap)"
      elsif yarn.count > 1
        "(#{yarn.count} skeins, #{yarn.scrap.to_f} oz. scrap)"
      end
    elsif yarn.count && yarn.count == 1
      "(#{yarn.count} skein)"
    elsif yarn.count && yarn.count > 1
      "(#{yarn.count} skeins)"
    elsif yarn.scrap && yarn.scrap.to_f > 1
      "(#{yarn.scrap.to_f} oz. scrap)"
    end
  end

end
