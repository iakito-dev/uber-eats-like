module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      # GET /api/v1/line_foods
      def index
        # N+1回避のため関連を先読み
        line_foods = LineFood.active.includes(:restaurant, :food)

        return head :no_content unless line_foods.exists?

        render json: {
          line_food_ids: line_foods.pluck(:id),
          restaurant: line_foods.first.restaurant.slice(:id, :name, :fee, :time_required),
          count: line_foods.sum(:count),
          amount: line_foods.joins(:food).sum("line_foods.count * foods.price")
        }, status: :ok
      end

      # POST /api/v1/line_foods
      def create
        count = count_param
        return render json: { error: "count must be a positive integer" }, status: :unprocessable_entity if count.nil? || count <= 0

        # 現在のカート（active）に別レストランのアイテムがある場合は 406
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            existing_restaurant: LineFood.active.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: @ordered_food.restaurant.name
          }, status: :not_acceptable
        end

        set_line_food(@ordered_food, count)

        if @line_food.save
          render json: { line_food: @line_food }, status: :created
        else
          render json: { error: "failed to save line_food" }, status: :internal_server_error
        end
      end

      # PUT /api/v1/line_foods/replace
      def replace
        count = count_param
        return render json: { error: "count must be a positive integer" }, status: :unprocessable_entity if count.nil? || count <= 0

        ActiveRecord::Base.transaction do
          # 別レストランの active なカートアイテムを一括無効化（1クエリ）
          LineFood.active.other_restaurant(@ordered_food.restaurant.id).update_all(active: false)

          # 該当 food の line_food を加算 or 新規
          set_line_food(@ordered_food, count)

          @line_food.save! # 失敗時は例外→ロールバック
        end

        render json: { line_food: @line_food }, status: :created
      rescue => _
        render json: { error: "failed to replace cart" }, status: :internal_server_error
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "food not found" }, status: :not_found
      end

      # count を安全に整数化（不正なら nil）
      def count_param
        Integer(params[:count]) rescue nil
      end

      # 既存 line_food があれば数量加算して active 化、無ければ新規作成
      def set_line_food(ordered_food, count)
        if (existing = ordered_food.line_food).present?
          @line_food = existing
          @line_food.assign_attributes(
            count: existing.count + count,
            active: true
          )
        else
          @line_food = ordered_food.build_line_food(
            count: count,
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
