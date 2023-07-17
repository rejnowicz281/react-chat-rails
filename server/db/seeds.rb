# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create(name: "Test User", email: "1@gmail.com", password: "1", password_confirmation: "1")
Room.create(name: "Test Room")
Room.first.messages.create(text: "Hi!", user_id: User.first.id)