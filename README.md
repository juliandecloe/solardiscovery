![header of Solar Discovery](readme-images/header.png)

# Real-Time Web @cmda-minor-web 2021 - 2022

## Table of Contents


## Concept
Isn't space awesome? Well I think it is. That is why I made a multiplayer game where you can fly in space with your own rocket and discover planets. The solar system in this game is a real scale model of our solar system using an API that gives data about every planet and all of there moons.

[](https://solar-discovery.herokuapp.com/)

## API
The [L'OpenData du Système Solaire](https://api.le-systeme-solaire.net/en/) is a French API. Luckely they have an English page so I could still understand how to use it. This API can be called using [](https://api.le-systeme-solaire.net/rest/bodies/). It is a really simple API.

**Available data**
| #  | Name            | Type       | Content                                                                              |
|----|-----------------|------------|--------------------------------------------------------------------------------------|
| 1  | id              | string     | Id of body in the API.                                                               |
| 2  | name            | string     | Body name (in french).                                                               |
| 3  | englishName     | string     | English name.                                                                        |
| 4  | isPlanet        | boolean    | Is it a planet?                                                                      |
| 5  | moons           | array      | Table with all moons.                                                                |
| 6  | semimajorAxis   | integer    | Semimajor Axis of the body in kilometres.                                            |
| 7  | perihelion      | integer    | Perihelion in kilometres.                                                            |
| 8  | aphelion        | integer    | Aphelion in kilometres.                                                              |
| 9  | eccentricity    | decimal    | Orbital eccentricity.                                                                |
| 10 | inclination     | decimal    | Orbital inclination in degrees.                                                      |
| 11 | mass            | object     | Boby mass in 10n kg.                                                                 |
| 12 | vol             | object     | Body volume in 10n km3.                                                              |
| 13 | density         | decimal    | Body density in g.cm3.                                                               |
| 14 | gravity         | decimal    | Surface gravity in m.s-2.                                                            |
| 15 | escape          | decimal    | Escape speed in m.s-1.                                                               |
| 16 | meanRadius      | integer    | Mean radius in kilometres.                                                           |
| 17 | equaRadius      | integer    | Equatorial radius in kilometres.                                                     |
| 18 | polarRadius     | integer    | Polar radius in kilometres.                                                          |
| 19 | escape          | flattening | Flattening.                                                                          |
| 20 | dimension       | string     | Body dimension on the 3 axes X, Y et Z for non-spherical bodies.                     |
| 21 | sideralOrbit    | decimal    | Sideral orbital time for body around another one (the Sun or a planet) in earth day. |
| 22 | sideralRotation | decimal    | Sideral rotation, necessary time to turn around itself, in hour.                     |
| 23 | aroundPlanet    | object     | For a moon, the planet around which it is orbiting.                                  |
| 24 | discoveredBy    | string     | Discovery name.                                                                      |
| 25 | discoveryDate   | string     | Discovery date.                                                                      |
| 26 | alternativeName | string     | Temporary name.                                                                      |
| 27 | axialTilt       | decimal    | Axial tilt.                                                                          |
| 28 | avgTemp         | integer    | Mean temperature in K.                                                               |
| 29 | mainAnomaly     | decimal    | Mean anomaly in degree.                                                              |
| 30 | argPeriapsis    | decimal    | Argument of perihelion in degree.                                                    |
| 31 | longAscNode     | decimal    | Longitude of ascending node in degree.                                               |
| 32 | bodyType        | string     | The body type : Star, Planet, Dwarf Planet, Asteroid, Comet or Moon.                 |
