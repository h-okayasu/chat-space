json.body @message.body
json.image @message.image
json.name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")

# ここで@messageが持つparamsの情報をjsonの形式に代入している
