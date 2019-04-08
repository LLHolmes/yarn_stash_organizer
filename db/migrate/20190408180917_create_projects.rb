class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :status
      t.string :pattern_info
      t.references :user

      t.timestamps
    end
    add_index :projects, :user_id
  end
end
