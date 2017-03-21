## rwb-ui-rto-forms
## test
## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## To access this app from a different device on the same network

In Gruntfile, change the following property to 0.0.0.0

    connect: {
      options: {
        hostname: '0.0.0.0',

Find the `hostname` of the machine that runs/hosts the app & navigate on the other device(s) browser to a url in the following format http://hostname:port/#!/

Example: http://aslammkhan.local:9000/#!/

## Using NgDocs
Below is a sample doc for a controller which serves as a starting point for documentation in this app. More about it can be read at:

1. [podpea.co.uk] (http://www.podpea.co.uk/blog/starting-off-with-ngdocs)

2. [stackoverflow] (http://stackoverflow.com/questions/33015175/how-can-ngdoc-be-used-to-document-a-function-declaration-in-an-angular-service)


     /**
      * @ngdoc controller
      * @name rwb-ui-rto-forms.controller:MainController
      * @description
      * Main Controller of rwb-ui-rto-forms
      *
      * @author your_name
      */
