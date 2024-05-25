import { z } from 'zod'

export default function getUserModel(validatePassword = true) {

  let rules = z.object({

    fullname:
      z.string()
      .trim()   // Retira espaços em branco do início e do fim
      .min(5, { message: 'O nome deve ter, no mínimo, 5 caracteres' })
      .max(50, { message: 'O nome deve ter, no máximo, 50 caracteres' })
      .includes(' ', { message: 'O nome deve ter um espaço em branco separando nome e sobrenome' }),
  
    username:
      z.string()
      .trim()
      .transform(val => val.toLowerCase())  // coloca em minúsculas
      .refine(val => val.match(/^[a-z0-9_]{1,20}$/), { message: 'O nome do usuário pode conter apenas letras de a a z, dígitos e sublinhado' })
      .refine(val => val.length <= 20, { message: 'O nome do usuário deve ter, no máximo, 20 caracteres' }),
  
    is_admin:
      z.boolean(),
  
    login_attempts:
      z.number().nonnegative()
      .lte(3, { message: 'O número de tentativas deve ser menor ou igual a 3' }),
  
    delay_level:
      z.number().nonnegative()
      .lte(6, { message: 'O nível de retardo deve ser menor ou igual a 6' }),
  
    last_attempt:
      // coerce força a conversão para o tipo date, se o valor recebido
      // for string
      z.coerce.date()
      .optional()   // o campo é opcional
  })

  // Acrescenta regras adicionais caso a senha necessite ser validada
  if(validatePassword) {
    rules = rules.extend({
      password:
        z.string({ message: 'Informe a senha' })
        .min(8, { message: 'A senha deve ter, no mínimo, 8 caracteres' }),
        // Obs.: é possível fazer validações mais complexas usando regex,
        // mas não abordaremos aqui

      password2:
        z.string({ message: 'Informe a confirmação da senha' })

    }).refine(user => {
      // Se a senha e a confirmação da senha não forem vazias,
      // ambas devem ter o mesmo valor
      if(user.password2) return user.password === user.password2
      else return true
    }, { 
      message: 'A confirmação da senha não confere com a senha',
      // A mensagem de erro estará associada ao campo "password2"
      path: ['password2']  
    })
  }

  return rules

}

