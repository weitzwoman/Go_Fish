# _Go Fish Card Game_

#### _A web application for the classic card game. Suitable for all ages. Player interacts with computer opponent. Team Week Project, Intro to Programming at Epicodus 11/7/2016_

#### By _**Jonathan Thom, Michelle Llaguno, and Tracie Weitzman**_

## Specifications

#### 1. Create a shuffled deck.

#### 2. Draw five cards from the deck and show them to the user.
Input: click Start game  
Output: five cards shown

#### 3. Draw five cards for the computer and indicate to the user the computer has five mystery cards.
Output: Computer Card Count: 5

#### 4. Allow the user to ask the computer for a rank of card he/she wants (follows Go Fish standard rules and users are only allowed to ask for cards in his/her hand).

#### 4.1. If a match, card is added to user hand. User continues turn.
Input: 4
Output: 4 of Clubs added to hand

#### 4.2. If not a match, computer tells user to "Go Fish", and user draws random deck card.
Input: 4
Output: Not a match! Go Fish

#### 5. Turns are switched; computer asks user for a card.

#### 5.1. If a match, card is added to computer hand. Computer continues turn.
Input: User gives up 5
Output: Card is removed from user's hand

#### 5.2. If not a match, computer draws random deck card.
Input: Go Fish
Output: Computer draws card

#### 6. If user or computer has four of a kind in their hand, cards are considered a Book, and they get a point.
Input: Four of a kind (same rank)
Output: Book tally increases

#### 6.1 Book cards are removed from hand.

#### 7. When the deck of cards is gone, instead of Going Fish, player turn ends.

#### 8. When either player reaches seven Books, that player wins game.
Input: Book Count is 7
Output: Player Wins!

## Setup/Installation Requirements

* _Works in any web browser [click here] (https://jonathanwthom.github.io/go-fish) to view on gh-pages._

## Support and contact details

_Contact us on Github at jonathanwthom, weitzwoman, gitmichelle._

## Technologies Used

* _HTML_
* _CSS_
* _Javascript_
* _JQuery_
* _Bootstrap_


### License

_Go-Fish is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Go-Fish is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with the Go-Fish. If not, see http://www.gnu.org/licenses/._

Copyright (c) 2016 **_Jonathan Thom, Michelle Llaguno, and Tracie Weitzman_**
