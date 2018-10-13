FactoryGirl.define do
  factory :message do
    body     Faker::Lorem.sentence
    image    File.open("#{Rails.root}/public/image/eyes.jpg")
    user
    group
  end
end
