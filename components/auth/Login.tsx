import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Google from "@/components/icon/Google";
import Github from "@/components/icon/Github";
import { useForm } from "@tanstack/react-form";
import { intensity } from "@/stores";
import { Turnstile } from "@marsidev/react-turnstile";
import { darkMode } from "@/stores";
import { useStore } from "@nanostores/react";

interface LoginProps {
  turnstileSiteKey: string;
}

const Login = ({ turnstileSiteKey }: LoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const $darkMode = useStore(darkMode);

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setMessage(null);
      setIsLoading(true);

      if (isSignUp) {
        if (!turnstileToken) {
          setError("Please complete captcha");
          setIsLoading(false);
          return;
        }

        const { error } = await authClient.signUp.email(
          {
            email: value.email,
            password: value.password,
            name: value.name,
            callbackURL: "/",
            fetchOptions: {
              headers: {
                "x-captcha-response": turnstileToken,
              },
            },
          } as Parameters<typeof authClient.signUp.email>[0],
          {
            onError: (ctx) => setError(ctx.error.message),
          },
        );
        if (!error) {
          setMessage("Check your email");
        }
      } else {
        const { error } = await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
            callbackURL: "/",
          },
          {
            onError: (ctx) => setError(ctx.error.message),
          },
        );
        if (!error) {
          setMessage("Signed in successfully");
        }
      }

      setIsLoading(false);
    },
  });

  const handleSocialLogin = async (provider: "google" | "github") => {
    setError(null);
    setMessage(null);
    setIsLoading(true);

    await authClient.signIn.social({
      provider,
      callbackURL: "/",
      // errorCallbackURL: "/error",
    });

    setIsLoading(false);
  };

  const getButtonLabel = () => {
    if (isLoading) return isSignUp ? "Signing up..." : "Signing in...";
    if (error) return error;
    if (message) return message;
    return isSignUp ? "Sign up" : "Sign in";
  };

  return (
    <form
      className="flex w-full flex-col gap-4 px-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col">
        {isSignUp && (
          <form.Field name="name">
            {(field) => (
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="placeholder-foreground/60 min-h-12 w-full border-x-2 border-t-2 px-4 py-2 font-mono text-sm font-bold transition-all duration-300 ease-in-out outline-none sm:text-base md:border-x-3 md:border-t-3"
                value={field.state.value}
                onBlur={() => {
                  field.handleBlur;
                  intensity.set(4);
                }}
                onFocus={() => intensity.set(10)}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  intensity.set(e.target.value === "" ? 10 : 16);
                }}
                required
              />
            )}
          </form.Field>
        )}

        <form.Field name="email">
          {(field) => (
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="placeholder-foreground/60 min-h-12 w-full border-2 px-4 py-2 font-mono text-sm font-bold transition-all duration-300 ease-in-out outline-none sm:text-base md:border-3"
              value={field.state.value}
              onBlur={() => {
                field.handleBlur;
                intensity.set(4);
              }}
              onFocus={() => intensity.set(10)}
              onChange={(e) => {
                field.handleChange(e.target.value);
                intensity.set(e.target.value === "" ? 10 : 16);
              }}
              required
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <input
              type="password"
              id="password"
              placeholder="Password"
              minLength={8}
              className="placeholder-foreground/60 min-h-12 w-full border-x-2 border-b-2 px-4 py-2 font-mono text-sm font-bold transition-all duration-300 ease-in-out outline-none sm:text-base md:border-x-3 md:border-b-3"
              value={field.state.value}
              onBlur={() => {
                field.handleBlur;
                intensity.set(4);
              }}
              onFocus={() => intensity.set(10)}
              onChange={(e) => {
                field.handleChange(e.target.value);
                intensity.set(e.target.value === "" ? 10 : 16);
              }}
              required
            />
          )}
        </form.Field>
      </div>

      {isSignUp && (
        <div className="border-3">
          <Turnstile
            siteKey={turnstileSiteKey}
            options={{
              theme: $darkMode ? "dark" : "light", // "light", "dark", "auto"
              size: "flexible", // "flexible", "normal", "compact", "invisible"
              appearance: "always", // "always", "execute", "interaction-only"
            }}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={(err) => {
              console.error("Turnstile error:", err);
              setTurnstileToken("");
            }}
          />
        </div>
      )}

      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-12 w-full flex-1 overflow-hidden border-2 px-4 py-2 font-mono text-sm font-bold text-ellipsis whitespace-nowrap transition-all duration-300 ease-in-out outline-none hover:cursor-pointer sm:text-base md:border-3"
        >
          {getButtonLabel()}
        </button>
        <div className="flex w-full flex-row items-center gap-4 md:w-auto">
          <button
            type="button"
            disabled={isLoading}
            aria-label="Sign in with GitHub"
            onClick={() => handleSocialLogin("github")}
            className="light:bg-foreground flex h-12 w-full items-center justify-center border-2 bg-transparent outline-none hover:cursor-pointer md:w-12 md:border-3"
          >
            <Github className="size-5" />
          </button>
          <button
            type="button"
            disabled={isLoading}
            aria-label="Sign in with Google"
            onClick={() => handleSocialLogin("google")}
            className="light:bg-foreground flex h-12 w-full items-center justify-center border-2 bg-transparent outline-none hover:cursor-pointer md:w-12 md:border-3"
          >
            <Google className="size-5" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError(null);
          setMessage(null);
        }}
        className="flex-1 text-left font-mono text-sm font-bold transition-all duration-300 ease-in-out outline-none hover:cursor-pointer sm:text-base"
      >
        {isSignUp
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </button>
    </form>
  );
};

export default Login;
