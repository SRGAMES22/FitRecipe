import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:3000/api/v1';

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { recipeId } = route.params;
  const { token } = useAuth();
  const { theme } = useTheme();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    axios.get(`${API_URL}/recipes/${recipeId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setRecipe(res.data))
      .catch(console.log);
  }, [recipeId]);

  if (!recipe) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.bg }}>
        <Text style={{ color: theme.muted }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.muted, marginBottom: 8 }}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>{recipe.title}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: theme.muted, marginBottom: 16 }}>{recipe.description}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <View style={{ backgroundColor: theme.card, padding: 12, borderRadius: 12, minWidth: 70, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primary }}>{recipe.calories}</Text>
            <Text style={{ fontSize: 11, color: theme.muted }}>kcal</Text>
          </View>
          <View style={{ backgroundColor: theme.card, padding: 12, borderRadius: 12, minWidth: 70, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>{recipe.protein}g</Text>
            <Text style={{ fontSize: 11, color: theme.muted }}>Proteína</Text>
          </View>
          <View style={{ backgroundColor: theme.card, padding: 12, borderRadius: 12, minWidth: 70, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>{recipe.carbs}g</Text>
            <Text style={{ fontSize: 11, color: theme.muted }}>Carbs</Text>
          </View>
          <View style={{ backgroundColor: theme.card, padding: 12, borderRadius: 12, minWidth: 70, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>{recipe.fat}g</Text>
            <Text style={{ fontSize: 11, color: theme.muted }}>Gordura</Text>
          </View>
        </View>

        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: theme.border }}>
          <Text style={{ color: theme.text, fontWeight: '600', marginBottom: 8 }}>Ingredientes</Text>
          <Text style={{ color: theme.muted, lineHeight: 22 }}>{recipe.ingredients}</Text>
        </View>

        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border }}>
          <Text style={{ color: theme.text, fontWeight: '600', marginBottom: 8 }}>Modo de preparo</Text>
          <Text style={{ color: theme.muted, lineHeight: 22 }}>{recipe.instructions}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
