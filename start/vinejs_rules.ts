import { VineString } from '@vinejs/vine'

import type { Options as PasswordOptions } from '#rules/password'
import { passwordRule } from '#rules/password'

declare module '@vinejs/vine' {
  interface VineString {
    /** Ensure the string respect the password rules */
    password(options?: PasswordOptions): this
  }
}

VineString.macro('password', function (this: VineString, options: PasswordOptions) {
  return this.use(passwordRule(options))
})
