import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { supabase } from "@/config/supabase.ts"
import { useNavigate } from "react-router"


export function SignupForm() {

  const navigate = useNavigate()

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

     // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters")
      return
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    })

    if (error) {
      alert(error.message)
      return
    }

    // Redirect after successful signup
    if (data.session) {
      navigate("/dashboard", { replace: true })
    }

  }

  return (
    <Card className="w-full rounded-2xl border bg-card/90 shadow-xl shadow-black/5 [--card-spacing:--spacing(6)] dark:shadow-black/20">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">Create your account</CardTitle>
        <CardDescription className="leading-6">
          Set up your profile and start practicing in minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="signup-name">Full name</FieldLabel>
              <Input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="h-11 px-3"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="signup-email">Email address</FieldLabel>
              <Input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 px-3"
                required
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="h-11 px-3"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="signup-confirm-password">Confirm password</FieldLabel>
                <Input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="h-11 px-3"
                  required
                />
              </Field>
            </div>
            <FieldDescription>Password must be at least 8 characters.</FieldDescription>
            <Field className="gap-3 pt-1">
              <Button type="submit" className="h-11 w-full">Create account</Button>
              <p className="pt-2 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </p>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
