class AddPreviewToContents < ActiveRecord::Migration
  def change
    add_column :contents, :preview, :text
  end
end
