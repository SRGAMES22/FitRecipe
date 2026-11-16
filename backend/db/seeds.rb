puts "Criando usuário de demonstração..."

user = User.find_or_create_by!(email: "demo@fitrecipe.app") do |u|
  u.name = "Demo Weapon X"
  u.password = "123456"
  u.password_confirmation = "123456"
  u.subscription_type = :weapon_x
end

puts "Usuário criado: #{user.email} / senha: 123456"

if Recipe.count.zero?
  recipes_data = [
    {
      title: "Frango Grelhado com Batata Doce",
      description: "Refeição alta em proteína, perfeita pós-treino.",
      ingredients: "200g peito de frango\n150g batata doce\n1 colher azeite\nSal, pimenta e alho",
      instructions: "1. Tempere o frango\n2. Grelhe 6-7 min cada lado\n3. Asse a batata doce\n4. Sirva",
      calories: 420,
      protein: 42,
      carbs: 35,
      fat: 10,
      prep_time: 25,
      category: "Almoço"
    },
    {
      title: "Omelete de Claras com Espinafre",
      description: "Café da manhã leve e proteico.",
      ingredients: "4 claras\n1 ovo inteiro\n1 xícara espinafre\nSal e orégano",
      instructions: "1. Bata os ovos\n2. Refogue o espinafre\n3. Faça o omelete",
      calories: 180,
      protein: 22,
      carbs: 4,
      fat: 8,
      prep_time: 10,
      category: "Café da manhã"
    },
    {
      title: "Shake de Whey com Banana",
      description: "Rápido e prático para ganho de massa.",
      ingredients: "1 scoop whey\n1 banana\n200ml leite desnatado\nGelo",
      instructions: "Bata tudo no liquidificador.",
      calories: 310,
      protein: 30,
      carbs: 32,
      fat: 4,
      prep_time: 5,
      category: "Snack"
    },
    {
      title: "Salmão com Aspargos",
      description: "Rico em ômega-3 e baixo carboidrato.",
      ingredients: "180g salmão\n10 aspargos\nAzeite, limão e ervas",
      instructions: "1. Tempere o salmão\n2. Asse 15 min\n3. Grelhe os aspargos",
      calories: 380,
      protein: 36,
      carbs: 6,
      fat: 22,
      prep_time: 20,
      category: "Jantar"
    },
    {
      title: "Bowl de Aveia Proteico",
      description: "Ideal para o café da manhã ou pré-treino.",
      ingredients: "40g aveia\n1 scoop whey\n100ml leite\nFrutas vermelhas",
      instructions: "Misture tudo e deixe hidratar 5 minutos.",
      calories: 340,
      protein: 28,
      carbs: 38,
      fat: 6,
      prep_time: 5,
      category: "Café da manhã"
    }
  ]

  recipes_data.each { |data| Recipe.create!(data) }
end

if user.workouts.count.zero?
  user.workouts.create!([
    { title: "Treino de Peito e Tríceps", duration_minutes: 55, date: Date.today - 1, notes: "Supino 4x10, Crucifixo, Tríceps pulley" },
    { title: "Pernas completo", duration_minutes: 70, date: Date.today - 3, notes: "Agachamento, Leg press, Stiff" }
  ])
end

if user.progress_entries.count.zero?
  user.progress_entries.create!([
    { date: Date.today - 14, weight: 78.5, body_fat: 18.2 },
    { date: Date.today - 7, weight: 77.8, body_fat: 17.6 },
    { date: Date.today, weight: 77.2, body_fat: 17.1 }
  ])
end

puts "Seeds finalizados!"
puts "Login: demo@fitrecipe.app / 123456 (plano Weapon X)"
