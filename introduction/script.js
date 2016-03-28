/*FUNCTIONS AND ABSTRACTIONS----------------------------------------------------------------*/

//Defines a variable pointing to a function
var work = function () {
    console.log("working hard!");
};

//Executes the function to which the variable points
work();

//Defines a variable pointing to a function that executes functions passed as parameters
//It provides more abstraction and control over the functions that do 
var doWork = function (f) {
    console.log("starting");
    try {
        f();
    } catch (ex) {
        console.log(ex);
    }

    console.log("ending");
};

//Executes a function(defined in a variable) passed as a parameter
doWork(work);

/*------------------------------------------------------------------------------------------*/
/*MODULES - is a collection of components or features put together to perform some useful work.
revealing module pattern*/

var createWorker = function () {
    //This variable is for internal purposes and won't be exposed in the API
    var workCount = 0;
    //Encapsulate some code inside of a function
    var task1 = function () {
        workCount++;
        console.log("task1 " + workCount);
    };

    var task2 = function () {
        workCount++;
        console.log("task2 " + workCount);
    };

    //API - only exposes what you want in the API()
    return {
        job1: task1
        , job2: task2
    };
};

var worker = createWorker();
worker.job1();
worker.job2();
worker.job1();
worker.job2();

/*------------------------------------------------------------------------------------------*/
/*IIFE - immediately invoked function expression
Helps to avoid global variables, build modules and provide encapsulation*/

(function(){
    var createWorker = function () {
        //This variable is for internal purposes and won't be exposed in the API
        var workCount = 0;
        //Encapsulate some code inside of a function
        var task1 = function () {
            workCount++;
            console.log("task1 " + workCount);
        };

        var task2 = function () {
            workCount++;
            console.log("task2 " + workCount);
        };

        //API - only exposes what you want in the API()
        return {
            job1: task1
            , job2: task2
        };
    };

    var worker = createWorker();
    worker.job1();
    worker.job2();
    worker.job1();
    worker.job2();
}());