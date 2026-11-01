import { AuthShell } from "@/components/auth-shell"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  )
}
