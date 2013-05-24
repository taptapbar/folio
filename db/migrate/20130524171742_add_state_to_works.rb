class AddStateToWorks < ActiveRecord::Migration
  def change
    add_column :works, :state, :string, :default => 'hidden'
  end
end
