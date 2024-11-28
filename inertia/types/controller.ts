import type { InferPageProps } from '@adonisjs/inertia/types'

type Props<T extends { handle: any }> = InferPageProps<T, 'handle'>

export type { Props }
