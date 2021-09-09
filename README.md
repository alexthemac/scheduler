# Interview Scheduler

* Interview scheduler (`scheduler`) is a single page application (SPA) built using React.

* Data is persisted by the API server using a PostgreSQL database.

* The client application communicates with an API server over HTTP, using the JSON format.

* HTML, CSS, JS, PostgreSQL, Axios, Webpack, Babel

Testing done with:

* Webpack Development Server
* Storybook
  * Components tests in isolation
* Jest
  * Unit and intergration tests
* Cypress
  * End to end tests in browser


## Setup

`scheduler` must be used with `scheduler-api`. See `scheduler-api` repository. 

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress 
```sh
npm run cypress
```
## Final Product

!["Landing page"](https://github.com/alexthemac/scheduler/blob/master/docs/1_Display_Blank.png)

!["New appointment"](https://github.com/alexthemac/scheduler/blob/master/docs/2_Display_Form_Blank.png)

!["New appointment form filled"](https://github.com/alexthemac/scheduler/blob/master/docs/3_Display_Form_Filled_Alex_no_hover.png)

!["New appointment form filled hover save"](https://github.com/alexthemac/scheduler/blob/master/docs/4_Display_Form_Filled_Alex_hover.png)

!["Saving"](https://github.com/alexthemac/scheduler/blob/master/docs/5_Display_Saving.png)

!["Saved appointment 1"](https://github.com/alexthemac/scheduler/blob/master/docs/6_Display_Saved_Appoinment_No_Hover.png)

!["Saved appointment hover edited"](https://github.com/alexthemac/scheduler/blob/master/docs/7_Display_Saved_Appointment_Hover.png)

!["Edit appointment form"](https://github.com/alexthemac/scheduler/blob/master/docs/8_Display_Form_Edited.png)

!["Saving"](https://github.com/alexthemac/scheduler/blob/master/docs/9_Display_Saving.png)

!["Saved appointment 2"](https://github.com/alexthemac/scheduler/blob/master/docs/10_Display_Saved_Edited_No_Hover.png)

!["Saved appointment hover delete"](https://github.com/alexthemac/scheduler/blob/master/docs/11_Display_Saved_Edited_Hover.png)

!["Delete confirmation prompt"](https://github.com/alexthemac/scheduler/blob/master/docs/12_Display_Delete_Confirmation_Prompt.png)

!["Deleting"](https://github.com/alexthemac/scheduler/blob/master/docs/13_Display_Deleting.png)

!["Landing page"](https://github.com/alexthemac/scheduler/blob/master/docs/14_Display_Blank.png)

!["Error saving"](https://github.com/alexthemac/scheduler/blob/master/docs/15_Display_Error_Saving.png)

!["Error deleting"](https://github.com/alexthemac/scheduler/blob/master/docs/16_Display_Error_Deleting.png)



