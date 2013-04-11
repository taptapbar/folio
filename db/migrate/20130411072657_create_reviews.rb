class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.date :date
      t.string :title
      t.text :description
      t.attachment :pdf

      t.timestamps
    end
  end
end
