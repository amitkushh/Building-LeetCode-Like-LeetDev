import { LoginForm } from "@/components/login-form";

function LoginPage() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
export default LoginPage;
