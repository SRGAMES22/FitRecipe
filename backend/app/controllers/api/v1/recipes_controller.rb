module Api
  module V1
    class RecipesController < ApplicationController
      skip_before_action :authenticate_request, only: [:index, :show]

      def index
        recipes = Recipe.all
        recipes = recipes.by_calories(params[:max_calories]) if params[:max_calories].present?
        recipes = recipes.by_protein(params[:min_protein]) if params[:min_protein].present?
        recipes = recipes.by_prep_time(params[:max_prep_time]) if params[:max_prep_time].present?
        recipes = recipes.where("title ILIKE ?", "%#{params[:q]}%") if params[:q].present?

        render json: recipes.order(created_at: :desc).limit(50).map { |r| recipe_response(r) }
      end

      def show
        recipe = Recipe.find(params[:id])
        render json: recipe_response(recipe)
      end

      def create
        recipe = current_user.recipes.build(recipe_params)

        if recipe.save
          render json: recipe_response(recipe), status: :created
        else
          render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def favorite
        recipe = Recipe.find(params[:id])
        current_user.favorites.find_or_create_by(recipe: recipe)
        render json: { favorited: true }
      end

      def unfavorite
        recipe = Recipe.find(params[:id])
        current_user.favorites.where(recipe: recipe).destroy_all
        render json: { favorited: false }
      end

      def favorites
        recipes = current_user.favorited_recipes
        render json: recipes.map { |r| recipe_response(r) }
      end

      private

      def recipe_params
        params.permit(:title, :description, :ingredients, :instructions, :calories, :protein, :carbs, :fat, :prep_time, :category, :image_url)
      end

      def recipe_response(recipe)
        {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          calories: recipe.calories,
          protein: recipe.protein,
          carbs: recipe.carbs,
          fat: recipe.fat,
          prep_time: recipe.prep_time,
          category: recipe.category,
          image_url: recipe.image_url,
          favorited: current_user ? current_user.favorites.exists?(recipe_id: recipe.id) : false
        }
      end
    end
  end
end
