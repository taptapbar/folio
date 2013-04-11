class CreateSidebars < ActiveRecord::Migration
  def change
    create_table :sidebars do |t|
      t.string :link_to
      t.text :description
      t.attachment :image

      t.timestamps
    end
  end
end
