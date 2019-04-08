class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :note
      t.references :project

      t.timestamps
    end
    add_index :notes, :project_id
  end
end
