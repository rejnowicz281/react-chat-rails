class Api::V1::RegistrationsController < ApplicationController
    def create
        user = User.create!(
            name: params['name'],
            email: params['email'],
            password: params['password'],
            password_confirmation: params['password_confirmation']
        )

        if user
            session[:user_id] = user.id
            render json: { status: :created, user: user }
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end
end
