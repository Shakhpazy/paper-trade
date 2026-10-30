import { supabase } from "@/config/supabase.ts"

async function getSessionToken() {
    const { data: { session } } = await supabase.auth.getSession()

    return session?.access_token ?? null
}

async function getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) return null

    return user
}

export { getUser, getSessionToken }
export { cn } from "cn"
