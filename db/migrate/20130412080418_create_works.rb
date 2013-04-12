class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.string :title
      t.text :description
      t.date :date
      t.attachment :image

      t.timestamps
    end
  end
end
