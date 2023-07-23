// @ts-nocheck
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect,  } from 'next/navigation'
import SubmitButton from "./SubmitButton"
import type { Database } from '@/types/supabase'

export default async function Login() {
  const handleSendLink = async (formData: FormData) => {
    "use server";
    const email = String(formData.get('email'))

    const supabase = createServerActionClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    const baseURL = process.env.VERCEL_ENV == "production" ? "https://sophoz.app" : "http://localhost:3000"
    const redirectURL = `${baseURL}/api/auth/callback`
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
    revalidatePath("/login")
  }

  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen w-screen">
      <h1 className="text-6xl font-bold text-center my-4">Login</h1>
      <h2 className="text-2xl text-center">Easily login using a magic link</h2>
      <form className="flex flex-col justify-center p-4 items-center" action={handleSendLink}>
        <input type="email" placeholder="Enter email" className="p-2 rounded-xl m-2 text-md outline-none bg-gray-200 text-black w-96" name="email" />
        <SubmitButton />
      </form>
    </div>
  )
}
