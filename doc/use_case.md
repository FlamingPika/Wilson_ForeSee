# ForeSee 2.0 Use Case Specification

This specification listed the possible use cases of the app.

<br>

## <u>Use Case: Signin</u>

A user with a valid user account can signin the app.

### Pre-conditions

The user should be at the signin screen

### Basic Flow

1. The user enter the email address and the password of the account by typing into the text input.
2. The user press the proceed button to confirm.
3. The system authenticate the credentials of the user.
4. Upon success, the user is redirected to the home screen.

### Alternative Flow 1

3.1 - If the authentication fails, the user will be prompted with a error message. The use case resumes at step 1.

<br>

## <u>Use Case: Signup</u>

A user without a user account can signup a new account.

### Pre-conditions

The user should be at the signin screen

### Basic Flow

1. The user press the signup text at the bottom of the screen.
2. The user is redirected to the signup screen.
3. The user enter the email address, password, and a family name.
4. The user press the proceed button to confirm.
5. The system validate the inputs.
6. If the signup process is successful, the user is redirected to the home screen.

### Alternative Flow 1

5.1 - If the validation fails, the user will be prompted with an error message. This could happen if there exist an user account with the same email address. The use case resumes at step 3.

<br>

## <u>Use Case: Add Eye Data</u>

A Family user can record a family member's eye check data in our database.

### Pre-conditions

The user should be at the detailed graph screen.

### Basic Flow

1. The user press the add data button.
2. The user is redirected to the add data screen.
3. The user enters the check date and the user's height with a date picker and a text input, respectively.
4. The user enters values for vau, vaa, sph, cyl, axis, and pd with a vertical slider.
5. The user is redirected to a edit data screen.
6. The user checks the inputted values.
7. The user press the confirm button.
8. The system sends the eye data to the database.

### Alternative Flow 1

4.1 - The user is allowed to skip one or more eye data fields. The user could do so by pressing the skip button at the bottom-right.

### Alternative Flow 2

6.1 - The user is allowed to edit any entry of the inputted data, by pressing the arrow icon located at the right of an entry.
6.2 - The user is redirected to a edit data screen, in which the value of the selected field could be edited.
6.3 - The user press the done button to confirm any changes, and returns to the edit data screen. The use case resumes at step 6.

<br>

## <u>Use Case: Add Glasses Data</u>

A Family user can record a family member's new glasses data in our database.

### Pre-conditions

The user should be at the detailed graph screen.

### Basic Flow

1. The user press the view glasses button.
2. The system shows a popup containing the list of existing glasses, along with a add glasses button at the bottom.
3. The user press the add glasses button.
4. The user is redirected to the add glasses screen.
5. The user enters the check date and a glasses name with a date picker and a text input, respectively.
6. The user enters values for sph, cyl, and axis with a vertical slider.
7. The user is redirected to a edit data screen.
8. The user checks the inputted values.
9. The user press the confirm button.
10. The system sends the glasses data to the database.

### Alternative Flow 1

6.1 - The user is allowed to skip one or more eye data fields. The user could do so by pressing the skip button at the bottom-right.

### Alternative Flow 2

8.1 - The user is allowed to edit any entry of the inputted data, by pressing the arrow icon located at the right of an entry.
8.2 - The user is redirected to a edit single value screen, in which the value of the selected field could be edited.
8.3 - The user press the done button to confirm any changes, and returns to the edit data screen. The use case resumes at step 8.

<br>

## <u>Use Case: View Glasses</u>

The user could view a list of added glasses

### Pre-conditions

The user should be at the detailed graph screen.

### Basic Flow

1. The user press the view glasses button.
2. The system shows a popup containing the list of existing glasses, along with a add glasses button at the bottom.

<br>

## <u>Use Case: Ask Question</u>

The user could ask eye-related questions to eye professionals, through the QnA screen. Note: to view the answer from eye professionals, the user will have to wait until reviews of both the question and answer have complete.

### Pre-conditions

The user should be at the home screen.

### Basic Flow

1. The user press the Q&A button at home screen.
2. The user ask a new question by pressing the button at the bottom.
3. The user enters a title and a body with the text input.
4. The user can add tags to the question.
5. The user press submit.
6. The question is send to the database for approval.

<br>

## <u>Use Case: View Question</u>

The user could view question/answer posted by others, as well as the question asked by the user.

### Pre-conditions

The user should be at the home screen.

### Basic Flow

1. The user navigate to the QnA screen.
2. The system shows a list of approved questions.
3. The user press on a question
4. The system shows the title and the body of the question. The system also shows the title and the body of the answer below the question.

<br>

## <u>Use case: View Articles</u>

The user can view a list of eye-related articles and save a selected article

### Pre-conditions

The user should be at the home screen.

### Basic Flow

1. The user navigate to the article screen by pressing on the articles button.
2. The system shows a list of previews of eye-related articles.
3. The user selects an article
4. The system shows the title, body, and an image in a new screen.
5. The user can save the article by pressing the favorite icon.

## <u>Use Case: Eye exercise</u>

The user could select and start an eye exercise.

### Pre-conditions

The user should be at the home screen.

### Basic Flow

1. The user navigate to the eye exercise screen by pressing on the eye exercise button.
2. The user is redirected to the eye exercise home screen, which consists of a description text, a cover image, and 4 different types of eye exercise.
3. The user select one of the eye exercises.
4. The system shows a start button
5. The user press the start button
6. The system shows a countdown timer. When the countdown reaches zero, the eye exercise will start. An audio track is played in the background, and an instruction text is shown on the screen.
7. The user follows the instruction and complete the exercise.

### Alternative Flow 1

7.1 During the exercise, the user can pause the audio track by pressing the play/pause button.
7.2 During the exercise, the user can press stop to back to the starting screen of exercise.
