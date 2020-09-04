# Hogwarts API

A wrapper from [Potter API](https://potterapi.com/) using MongoDB as persistence.

## Getting ready
### Installing

- Clone this project: `git clone https://github.com/JonathanCotta/hogwarts-api.git`

-  Install all necessary packages: `npm i`

### Setting up environment
 To run properly this project need some environment variables those are listed below:

|Name          | description                                          | values
|--------------|------------------------------------------------------|--------------------------------|
| PORT         |  application port address                            | 10082                          |
| ENV          | Describes the ambient that's running on              | dev                            |
| HOGWARTS_API | access token to [Potter API](https://potterapi.com/) | You need one Potter API token  |
| MONGO_URI    | Connection URI to a mongo database                   | MongoDB connection URI         |

- Configuring to run with Visual Studio Code
		 - Just put those environment variables in ***env*** property at ***launch.json*** file at ***.vscode*** folder
 - Configuring Tests
		 - For running automated tests you will need to put ***HOGWARTS_API*** and ***MONGO_URI*** in a ***.env*** file in the project main folder

## Testing
The project is already shipped with some tests that you can run with the commands below:

- To properly run the test use: `npm run test`
- To run test and see code coverage use: `npm run test:coverage`

## Building
Run the following command to build the project into ***dist*** folder for production: `npm run build`

## Serving
To run into production use the following command: `npm run serve`

## Models

### Character

| Property   |  Type  |  Required   | valid values                                        |
|--------------|--------|-------------|-----------------------------------------------------|
|  name        | string |  yes        |                                                     |
|  house       | string |  no         | Only houses Ids                                     |
|  patronous   | string |  no         |                                                     |
|  species     | string |  yes        |                                                     |
|  bloodStatus | string |  no         | 'pure-blood', 'half-blood', 'muggle-born', 'unknown'|
|  role        | string |  yes        |                                                     |
|  school      | string |  no         |                                                     |
|  deathEater  | boolean |  no        |                                                     |
|  dumbledoresArmy | boolean | no     |                                                     |
|  orderOfThePhoenix | boolean | no   |                                                     |
|  ministryOfMagic | boolean | no     |                                                     |
|  alias       | string | no          |                                                     |
|  wand        | string |  no         |                                                     |
|  boggart     | string |  no         |                                                     |
|  animagus    | string |  no         |

## API Resources

### Response and Request Formats
The default API format is JSON `application/json` and PUT or POST requests.


 ### All Routes
All routes need to be prefixed with  `/hogwarts/v1/`

 ### Characters Routes
 `POST /character` - Create a new character, requires a valid character model as JSON in the request body.

 `PUT /character/{characterId}` - Update a character with matching id,  requires a valid character model as JSON in the request body,

`GET /character/{characterId}` - Returns character with matching id.

`DELETE /character/{characterId}` - Removes a character with matching id.

`GET /characters` - return all characters
##### URL Query Parameters

| Parameter    |  Type  |  Valid values                                                   |
|--------------|--------|-----------------------------------------------------------------|
|  name        | string |                                                                 |
|  house       | string | Gryffindor, Ravenclaw, Slytherin and Hufflepuff or their **Id** |
|  patronous   | string |                                                                 |
|  species     | string |                                                                 |
|  bloodStatus | string | pure-blood, half-blood, muggle-born, unknow                     |
|  role        | string |                                                                 |
|  school      | string |                                                                 |
|  deathEater  | boolean |                                                                |
|  dumbledoresArmy | boolean |                                                            |
|  orderOfThePhoenix | boolean |                                                          |
|  ministryOfMagic | boolean |                                                            |
|  alias       | string |                                                                 |
|  wand        | string |                                                                 |
|  boggart     | string |                                                                 |
|  animagus    | string |                                                                 |


 ### Houses Routes
`GET /house/{characterId}` - returns character with matching character id.

`GET /houses` - return all characters

## License
This project uses the [MIT](https://github.com/JonathanCotta/hogwarts-api/blob/master/LICENSE.md) license.