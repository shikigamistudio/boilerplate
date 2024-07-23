import { args, BaseCommand } from '@adonisjs/core/ace'

export default class MakePage extends BaseCommand {
  static commandName = 'make:page'
  static description = 'Create a new tsx template file'

  @args.string({ description: 'Name of the template' })
  declare file: string

  async run() {
    const entity = this.app.generators.createEntity(this.file)
    const codemods = await this.createCodemods()

    await codemods.makeUsingStub(this.app.commandsPath('templates'), 'make_page.stub', {
      entity,
    })
  }
}
