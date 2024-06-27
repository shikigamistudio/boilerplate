import type { InferPageProps } from '@adonisjs/inertia/types'
import { Badge } from '~/components/elements/badge'
import { Input } from '~/components/forms/input'
import { Label } from '~/components/forms/label'

import type HomeController from '#controllers/home_controller'

const checkList = [
  {
    name: 'title-meta',
    text: 'Change the title and metadatas in',
    file: 'resources/views/inertia_layout.edge',
  },
  {
    name: 'app-name',
    text: 'Change the app name in',
    file: 'inertia/app/app.tsx',
  },
  {
    name: 'dot-env',
    text: 'Configure the .env file',
    file: '.env',
  },
  {
    name: 'favicon-icon',
    text: 'Change the icon in the favicon',
    file: 'public/favicon.ico',
  },
  {
    name: 'header-icon',
    text: 'Change the icon in the header',
    file: 'inertia/components/layouts/page_header.tsx',
  },
  {
    name: 'footer',
    text: 'Customize the footer',
    file: 'inertia/components/layouts/page_footer.tsx',
  },
]

export default function Home(props: InferPageProps<HomeController, 'handle'>) {
  return (
    <>
      <h1 className="text-center text-2xl">Shikigami Studio Boilerplate</h1>

      <p>Todo Checklist</p>
      <ul>
        {checkList.map(function (object, i) {
          return (
            <li key={i}>
              <Input type="checkbox" name={object.name} />
              <Label name={object.name} className="inline-block pl-2">
                {object.text}{' '}
                <a href={'vscode://file/' + props.appPath + object.file + ':1:1'}>
                  <Badge>{object.file}</Badge>
                </a>
              </Label>
            </li>
          )
        })}
      </ul>
      <p>You can then start developing your application</p>
    </>
  )
}
