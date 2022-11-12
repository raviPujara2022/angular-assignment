# AngularAssessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Third Party Libraries

Angular Material version - 13.3.6

ngx-select-ex version - 8.0.1

ng2-file-upload- 1.4.0

## Application Run commands

Please make use of following commands after project has been cloned - npm install

To start the project please use following commands - npm start or ng serve

## About the Project

Project has been divided into different components, Angular Material along with scss is being used for design and for multi select ng-select-ex (A third party library) is being used, ng2-file-upload (A third party library) is being used for upload and drop in image purposes,

All the data is being updated in the Table

## Project Overview

When the application loads for the first time we can see the existing data in table (initially data in being fetched from the local storage)

All the data related to country, region and collabrators can be found in src > constants > app.constant.ts file 

One can add New customer by click + Add Customer button which open a Dialog box and after filling the details, they have to create a new pin which will have image upload and collabrators name by default (new collabrators can be added by adding new customer), once you add a new pin you can see your changes reflect in table, In case you cannot view your changes please change the page