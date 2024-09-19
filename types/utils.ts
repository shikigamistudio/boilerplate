type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B

/** Exctract the readonly key of an object */
export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T]

/** Exctract the writable key of an object */
export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T]

/** Exctract the public key of an object */
export type PublicOnly<T> = Pick<T, keyof T>

/** Extracts the keys of the enum object as a union type. */
export type EnumKeys<T> = keyof T

/** Extracts the values of the enum object as a union type. */
export type EnumValues<T> = T[keyof T]
