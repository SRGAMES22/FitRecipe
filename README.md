# FitRecipe 🥗💪

**Receitas Saudáveis + Tracking de Treinos e Macros**  
Biblioteca de receitas com cálculo de macros + registro de treinos e progresso físico.

[![GitHub](https://img.shields.io/badge/GitHub-SRGAMES22%2FFitRecipe-blue?logo=github)](https://github.com/SRGAMES22/FitRecipe)

---

## Stack

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Backend    | Ruby on Rails 7.2 (API) + PostgreSQL + JWT |
| Web        | Next.js 14 (App Router) + Tailwind CSS  |
| Mobile     | React Native (Expo)                     |
| Temas      | Light / Dark / **Weapon X** (pago)      |

---

## Funcionalidades

- Biblioteca de receitas com busca e filtros
- Macros detalhados (calorias, proteína, carbs, gordura)
- Tempo de preparo
- Favoritos (endpoints prontos)
- Registro de treinos
- Progresso físico (peso / body fat)
- **3 Temas**: Light / Dark / **Weapon X** (vermelho + dourado estilo Deadpool & Wolverine)

---

## Como rodar

### Backend
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s -p 3000
```

**Usuário demo:**  
`demo@fitrecipe.app` / `123456` (plano **Weapon X** ativado)

### Web (Next.js)
```bash
cd web
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

---

## Status

✅ Backend completo (Auth, Recipes, Favorites, Workouts, Progress)  
✅ Web (Next.js) com Login + Lista de receitas + Detalhe da receita + Theme Switcher  
✅ Mobile com Login + Lista + Detalhe + temas  
✅ Tema **Weapon X** exclusivo para plano pago  
✅ Seeds com 5 receitas + treinos + progresso de exemplo  

---

Feito por **[SRGAMES22](https://github.com/SRGAMES22)**
