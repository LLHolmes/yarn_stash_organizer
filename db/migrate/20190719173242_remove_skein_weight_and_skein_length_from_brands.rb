class RemoveSkeinWeightAndSkeinLengthFromBrands < ActiveRecord::Migration[5.2]
  def change
    remove_column :brands, :skein_weight, :integer
    remove_column :brands, :skein_length, :integer
  end
end
