json.body         @message.body
json.name         @message.user.name
json.created_at   @message.created_at.to_s(:datetime)
json.image        @message.image.url
json.id           @message.id
