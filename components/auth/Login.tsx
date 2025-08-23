import React from "react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Google from "@/components/icon/Google";
import Github from "@/components/icon/Github";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    const { error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/",
      },
      {
        onError: (ctx) => setError(ctx.error.message),
      }
    );

    if (!error) {
      setMessage("Check your email — we’ve sent a verification link.");
    }

    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border-3 px-4 py-2 w-full font-bold font-mono outline-none placeholder-foreground/60"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-x-3 px-4 py-2 w-full font-bold font-mono outline-none placeholder-foreground/60"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={8}
          className="border-3 px-4 py-2 w-full font-bold font-mono outline-none placeholder-foreground/60"
          required
        />
      </div>
      <div className="flex flex-row gap-4 w-full items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="border-3 px-4 py-2 font-bold font-mono outline-none flex-1 hover:cursor-pointer"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <button
          type="button"
          disabled={isLoading}
          aria-label="Sign in with GitHub"
          className="border-3 w-12 h-12 flex items-center justify-center outline-none bg-background light:bg-foreground hover:cursor-pointer"
        >
          <Github className="w-6 h-6" />
        </button>
        <button
          type="button"
          disabled={isLoading}
          aria-label="Sign in with Google"
          className="border-3 w-12 h-12 flex items-center justify-center outline-none bg-background light:bg-foreground hover:cursor-pointer"
        >
          <Google className="w-6 h-6" />
        </button>
      </div>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      {message ? <p style={{ color: "green" }}>{message}</p> : null}
    </form>
  );
};

export default Login;
