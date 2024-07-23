import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'safety_alerts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('token').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('user_id').references('users.id').onDelete('CASCADE') // delete profile when user is deleted
      table.string('email').notNullable()

      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
