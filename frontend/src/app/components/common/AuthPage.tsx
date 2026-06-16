import { useState } from "react";
import { Eye, EyeOff, LayoutDashboard } from "lucide-react";
import { STORAGE_KEYS, VALIDATION, MODAL_DELAY } from "../../constants";
import type { User } from "../../types";

interface StoredUser extends User {
  password: string;
}

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) ?? "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

interface Props {
  onAuth: (user: User) => void;
}

export function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const users = getUsers();

      if (mode === "signup") {
        if (users.find((u) => u.email === email)) {
          setError("이미 가입된 이메일입니다.");
          setLoading(false);
          return;
        }
        if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
          setError(`비밀번호는 ${VALIDATION.PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`);
          setLoading(false);
          return;
        }
        const newUser: StoredUser = { id: crypto.randomUUID(), email, name, password };
        saveUsers([...users, newUser]);
        onAuth({ id: newUser.id, email: newUser.email, name: newUser.name });
      } else {
        const found = users.find((u) => u.email === email && u.password === password);
        if (!found) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
          setLoading(false);
          return;
        }
        onAuth({ id: found.id, email: found.email, name: found.name });
      }
      setLoading(false);
    }, MODAL_DELAY);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--background)" }}
    >
      {/* Background decoration */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,106,245,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "rgba(124,106,245,0.2)", border: "1px solid rgba(124,106,245,0.3)" }}
          >
            <LayoutDashboard className="w-6 h-6" style={{ color: "#7c6af5" }} />
          </div>
          <h1 style={{ color: "var(--foreground)", textAlign: "center" }}>나만의 칸반 보드</h1>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
            나만의 프로젝트를 관리하세요
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-6 shadow-xl"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* Tab */}
          <div
            className="flex rounded-lg p-1 mb-6"
            style={{ background: "var(--secondary)" }}
          >
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                className="flex-1 py-1.5 rounded-md text-sm transition-all"
                style={{
                  background: mode === m ? "var(--primary)" : "transparent",
                  color: mode === m ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  fontWeight: mode === m ? 600 : 400,
                }}
                onClick={() => { setMode(m); reset(); }}
              >
                {m === "login" ? "로그인" : "회원가입"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                  이름
                </label>
                <input
                  className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-colors focus:border-primary"
                  style={{
                    background: "var(--input-background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                이메일
              </label>
              <input
                type="email"
                className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-colors focus:border-primary"
                style={{
                  background: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border outline-none text-sm transition-colors focus:border-primary"
                  style={{
                    background: "var(--input-background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "6자 이상 입력" : "비밀번호 입력"}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--muted-foreground)" }}
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="px-3 py-2 rounded-lg text-xs"
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontWeight: 600,
              }}
              disabled={loading}
            >
              {loading ? "처리 중..." : mode === "login" ? "로그인" : "가입하기"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export type { User };
