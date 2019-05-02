class AddImageUrlToYarns < ActiveRecord::Migration[5.2]
  def change
    add_column :yarns, :image_url, :string
  end
end
