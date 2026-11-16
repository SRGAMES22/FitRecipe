"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (id) {
      api.get(`/recipes/${id}`).then((res) => setRecipe(res.data)).catch(console.error);
    }
  }, [id]);

  if (!recipe) {
    return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
      <p style={{ color: "var(--muted)" }}>Carregando...</p>
    </div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <header className="border-b px-4 py-4" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/recipes" className="text-sm" style={{ color: "var(--muted)" }}>← Voltar</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>{recipe.title}</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>{recipe.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-2xl font-bold" style={{ color: "var(--primary)" }}>{recipe.calories}</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>kcal</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{recipe.protein}g</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Proteína</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{recipe.carbs}g</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Carbs</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{recipe.fat}g</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Gordura</p>
          </div>
        </div>

        <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Ingredientes</h2>
          <pre className="whitespace-pre-wrap text-sm" style={{ color: "var(--muted)" }}>{recipe.ingredients}</pre>
        </div>

        <div className="p-6 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Modo de preparo</h2>
          <pre className="whitespace-pre-wrap text-sm" style={{ color: "var(--muted)" }}>{recipe.instructions}</pre>
        </div>
      </main>
    </div>
  );
}
