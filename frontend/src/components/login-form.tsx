import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useNavigate } from "react-router"
import { supabase } from "@/config/supabase"

export function LoginForm() {

  const navigate = useNavigate()

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    navigate("/dashboard", { replace: true })
   
  }

  return (
    <Card className="w-full rounded-2xl border bg-card/90 shadow-xl shadow-black/5 [--card-spacing:--spacing(6)] dark:shadow-black/20">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">Sign in</CardTitle>
        <CardDescription className="leading-6">
          Enter your details to continue to your paper account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="login-email">Email address</FieldLabel>
              <Input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 px-3"
                required
              />
            </Field>
            <Field>
              <div className="flex items-center gap-4">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="h-11 px-3"
                required
              />
            </Field>
            <Field className="gap-3 pt-1">
              <Button type="submit" className="h-11 w-full">Sign in</Button>
              <Button variant="outline" type="button" className="h-11 w-full">
                Continue with Google
              </Button>
              <p className="pt-2 text-center text-sm text-muted-foreground">
                New to PaperTrade?{" "}
                <Link to="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Create an account
                </Link>
              </p>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
