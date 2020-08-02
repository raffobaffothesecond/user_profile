# User Profile

## Project setup

First, rename the provided   

```
.env.example
```
to

```
.env
```


**IMPORTANT add the api token**
```
VUE_APP_GOREST_TOKEN=the_token_goes_here
```

Then just run 
```
npm install
```

to install all the project dependencies. 

###  Compiles and run application in development-local server
```
npm run serve
```


### Run unit tests
```
npm run test:unit
```

### Compiles and minifies for production
```
npm run build
```



##Highlights

* **Ability to search for an user**
  * Requests for search has a timeout to avoid redundant requests
  * Dropdown menu to select which field to search
  * Placeholder text changes according to dropdown value
  
  
* **Fallback icon for Users Avatars**
  * If a user does not have an avatar, a fallback icon is displayed
  * While the avatar loads, the fallback icon is displayed
  
* **Mailable, Callable and SmsAble buttons** 





