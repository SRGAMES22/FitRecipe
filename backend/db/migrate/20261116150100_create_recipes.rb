class CreateRecipes < ActiveRecord::Migration[7.2]
  def change
    create_table :recipes do |t|
      t.references :user, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.text :ingredients
      t.text :instructions
      t.integer :calories
      t.decimal :protein, precision: 6, scale: 1
      t.decimal :carbs, precision: 6, scale: 1
      t.decimal :fat, precision: 6, scale: 1
      t.integer :prep_time
      t.string :category
      t.string :image_url

      t.timestamps
    end
  end
end
