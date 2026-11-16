class CreateWorkouts < ActiveRecord::Migration[7.2]
  def change
    create_table :workouts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :notes
      t.integer :duration_minutes
      t.date :date, null: false

      t.timestamps
    end
  end
end
