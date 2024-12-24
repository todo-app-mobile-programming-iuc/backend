# User
## login
curl --location 'https://backend.ahmetcanisik5458675.workers.dev/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "a@a.com",
    "password":"123"
}'

# entrance

## get entrance by id or get ALL
curl --location 'https://backend.ahmetcanisik5458675.workers.dev/entrance' \
--header 'Authorization: Bearer token' \
--header 'id: ALL'
(if id is ALL, gets all entrances. If id is a number, gets the entrance with that id)

## create entrance
curl --location 'https://backend.ahmetcanisik5458675.workers.dev/entrance/create' \
--header 'Authorization: Bearer token' \
--header 'Content-Type: application/json' \
--data '{
    "facility_id": 1,
    "cage_name": "M2",
    "count": 31817,
    "unit_mass": 62.0,
    "from_place": "Çankırı",
    "from_cage": "M1",
    "is_local": "YERLİ",
    "date_in": "11/1/2024"
    }'

## update entrance
curl --location --request PUT 'https://backend.ahmetcanisik5458675.workers.dev/entrance/update' \
--header 'Authorization: Bearer token' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "unit_mass": 62.00,
    "count": 46247

}'

## delete entrance
curl --location --request DELETE 'https://backend.ahmetcanisik5458675.workers.dev/entrance/delete' \
--header 'Authorization: Bearer token' \
--header 'Content-Type: application/json' \
--data '{
    "id": 2
}'


# Growth
## get all growths
curl --location 'https://backend.ahmetcanisik5458675.workers.dev/growth/all' \
--header 'Authorization: Bearer token'

## create growth
curl --location 'https://backend.ahmetcanisik5458675.workers.dev/growth/create' \
--header 'Authorization: Bearer token' \
--header 'Content-Type: application/json' \
--data '{
    "cage": 1,
    "deadCount": 100,
    "feed": 200,
    "harvestCount": 2
    }'