import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:3000/api/v1';

export default function RecipesScreen({ navigation }: any) {
  const { user, token, logout } = useAuth();
  const { theme, themeName, setTheme } = useTheme();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecipes = async () => {
    try {
      const res = await axios.get(`${API_URL}/recipes`, { headers: { Authorization: `Bearer ${token}` } });
      setRecipes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { loadRecipes(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecipes();
    setRefreshing(false);
  };

  const cycleTheme = () => {
    const order: any[] = ['light', 'dark'];
    if (user?.subscription_type === 'weapon_x') order.push('weaponx');
    const next = order[(order.indexOf(themeName) + 1) % order.length];
    setTheme(next);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.primary }}>FitRecipe</Text>
            {user?.subscription_type === 'weapon_x' && (
              <Text style={{ fontSize: 11, color: '#e31c25', fontWeight: '600' }}>WEAPON X</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity onPress={cycleTheme}><Text style={{ color: theme.muted, fontSize: 13 }}>Tema</Text></TouchableOpacity>
            <TouchableOpacity onPress={logout}><Text style={{ color: theme.muted, fontSize: 13 }}>Sair</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}>
        {recipes.map((recipe) => (
          <TouchableOpacity key={recipe.id} onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
            style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 4 }}>{recipe.title}</Text>
            <Text style={{ color: theme.muted, fontSize: 13, marginBottom: 8 }} numberOfLines={2}>{recipe.description}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={{ fontSize: 12, color: theme.muted }}>{recipe.calories} kcal</Text>
              <Text style={{ fontSize: 12, color: theme.muted }}>P: {recipe.protein}g</Text>
              <Text style={{ fontSize: 12, color: theme.muted }}>{recipe.prep_time} min</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
