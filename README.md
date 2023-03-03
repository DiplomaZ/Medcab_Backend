# Back-End

MedCab is a cannabis strain recommendation engine that suggests strains based on user preferences and symptoms. The MedCab backend is a RESTful API built with Flask, SQLAlchemy, and PostgreSQL. The API provides endpoints for user authentication, profile management, and strain recommendations.



## Schema

#### Users

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_                         |

#### Flavors

| Field  | Type    | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| flavor | string  | _required_ and _unique_            |

#### Effects

| Field  | Type    | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| effect | string  | _required_ and _unique_            |

#### Lists

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| userId   | string  | _required_                         |
| listName | string  | _required_                         |

#### List_Flavors

| Field     | Type    | Notes                          |
| --------- | ------- | ------------------------------ |
| flavor_id | integer | \_required\* and _primary key_ |
| list_id   | string  | \_required\* and _primary key_ |

#### List_Effects

| Field     | Type    | Notes                        |
| --------- | ------- | ---------------------------- |
| effect_id | integer | _required_ and _primary key_ |
| list_id   | integer | _required_ and _primary key_ |

#### List_Descriptions

| Field           | Type    | Notes                        |
| --------------- | ------- | ---------------------------- |
| userDescription | string  | _required_ and _primary key_ |
| list_id         | integer | _required_ and _primary key_ |

#### Saved_Recommendations

| Field   | Type    | Notes                              |
| ------- | ------- | ---------------------------------- |
| id      | integer | _primary key_ and _autoincrements_ |
| user_id | integer | _primary key_                      |
| strain  | string  | _required_                         |

## API

BASE URL: https://bw-medcab-8.herokuapp.com
test account:

```json
{
  "username": "user1",
  "password": "password",
  "email": "anyemail1@email.com"
}
```

#### Table of Contents

| Type   | Path                                 | Notes                                       |
| ------ | ------------------------------------ | ------------------------------------------- |
| POST   | `/auth/register`                     | register a new user                         |
| POST   | `/auth/login`                        | login an existing user                      |
| POST   | `/profile/recs/save-rec`             | save a returned recommendation              |
| POST   | `/profile/add-list`                  | save a new list                             |
| PUT    | `/profile/change-password`           | change user password                        |
| PUT    | `/profile/update-list`               | replace list preferences                    |
| GET    | `/profile`                           | view profile                                |
| GET    | `/profile/lists`                     | view all lists associated with user         |
| GET    | `/profile/recommendations/:listName` | view recommendations                        |
| GET    | `/profile/recs/saved-recs`           | view user-saved recommendations             |
| GET    | `/profile/preferences`               | view saved preferences for specific list    |
| GET    | `/profile/lists`                     | Get all profiles/lists associated with user |
| GET    | `/traits/effects`                    | get all effects in database                 |
| GET    | `/traits/flavors`                    | get all flavors in database                 |
| DELETE | `/profile/delete-user`               | delete currently logged in user (via jwt)   |
| DELETE | `/profile/recs/del-rec`              | delete single recommendation from server    |
| DELETE | `/profile/delete-list`               | delete list from server                     |

## Examples

#### POST /auth/register

request data:

```json
{
  "email": "username@email.com",
  "password": "password",
  "username": "Name"
}
```

response data:

```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "email": "username@email.com",
    "username": "Name"
  },
  "authorization": "really.long.token"
}
```

#### POST auth/login

request data:

```json
{
  "username": "user1",
  "password": "password"
}
```

response data:

```json
{
  "user": {
    "id": 1,
    "email": "username@email.com",
    "username": "Name"
  },
  "authorization": "really.long.token"
}
```

#### POST profile/add-list

request data:

```json
{
  "listName": "Sleepy",
  "flavors": ["Apple", "Coffee"],
  "effects": ["Happy", "Uplifted"],
  "description": "Optional user-provided description"
}
```

response data:

