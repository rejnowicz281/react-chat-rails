class Api::V1::RoomsController < ApplicationController
  # GET /rooms
  def index
    @rooms = Room.order(created_at: :desc)

    render json: @rooms
  end

  # GET /rooms/1
  def show
    @room = Room.find(params[:id])
    
    render json: @room.to_json(include: :messages)
  end

  # POST /rooms
  def create
    @room = Room.new(room_params)

    if @room.save
      render json: @room, status: :created, location: api_v1_room_url(@room)
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def room_params
      params.require(:room).permit(:name)
    end
end
