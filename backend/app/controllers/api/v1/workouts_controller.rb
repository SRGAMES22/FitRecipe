module Api
  module V1
    class WorkoutsController < ApplicationController
      def index
        workouts = current_user.workouts.order(date: :desc).limit(30)
        render json: workouts
      end

      def create
        workout = current_user.workouts.build(workout_params)

        if workout.save
          render json: workout, status: :created
        else
          render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        workout = current_user.workouts.find(params[:id])
        workout.destroy
        head :no_content
      end

      private

      def workout_params
        params.permit(:title, :notes, :duration_minutes, :date)
      end
    end
  end
end
