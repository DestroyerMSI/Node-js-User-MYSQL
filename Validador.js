import z from 'zod'


 const VAlidador = z.object({
    user_name: z.string({
        invalid_type_error: 'Este formato de texto es incorrecto',
        required_error: 'Este campo es requerido '
    }),
    user_password:  z.string({
        invalid_type_error: 'Este formato de texto es incorrecto',
        required_error: 'Este campo es requerido '
    })
 })

 export function VAlidadorr(object){
    return VAlidador.safeParse(object)
 }