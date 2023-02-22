GITHUB: https://github.com/Mebu98/PGR6301kn1020exam

AZURE: https://pgr6301kn1020.azurewebsites.net/ (might not work...)


admin account on azure should be:
  * username: admin
  * password: admin

if not one a user can manually be set to "manager" role in the database

Video if all else fails: https://www.youtube.com/watch?v=YgyVKtsyRjw&feature=youtu.be
 
----------------------------------------------

GET endpoints are:
  * api/users
    * /cookie
      * see if user is logged in via cookie
    * /roles
        * get all roles
    * /all
      * get all users (requires manager cookie)
      
  * api/activities
    * gets all activities, no auth needed yet...


POST endpoints are:
  * api/users
    * /login
      * login with username and password
    * /register
      * register with username, name, and password

  * api/activities
    * /new
      * create new activity

DELETE endpoints are:
  * api/users
    * /logout
      * logout user
    * /delete/:id
      * delete user (requires manager cookie and database cookie id check)
      
  * api/activities
    * /delete
      * delete activity (requires manager cookie)

PUT endpoints are:
  * api/users/update
    * update user (requires manager cookie and database cookie id check)


----------------------------------------------
* [x] account
  * [x] register account
  * [x] login
  * [x] logout

* [x] manager
  * [x] create new activity
  * [ ] edit activity
    * [x] delete activity
  * [x] delete activity
  * [x] delete user
------------
* [ ] TESTS
* They started failing after I added mongoDB...
  * [ ] loginAPI
    * [ ] login with correct credentials
    * [ ] create account
  *[ ] activityAPI
    * [ ] create activity
    * [ ] edit activity
    * [ ] delete activity

* [x] sha256 password encryption 
  * no salt though
  
* [x] MongoDB

* [ ] Azure