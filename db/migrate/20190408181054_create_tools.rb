class CreateTools < ActiveRecord::Migration[5.2]
  def change
    create_table :tools do |t|
      t.string :name
      t.references :project

      t.timestamps
    end
    add_index :tools, :project_id
  end
end
