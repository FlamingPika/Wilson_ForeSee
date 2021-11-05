# ForeSee 2.0 System Requirements Specification

## 1. General
- The app should be written in React Native.
- There is no restrictions on backend/database technologies.
- Orientation should be locked to portrait.
- Android and iOS mobile phones should be supported. 
- Tablets are not targeted.
- There should be 3 languages available:
	- English
	- Traditional Chinese (TC)
	- Simplified Chinese (SC)
- There should be 2 modes corresponding to 2 different user types:
	- Family User
	- Professional User
- Family user is shared among different family members within the same family. Current member could be switched at any time.
- New family members could be added in the app.
- There should be a auth system.

## 2. Add Data
- The user should be able to add 2 types of data: Eye data and Glasses data.
- Available fields for an eye data:
	- check time
	- height

	- unaided va with close object: od & os
	- unaided va with far object: od & os
	- aided va with close object: od & os
	- aided va with far object: od & os
		- values for va:
			- 6/4.5
			- 6/6
			- 6/9
			- 6/12
			- 6/15
			- 6/20
			- 6/30
			- 6/60
		- va do not have units.

	- sph: od & os. Range [8.00, -14.00] with step of -0.25. no units.
	- cyl: od & os. Range [8.00, -8.00] with step of -0.25. no units.
	- axis: od & os. Range [0, 180] with step of +10. unit: ° (degrees)
	- pd: Range in [0, 60] with step of +1. unit: mm

	<br>
- Available fields for an Glasses data:
	- check time
	- glasses name
	- sph: od & os. Range [8.00, -14.00] with step of -0.25. no units.
	-	cyl: od & os. Range [8.00, -8.00] with step of -0.25. no units.
	- axis: od & os. Range [0, 180] with step of +10. unit: ° (degrees)
	- pd: Range [0, 60] with step of +1. unit: mm

	<br>
- The input method of check time should be a date picker.
- The input method of height / glasses name should be a text input field.
- The input method of va, sph, cyl, axis, and pd should be a vertical slider.
- All the inputs, except date, should be skippable (nullable).
- There should be an edit data screen for the user confirm their eye data input values.
- The user should be able to edit individual input values by clicking on the values in edit data page. A new slider screen should show up for the user to edit the selected value.
- Eye data should be stored in a cloud database.
- The user should be able to edit existing eye data or glasses data.
- Professional users can create a connection with a family user through scanning family user's QR code.
- Professional users are allowed to add eye data for linked family Users.
- Professional users are allowed to add new members for linked family Users.
	- Verification from the family user is required to add a new member. This should be done using a one-time password, which is generated on the family user side.
- Professional users should be able to view all eye data of all members of linked family users.

## 3. Graphs
- There should be a compounded line graph on home page, which consist of myopia, hyperopia, and astigmatism curves in the same graph.
- There should be 3 line graphs showing myopia, hyperopia, astigmatism separately.
- There should be a detailed graph for myopia, hyperopia, and astigmatis. The graph shows the curve and all data points. The user should be able to select any data point on the graph.
- There should be a graph showing comparsions of the eye status of the current user to that of the population.
- Graphs should display eye data of one eye at a time. There should be buttons allowing the user to switch between using data of left eye, or right eye.

## 4. QnA
- Family user should be able to ask question. 
- There should be 5 question tags available:
	- Eye Health
	- Eye Check
	- Tips
	- New Born
	- Screen Time
- Each question could be associated with 0 or more tags.
- Family users should be able to view question asked by other users, once it has been approved and answered.
- Family users are unable to view unanswered or to-be-approved questions.
- Questions shown in the question list could be filtered based on the selected tags.
- Professional user should be able to answer questions asked by family users.
- Professional user could only view unanswered and approved questions.

## 5. Articles
- Articles are stored in a cloud database.
- An article should have an image, title, and a body.
- Family user could save an article.
- Family user could view the list of saved articles
- Total number of saved articles should be available to the user.
- User could obtain badges based on their activity related to eye articles.

## 6. Eye Exercise
- There should be 4 variations of eye exercise:
	-	20-20-20 rule
	- Blink break
	- Palms
	- Figure 8
- Exercise records are saved in the database. A record should include the following fields:
	- date
	- elapsed time
	- exercise type
- The list of exercise record could be viewed the user.
- A exercise streaks number should be available to the user.
- There should be a bar chart showing the frequencies of each 4 of the eye exercises completed by the user.
- User could obtain badges based on their activity related to eye exercise.



