import { supabase } from "@/config/supabase.ts"
import type { User } from "@supabase/supabase-js"

async function getSessionToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession()

    return session?.access_token ?? null
}

async function getUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) return null

    return user
}

export { getUser, getSessionToken }
export { cn } from "cn"
