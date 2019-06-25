class CreateAds < ActiveRecord::Migration[5.2]
  def change
    create_table :ads do |t|
      t.references :user, foreign_key: true
      t.text :description
      t.boolean :for_sale

      t.timestamps
    end
  end
end
