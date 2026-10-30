import { AuthShell } from "@/components/auth-shell"
import { SignupForm } from "@/components/signup-form"

export default function Signup() {
  return (
    <AuthShell
      eyebrow="Start practicing"
      title="Learn the market without risking your money."
      description="Create a paper account to test ideas, review decisions, and develop a more consistent process."
    >
      <SignupForm />
    </AuthShell>
  )
}
