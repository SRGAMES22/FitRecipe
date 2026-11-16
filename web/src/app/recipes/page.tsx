"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";

export default function RecipesPage() {
  const { user, loading, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) loadRecipes();
  }, [user]);

  const loadRecipes = async (q = "") => {
    try {
      const res = await api.get("/recipes", { params: { q } });
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadRecipes(search);
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
      <p style={{ color: "var(--muted)" }}>Carregando...</p>
    </div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <header className="border-b sticky top-0 z-10" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{ color: "var(--primary)" }}>FitRecipe</h1>
            {user.subscription_type === "weapon_x" && (
              <span className="text-xs px-2 py-1 rounded-full font-medium text-white" style={{ backgroundColor: "#e31c25" }}>WEAPON X</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
              <button onClick={() => setTheme("light")} className="px-2 py-1 text-xs rounded" style={{ color: "var(--text)" }}>Light</button>
              <button onClick={() => setTheme("dark")} className="px-2 py-1 text-xs rounded" style={{ color: "var(--text)" }}>Dark</button>
              <button onClick={() => user.subscription_type === "weapon_x" && setTheme("weaponx")}
                disabled={user.subscription_type !== "weapon_x"}
                className="px-2 py-1 text-xs rounded disabled:opacity-40" style={{ color: "var(--text)" }}>Weapon X</button>
            </div>
            <button onClick={logout} className="text-sm" style={{ color: "var(--muted)" }}>Sair</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <form onSubmit={handleSearch} className="mb-6 flex gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar receitas..."
            className="flex-1 px-4 py-3 rounded-xl border focus:outline-none"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />
          <button type="submit" className="px-5 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "var(--primary)" }}>Buscar</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}
              className="p-5 rounded-2xl transition hover:scale-[1.02]" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{recipe.title}</h3>
              <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--muted)" }}>{recipe.description}</p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full" style={{ backgroundColor: "var(--bg)", color: "var(--muted)" }}>{recipe.calories} kcal</span>
                <span className="px-2 py-1 rounded-full" style={{ backgroundColor: "var(--bg)", color: "var(--muted)" }}>P: {recipe.protein}g</span>
                <span className="px-2 py-1 rounded-full" style={{ backgroundColor: "var(--bg)", color: "var(--muted)" }}>{recipe.prep_time} min</span>
              </div>
            </Link>
          ))}
        </div>

        {recipes.length === 0 && (
          <p className="text-center py-16" style={{ color: "var(--muted)" }}>Nenhuma receita encontrada</p>
        )}
      </main>
    </div>
  );
}
