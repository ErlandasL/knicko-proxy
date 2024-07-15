class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.decimal :amount
      t.string :status
      t.string :coingate_order_id

      t.timestamps
    end
  end
end
