class AddSkeinStatsToBrands < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :skein_weight, :decimal, precision: 10, scale: 2
    add_column :brands, :skein_length, :decimal, precision: 10, scale: 2
  end
end
