# instagram

Create a CRUD for Social Media Post module where user can add post with Images, Video, Audio. 

User can only edit, delete their own post.
Other user can only able to view.

These images, video, audio can be in large size. 

Technical Requirements, Must have:
● Build fully functional REST API without any UI
● README.md should contain all the information that the reviewers need to run and use the app
● Write code with your teammates in mind: apply the standard code style, readable, easy to review & understand.
● Unit and Features tests are required
Nice-to-have:
● Include brief documentation for the project: the choices you made and why
● Script to install the app in one go (any tool)
● Postman collection/openAPI document for the API
● Clean application architecture / design patterns


tech used  - nodejs , express , mongodb , aws s3
tools used  - vs code , mongodb compass , postman 



all the text format data is stored inside mongodb 
all the file format data is stored inside aws s3 bucket .

how to use -
step1 -  user will create his own id in data base (sign up) where it is required to have unique email id and phone number . and should put all the details in form data in postman .
step 2 - after successfully siging up . user needs  to to login with the same email and password (which has used while signing up) . 
step 3  - after successfully logged in user can get a token (which is generated from jwt) . 
(   FOR CREATING A POST USER MUST NEED TO LOGGIN FIRST )
step 4  - the generated token should put inside the header column with key (x-api-key) and the value should be that generated token .
step 5 - user should put all the data along with file type data into the form data . 
step 6 - post will get successfully created.
step 7 - if user want to see all the post . user will be able to do it from get api 
step 8  - if user want to delete to update his post(only the post which belongs to him ) then user will be able to do it from the update and delete api respectively .
step 9 - to update data should be passed from form data and the updated successfully messaged will pop up . if user want to update someone else post the system will deny to update someone else data . 
step 10 - Similarly like update , user can delete his post from delete api and connot be able to delete someone else post. 