import zod from 'zod'

const charSchema = zod.object({
  name: zod.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }),
  realName: zod.string({
    invalid_type_error: 'Real Name must be a string'
  }).default('Unknown'),
  power: zod.array(zod.string({
    invalid_type_error: 'Power must be a string'
  }).min(1, { message: 'At least one power is required' }))

})

export function validateChar (object) {
  return charSchema.safeParse(object)
}

export function validatePartialChar (object) {
  return charSchema.partial().safeParse(object)
}