```json
{
  "message": "you just CREATED list: Sleepy, user2 ",
  "recommendations": [
    {
      "Description": "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
      "Effects": "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
      "Flavor": "Flowery,Citrus,Pungent",
      "Rating": 4.5,
      "Strain": "Qush",
      "Type": "indica"
    },
    {
      "Description": "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
      "Effects": "Focused,Tingly,Happy,Uplifted,Creative",
      "Flavor": "Citrus,Lemon,Berry",
      "Rating": 4.8,
      "Strain": "Venus-Og",
      "Type": "hybrid"
    },
    {
      "Description": "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
      "Effects": "Happy,Focused,Giggly,Relaxed,Uplifted",
      "Flavor": "Earthy,Flowery,Pungent",
      "Rating": 4.2,
      "Strain": "King-Kong",
      "Type": "hybrid"
    },
    {
      "Description": "The indica-dominant Enigma strain is as mysterious as its name makes it sound; not much is known about its origins, but Enigma is a long-lasting euphoric strain with earthy and tangy flavors. The natural progression of its effects begins with carefree happiness and ends in a sleepy haze. Enigma is a great strain for patients experiencing appetite loss and/or cachexia.",
      "Effects": "Relaxed,Happy,Sleepy,Giggly,Euphoric",
      "Flavor": "Citrus,Pungent,Flowery",
      "Rating": 4.6,
      "Strain": "Enigma",
      "Type": "indica"
    },
    {
      "Description": "This strain has quite a few myths circulating about its original appearance. It blew up in San Diego before spreading to the rest of the West Coast. Afghani Bullrider is pretty to look at, with light green buds covered in orange hair, and has a strong sweet and sour smell with some piney freshness. This strain is a heavy hitter that delivers a strong body without the full sedative effects some indicas can have; it heads straight to the brain and may boost creative thoughts while providing physical relaxation. With its high levels of THC and CBD, Afghani Bullrider is recommended for chronic pain, insomnia, and anxiety.",
      "Effects": "Focused,Uplifted,Happy,Creative,Relaxed",
      "Flavor": "Lemon,Citrus,Sweet",
      "Rating": 4.4,
      "Strain": "Afgahni-Bullrider",
      "Type": "indica"
    }
  ]
}
```

#### POST profile/recs/save-rec

request data:

```json
{
  "strain": "Big time weeds"
}
```

response data:

```json{
       "message": "Okay, ${user}, you just saved a ${strain} w33d.",
      "response": "1",
        }

```

#### PUT /profile/change-password

(include auth token in headers)
request data:

```json
{
  "password": "newPassword"
}
```

response data:

```json
{
  "message": "YOU JUST UPDATED YOUR PASSWORD, ${user}, GOOD JOB!",
  "pwres": "int"
}
```

#### PUT /profile/update-list

(include auth token in headers)
request data:

```json
{
  "listName": "Sleepy",
  "flavors": ["Apple", "Coffee"],
  "effects": ["Happy", "Uplifted"],
  "description": "Optional user-provided description"
}
```

response data:

```json
{
  "message": "you just UPDATED list: Sleepy, user2 ",
  "recommendations": [
    {
      "Description": "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
      "Effects": "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
      "Flavor": "Flowery,Citrus,Pungent",
      "Rating": 4.5,
      "Strain": "Qush",
      "Type": "indica"
    },
    {
      "Description": "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
      "Effects": "Focused,Tingly,Happy,Uplifted,Creative",
      "Flavor": "Citrus,Lemon,Berry",
      "Rating": 4.8,
      "Strain": "Venus-Og",
      "Type": "hybrid"
    },
    {
      "Description": "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
      "Effects": "Happy,Focused,Giggly,Relaxed,Uplifted",
      "Flavor": "Earthy,Flowery,Pungent",
      "Rating": 4.2,
      "Strain": "King-Kong",
      "Type": "hybrid"
    },
    {
      "Description": "The indica-dominant Enigma strain is as mysterious as its name makes it sound; not much is known about its origins, but Enigma is a long-lasting euphoric strain with earthy and tangy flavors. The natural progression of its effects begins with carefree happiness and ends in a sleepy haze. Enigma is a great strain for patients experiencing appetite loss and/or cachexia.",
      "Effects": "Relaxed,Happy,Sleepy,Giggly,Euphoric",
      "Flavor": "Citrus,Pungent,Flowery",
      "Rating": 4.6,
      "Strain": "Enigma",
      "Type": "indica"
    },
    {
      "Description": "This strain has quite a few myths circulating about its original appearance. It blew up in San Diego before spreading to the rest of the West Coast. Afghani Bullrider is pretty to look at, with light green buds covered in orange hair, and has a strong sweet and sour smell with some piney freshness. This strain is a heavy hitter that delivers a strong body without the full sedative effects some indicas can have; it heads straight to the brain and may boost creative thoughts while providing physical relaxation. With its high levels of THC and CBD, Afghani Bullrider is recommended for chronic pain, insomnia, and anxiety.",
      "Effects": "Focused,Uplifted,Happy,Creative,Relaxed",
      "Flavor": "Lemon,Citrus,Sweet",
      "Rating": 4.4,
      "Strain": "Afgahni-Bullrider",
      "Type": "indica"
    }
  ]
}
```

