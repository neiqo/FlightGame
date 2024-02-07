# Project Name: SolarQuest

Our idea is to create a gamified learning experience about our solar system where the player starts on a planet and must answer questions to gain fuel for their rockets. Each correct answer gives them more fuel which enables them to travel to the next planet.

Players win by going to each planet in the solar system and finally leaving the solar system. The players gather knowledge to answer the questions by exploring the planet they are currently on. There will be a leaderboard after the players complete the quiz that shows who has the highest correct answers.

# Design Process

We aim to create a user-friendly website that educates both young children and teenagers on the various planets in our solar system. By using eye-catching visuals and multiple sound effects, children and teenagers alike will be more interested to learn and explore the solar system. Information about planets are summarised into simple paragraphs for our target audience to easily understand the content. Furthermore, users' knowledge on planets will be tested using quizzes to ensure that they fully grasped the information before advancing to the next planet.

User Stories:

- As a young child or teenager, I want to explore the different planets in our solar system, so that I can learn more about them in an engaging and interactive way.
- As a young learner, I want to access information about each planet summarized into simple paragraphs, so that I can easily understand the key facts about them.
- As a user, I want the website to use eye-catching visuals and sound effects, so that I feel excited and motivated to explore the content about the planets.
- As a parent or educator, I want the website to be user-friendly and suitable for children and teenagers, so that I can confidently recommend it as an educational resource.
- As a user, I want to test my knowledge about the planets through quizzes, so that I can assess my understanding and retention of the information presented.
- As a young learner, I want the quizzes to be interactive and engaging, so that I can enjoy the learning process and feel rewarded for my progress.
- As a user, I want the website to provide feedback on my quiz performance, so that I can identify areas where I need to review or improve my understanding.

## Desktop wireframe:

![Desktop Wireframe](https://i.imgur.com/kASCA5O.png)

## Mobile Wireframe

![Mobile Wireframe](https://i.imgur.com/TYhnh6W.png)

### Links

[Figma Wireframe Link](https://www.figma.com/file/tm7qMkQHbXp2KdC5oLkWv8/SpaceGame?type=design&node-id=0:1&mode=design&t=8oFYuumDNhFpec1B-1)\
 [Github Pages Link](https://neiqo.github.io/SolarQuest/)

# Features

## Existing Features

- Login/ Registration Feature\
  Allows users to register their username and password and retrieves their data upon logging in to obtain their current progress.
- Class Feature\
  Allows users to learn and obtain information on the planet that they are currently on.
- Quiz Feature\
  Allows users to test their knowledge by answering questions and advance to the next planet once a certain number of questions are answered correctly.
- Leaderboard Feature\
  Allows users to see how well they fared compared to other players by looking at the leaderboard ranking.

## Features Left To Implement

- Space Game Feature\
  A different mode of game where users control their own spaceship and destroy incoming asteroids. This provides more interaction and allows users to engage more actively.
- Customise Spaceship Feature\
  A follow up to the 'Space Game Feature' where users are able to customise their own spaceship to make their experience more immersive.
- Explore Moons Feature\
A feature which enables users to explore the numerous moons within our solar system, catering to the curiosity of children and teenagers who are eager to learn more.

# Technologies Used

## Frameworks

<h3>Bootstrap</h3>
<p>
  <a href="https://getbootstrap.com/">
    <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap logo" width="200" height="165">
  </a>
</p>
Bootstrap is used to help with the development process by usinhg its ready-to-use UI components, such as button, table, etc.

## Animations

[Animista](https://animista.net/)\
Animista is used to create a more difficult animation, in our case, we used 'Flicker In' and 'Flicker Out' animations to create seamless transitions between player save data and
rotating planet.

## APIs

[Wikipedia API](https://en.wikipedia.org/w/api.php)

We leveraged Wikipedia API to access current and reliable information about the various planets in our solar system. The data will be dynamically updated on a single HTML page without the need for multiple page reloads.

[restdb.io](https://restdb.io/)

We utilized restdb.io as our database solution to store essential data including player information upon login or registration, quiz questions along with their corresponding correct answers, and the current leaderboard standings of players.

# Testing

1. Log in and Registration\
   i. Load up the index.html\
   ii. Try to submit empty username and password

# Credits

## Content

Planet information obtained from:\
[Wikipedia Mercury Planet Link](<https://en.wikipedia.org/wiki/Mercury_(planet)>)\
[Wikipedia Venus Planet Link](https://en.wikipedia.org/wiki/Venus)\
[Wikipedia Earth Planet Link](https://en.wikipedia.org/wiki/Earth)\
[Wikipedia Mars Planet Link](https://en.wikipedia.org/wiki/Mars)\
[Wikipedia Jupiter Planet Link](https://en.wikipedia.org/wiki/Jupiter)\
[Wikipedia Saturn Planet Link](https://en.wikipedia.org/wiki/Saturn)\
[Wikipedia Uranus Planet Link](https://en.wikipedia.org/wiki/Uranus)\
[Wikipedia Neptune Planet Link](https://en.wikipedia.org/wiki/Neptune)

Quiz questions generated using:\
[ChatGPT](https://chat.openai.com)

## Media

[Rotating Planet Images Link](https://planet-texture-maps.fandom.com)\
[Background Video]\
[Sound Effects]

## Acknowledgements

Concept and UI designed inspired from:\
[The Expanse (TV series)](<https://en.wikipedia.org/wiki/The_Expanse_(TV_series)>)\
[The Expanse UI Design](https://www.hudsandguis.com/home/2021/theexpanse)