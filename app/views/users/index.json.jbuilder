json.array! @users do |user|
  json.id user.id
  json.name user.name
end

# json.ids @user.ids
# json.name @user.name
