// @ts-nocheck
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect,  } from 'next/navigation'
import SubmitButton from "./SubmitButton"
import GoogleButton from "./GoogleButton"
import Image from "next/image"

import type { Database } from '@/types/supabase'

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect("/balanced_news")
  }


  const handleSendLink = async (formData: FormData) => {
    "use server";
    const email = String(formData.get('email'))

    const supabase = createServerActionClient<Database>({ cookies })
    //const { data: { session } } = await supabase.auth.getSession()
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
        <GoogleButton />
        <p className="text-sm py-4 text-center text-gray-500 font-bold tracking-tight">OR</p>
        <div className="flex flex-row">
          <input type="email" placeholder="Enter email" className="p-2 rounded-xl m-2 text-md outline-none bg-gray-200 text-black w-96" name="email" />
          <SubmitButton />
        </div>
      </form>
      <footer className="absolute bottom-0 left-0 right-0 h-16 bg-gray-200 flex justify-center items-center"><a target="_blank" href="https://icons8.com/icon/60984/google">Google</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></footer>
    </div>
  )
}
