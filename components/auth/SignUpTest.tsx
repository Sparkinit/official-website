import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
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
        callbackURL: "/", // 注册成功后的回调
      },
      {
        onError: (ctx) => setError(ctx.error.message),
      }
    );

    if (!error) {
      setMessage("注册成功，请查收验证邮件或稍后自动登录。");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 360 }}
    >
      <h2>注册</h2>

      <label>
        姓名
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的名字"
          required
        />
      </label>

      <label>
        邮箱
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label>
        密码
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="至少8位"
          minLength={8}
          required
        />
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "注册中..." : "注册"}
      </button>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      {message ? <p style={{ color: "green" }}>{message}</p> : null}
    </form>
  );
}
