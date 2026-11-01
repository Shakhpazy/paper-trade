import { AuthShell } from "@/components/auth-shell"
import { SignupForm } from "@/components/signup-form"

export default function Signup() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  )
}
