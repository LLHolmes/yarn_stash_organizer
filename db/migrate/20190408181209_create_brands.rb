class CreateBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :brands do |t|
      t.string :name
      t.string :material
      t.string :weight
      t.string :hook
      t.string :needle
      t.integer :skein_weight
      t.integer :skein_length

      t.timestamps
    end
  end
end
