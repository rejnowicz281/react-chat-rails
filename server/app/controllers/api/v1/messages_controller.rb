class Api::V1::MessagesController < ApplicationController
  before_action :set_room

  # GET /messages
  def index
    @messages = @room.messages

    render json: @messages.map { |message| message_with_user(message) }
  end

  # GET /messages/1
  def show
    @message = @room.messages.find(params[:id])

    render json: message_with_user(@message)
  end

  # POST /messages
  def create
    @message = @room.messages.build(message_params)

    if @message.save
      render json: @message, status: :created, location: api_v1_room_message_url(@room, @message)
    else
      render json: @message.errors, status: :unprocessable_entity
    end

    RoomChannel.broadcast_to(@room, message_with_user(@message))
  end

  private
    def set_room
      @room = Room.find(params[:room_id])
    end

    def message_with_user(message)
      message.as_json(include: :user).except("user_id")
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:text, :room_id, :user_id)
    end
end
