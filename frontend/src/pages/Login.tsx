import { AuthShell } from "@/components/auth-shell"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Practice the process, not the pressure."
      description="Return to your paper account and keep building a trading routine with simulated positions."
    >
      <LoginForm />
    </AuthShell>
  )
}
