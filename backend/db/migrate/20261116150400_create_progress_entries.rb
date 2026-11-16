class CreateProgressEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :progress_entries do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.decimal :weight, precision: 5, scale: 2
      t.decimal :body_fat, precision: 4, scale: 1
      t.text :notes

      t.timestamps
    end
  end
end
