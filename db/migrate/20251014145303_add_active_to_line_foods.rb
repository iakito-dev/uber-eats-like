class AddActiveToLineFoods < ActiveRecord::Migration[6.1]
  def change
    add_column :line_foods, :active, :boolean, null: false, default: true
    add_index  :line_foods, :active
  end
end
