import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Google from "@/components/icon/Google";
import Github from "@/components/icon/Github";
import { useForm } from "@tanstack/react-form";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
        const { error } = await authClient.signUp.email(
          {
            email: value.email,
            password: value.password,
            name: value.name,
            callbackURL: "/",
          },
          {
            onError: (ctx) => setError(ctx.error.message),
          }
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
          }
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
      className="flex flex-col gap-4 w-full"
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
                className="border-x-3 border-t-3 px-4 py-2 w-full font-bold font-mono outline-none placeholder-foreground/60"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
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
              className="border-3 px-4 py-2 w-full font-bold font-mono outline-none placeholder-foreground/60"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
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
              className="border-x-3 border-b-3 px-4 py-2 w-full font-bold font-mono outline-none placeholder-foreground/60"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </form.Field>
      </div>

      <div className="flex flex-row gap-4 w-full items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="border-3 px-4 py-2 font-bold font-mono outline-none flex-1 hover:cursor-pointer"
        >
          {getButtonLabel()}
        </button>
        <button
          type="button"
          disabled={isLoading}
          aria-label="Sign in with GitHub"
          onClick={() => handleSocialLogin("github")}
          className="border-3 w-12 h-12 flex items-center justify-center outline-none bg-background light:bg-foreground hover:cursor-pointer"
        >
          <Github className="w-6 h-6" />
        </button>
        <button
          type="button"
          disabled={isLoading}
          aria-label="Sign in with Google"
          onClick={() => handleSocialLogin("google")}
          className="border-3 w-12 h-12 flex items-center justify-center outline-none bg-background light:bg-foreground hover:cursor-pointer"
        >
          <Google className="w-6 h-6" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError(null);
          setMessage(null);
        }}
        className="px-4 font-bold font-mono text-left outline-none flex-1 hover:cursor-pointer"
      >
        {isSignUp
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </button>
    </form>
  );
};

export default Login;
