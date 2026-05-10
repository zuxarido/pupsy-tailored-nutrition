import { Nav } from "@/components/landing/Nav";
import { Icon } from "@/components/ui/Icon";
import { AuthForm } from "@/components/ui/AuthForm";
import Link from "next/link";

export default function AuthPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          className="flex min-h-[80vh] items-center justify-center px-6"
          style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
        >
          <div className="w-full max-w-[420px]">
            <div className="text-center">
              <Icon name="paw" size={40} className="text-accent mx-auto" />
              <h1 className="headline-xl mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-foreground">
                Welcome back
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Sign in to manage your dog&rsquo;s meal plan.
              </p>
            </div>

            <div className="mt-8">
              <AuthForm redirectTo="/get-started" />
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/get-started"
                className="text-xs text-muted-foreground font-medium underline underline-offset-4 hover:text-foreground"
              >
                Skip for now — take the quiz first
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
