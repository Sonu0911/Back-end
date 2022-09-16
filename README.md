# Back-end

Create node js project for rest api 





-create one schema of user : - 

Fields : first_name ,last_name , email ,password 





-create api for create user : 

Requested data :  {

“first_name” : “vyom”,

“last_name” : “chaudhary”,

“email” : “vyom@yyindia.com”,

“Password” : “123”

}

Validation: email must be mandatory.

Optional: save password in the database encrypted.





-create api for get user : 



Get user as per email id and password 

Requested data : {

“email” : “vyom@yyindia.com”,

“password” : “123”

}

Validation : if password is wrong than return incorrect data 





-create api for update user :



For update user first name and last name



 - create api for delete user : 



Delete user as per “_id” or “email”







All api create with the use of express.js , mongoose.

