// @ts-nocheck
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import type { Database } from '@/types/supabase'

export default async function Login() {
  const handleSendLink = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const supabase = createServerActionClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    const redirectURL = `${process.env.VERCEL_ENV == "production" ? "https://sophoz.app" : "http://localhost:3000"}/api/auth/callback`
    console.log(redirectURL)
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectURL,
      },
    })
    if (error) {
      console.log(error)
      return
    }
    revalidatePath("/")
  }

  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen w-screen">
      <h1 className="text-6xl font-bold text-center my-4">Login</h1>
      <h2 className="text-2xl text-center">You can easily login using a magic link. <br />Make sure to check your inbox.</h2>
      <form className="flex flex-col justify-center p-4 items-center" action={handleSendLink}>
        <input type="email" placeholder="Enter email" className="p-2 rounded-xl m-2 text-md outline-none bg-gray-200 text-black w-96" name="email" />
        <input type="submit" className="p-2 rounded-xl m-2 text-md outline-none bg-red-500 w-fit px-8 text-white font-medium cursor-pointer hover:opacity-80" value="Send magic link" />
      </form>
    </div>
  )
}