#### GET /profile

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "welcome to your secret page, ${user} "
}
```

#### GET /profile/lists

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "better data shapes, happier users. Wouldn't you say, user2? :)",
  "resObj": {
    "Sleepy": {
      "effects": [
        "Creative",
        "Energetic",
        "Tingly",
        "Euphoric",
        "Relaxed",
        "Uplifted"
      ],
      "flavors": ["Earthy", "Sweet", "Citrus", "Flowery", "Violet", "Sage"],
      "description": ["don't"]
    },
    "Creative": {
      "effects": [
        "Tingly",
        "Relaxed",
        "Aroused",
        "Happy",
        "Uplifted",
        "Hungry",
        "Talkative",
        "None"
      ],
      "flavors": [
        "Citrus",
        "Violet",
        "Diesel",
        "Spicy/Herbal",
        "Sage",
        "Woody",
        "Apricot",
        "Grapefruit"
      ],
      "description": ["stop"]
    },
    "Couch": {
      "effects": ["Talkative", "None"],
      "description": ["me"]
    }
  }
}
```

#### GET /profile/recommendations/:listName

response data:

```json
{
  "message": "herez yer weeeds ",
  "recommendations": [
    {
      "Description": "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
      "Effects": "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
      "Flavor": "Flowery,Citrus,Pungent",
      "Rating": 4.5,
      "Strain": "Qush",
      "Type": "indica"
    },
    {
      "Description": "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
      "Effects": "Focused,Tingly,Happy,Uplifted,Creative",
      "Flavor": "Citrus,Lemon,Berry",
      "Rating": 4.8,
      "Strain": "Venus-Og",
      "Type": "hybrid"
    },
    {
      "Description": "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
      "Effects": "Happy,Focused,Giggly,Relaxed,Uplifted",
      "Flavor": "Earthy,Flowery,Pungent",
      "Rating": 4.2,
      "Strain": "King-Kong",
      "Type": "hybrid"
    },
    {
      "Description": "The indica-dominant Enigma strain is as mysterious as its name makes it sound; not much is known about its origins, but Enigma is a long-lasting euphoric strain with earthy and tangy flavors. The natural progression of its effects begins with carefree happiness and ends in a sleepy haze. Enigma is a great strain for patients experiencing appetite loss and/or cachexia.",
      "Effects": "Relaxed,Happy,Sleepy,Giggly,Euphoric",
      "Flavor": "Citrus,Pungent,Flowery",
      "Rating": 4.6,
      "Strain": "Enigma",
      "Type": "indica"
    },
    {
      "Description": "This strain has quite a few myths circulating about its original appearance. It blew up in San Diego before spreading to the rest of the West Coast. Afghani Bullrider is pretty to look at, with light green buds covered in orange hair, and has a strong sweet and sour smell with some piney freshness. This strain is a heavy hitter that delivers a strong body without the full sedative effects some indicas can have; it heads straight to the brain and may boost creative thoughts while providing physical relaxation. With its high levels of THC and CBD, Afghani Bullrider is recommended for chronic pain, insomnia, and anxiety.",
      "Effects": "Focused,Uplifted,Happy,Creative,Relaxed",
      "Flavor": "Lemon,Citrus,Sweet",
      "Rating": 4.4,
      "Strain": "Afgahni-Bullrider",
      "Type": "indica"
    }
  ]
}
```

#### GET /profile/recs/saved-recs

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "Okay, ${user}, here are your saved recommendations",
  "recs": [
    { "strain": "strain1" },
    { "strain": "strain2" },
    { "strain": "strain3" }
  ]
}
```

#### GET /profile/preferences

(include auth token in headers)
request data:

```json
{
  "listName": "Pass List Name Here (Case Sensitive)"
}
```

response data:

```json
{
  "message": "arr user2, here be your prefs for list ${Pass List Name Here}",
  "flavors": [
    {
      "flavor": "Grapefruit"
    },
    {
      "flavor": "Orange"
    }
  ],
  "effects": [
    {
      "effect": "None"
    },
    {
      "effect": "Giggly"
    }
  ],
  "description": "Depression and Anxiety",
  "listId": 6
}
```

#### GET /traits/preferences

response data:

```json
{
  "message": "here are the effects",
  "effects": [
    {
      "id": 1,
      "effect": "exampleEffect1"
    },
    {
      "id": 2,
      "effect": "exampleEffect2..."
    }
  ]
}
```

#### GET /traits/flavors

response data:

```json
{
  "message": "here are the flavors",
  "effects": [
    {
      "id": 1,
      "effect": "exampleFlavor1"
    },
    {
      "id": 2,
      "effect": "exampleFlavor2..."
    }
  ]
}
```

#### DELETE /profile/delete-user

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "YOU JUST DELETED ${user}, be sure to delete the token from memory"
}
```

#### DELETE /profile/recs/del-rec

(include auth token in headers)
request data:

```json
{
  "strain": "Big time weeds"
}
```

response data:

```json
{
  "message": "Okay, ${user}, you just deleted ${strain} from your recommendations"
}
```

#### DELETE /profile/delete-list

(include auth token in headers)
request data:

```json
{
  "listName": "programatically provide the list name here (Just the raw string)"
}
```

response data:

```json
{
  "message": "You just deleted list: (List name here)"
}
```
