import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { usePage } from '@inertiajs/react'
import type { DefineFunctionComponent } from '~/types/react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export interface LoadFragmentProps {
  /** The component url */
  source: `/${string}`
  /** The component display during loading */
  fallback?: ReactNode
}
/**
 * Load an Inertia Page as a fragment component.
 *
 * The component need to be a function component.
 */
export function LoadFragment(props: LoadFragmentProps) {
  const { source, fallback } = props

  const assetVersion = usePage().version
  const [componentProps, setComponentProps] = useState<Record<string, any>>({})
  const [component, setComponent] = useState<DefineFunctionComponent | null>(null)

  useEffect(() => {
    async function load() {
      const response = await fetch(source, {
        headers: {
          'X-Inertia': 'true',
          'X-Inertia-Fragment': 'true',
          'X-Inertia-Version': assetVersion || '1',
        },
      }).then((r) => r.json())

      setComponentProps(response.props)
      setComponent(
        await resolvePageComponent(
          `../fragments/${response.component}.tsx`,
          import.meta.glob<DefineFunctionComponent>('../fragments/**/*.tsx')
        )
      )
    }

    load()
  }, [])

  return <>{component === null ? fallback : component.default(componentProps)}</>
}
