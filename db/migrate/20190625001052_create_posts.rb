class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.references :yarn, foreign_key: true
      t.references :ad, foreign_key: true

      t.timestamps
    end
  end
end
