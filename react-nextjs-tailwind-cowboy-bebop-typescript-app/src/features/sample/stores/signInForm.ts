import { z } from 'zod'

import { isNullOrUndefined } from '@/utils/typeUtil'

export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, '必須入力です')
    .email('メールアドレスの形式が不正です'),
  password: z
    .string()
    .min(8, `少なくとも8文字以上です`)
    .max(20, `多くとも20文字以下です`)
    .refine(
      // minLowercase https://github.com/knicola/yup-password/blob/master/index.js#L12-L23
      (value: string) => {
        return (
          isNullOrUndefined(value) || (value.match(/[a-z]/g) || []).length >= 1
        )
      },
      (value: string) => {
        return { message: `少なくとも小文字1文字以上を含めてください` }
      }
    )
    .refine(
      // minUppercase https://github.com/knicola/yup-password/blob/master/index.js#L25-L36
      (value: string) => {
        return (
          isNullOrUndefined(value) || (value.match(/[A-Z]/g) || []).length >= 1
        )
      },
      (value: string) => {
        return { message: `少なくとも大文字1文字以上を含めてください` }
      }
    )
    .refine(
      // minNumbers https://github.com/knicola/yup-password/blob/master/index.js#L38-L49
      (value: string) => {
        return (
          isNullOrUndefined(value) || (value.match(/[0-9]/g) || []).length >= 1
        )
      },
      (value: string) => {
        return { message: `少なくとも数字1文字以上を含めてください` }
      }
    )
    .refine(
      // minSymbol https://github.com/knicola/yup-password/blob/master/index.js#L51-L62
      (value: string) => {
        return (
          isNullOrUndefined(value) ||
          (value.match(/[^a-zA-Z0-9\s]/g) || []).length >= 1
        )
      },
      (value: string) => {
        return { message: `少なくとも記号1文字以上を含めてください` }
      }
    ),
})

export type SignInForm = z.infer<typeof SignInFormSchema>
