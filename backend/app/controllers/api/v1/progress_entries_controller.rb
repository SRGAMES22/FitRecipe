module Api
  module V1
    class ProgressEntriesController < ApplicationController
      def index
        entries = current_user.progress_entries.order(date: :desc).limit(30)
        render json: entries
      end

      def create
        entry = current_user.progress_entries.build(progress_params)

        if entry.save
          render json: entry, status: :created
        else
          render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        entry = current_user.progress_entries.find(params[:id])
        entry.destroy
        head :no_content
      end

      private

      def progress_params
        params.permit(:date, :weight, :body_fat, :notes)
      end
    end
  end
end
