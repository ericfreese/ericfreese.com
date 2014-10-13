class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :from
      t.text :message

      t.timestamps
    end
  end
end
