class CreateYarns < ActiveRecord::Migration[5.2]
  def change
    create_table :yarns do |t|
      t.string :color
      t.integer :count
      t.string :scrap
      t.references :project
      t.references :brand

      t.timestamps
    end
  end
end
