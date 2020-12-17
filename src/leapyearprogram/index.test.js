// Use this line to import the function, made possible by
// the export default line in the other file

Hello, world!
NPM Setup
Clean Start - A React Playground
JSX Crash Course
Component Composition
Default Props and Class Components
Intro to Testing
Setting, Reading, and Updating State
Event Handlers and Conditional Rendering
Callback Props
Thinking in React
API Requests
React Router
Creating and Reading Context
Updating Context
Organizing Your React Code
Deploying to Production
Accessibility in React Apps
Intro to Testing
Objective: By the end of this checkpoint, you can write and execute simple tests of simple React components.

Why test?
Before we dive into testing in detail let us try to understand the motivation behind testing. All engineering efforts include tests. It is how we know something that we construct is safe. Engineering software is no different. Software is a very complex artifact and notoriously difficult to get right. And in this modern age software is ubiquitous meaning that software failure is not just annoying but can cost money, reduce the quality of life, and in some cases even cause death.

As an example take a few minutes to watch this YouTube video on how one element of an aircraft is tested by the engineers building a new aircraft: https://www.youtube.com/watch?v=736O4Hz4Nk4. Notice that the engineers had a specification for what they wanted, they created a solution, then tested their solution to ensure that it worked.

Every component of our software systems should be rigorously tested too. Usually, these tests are done in isolation to ensure that each individual component behaves as expected. But just as the aircraft engineers would eventually test the entire aircraft, software engineers also test the entire software application.

Testing individual components is called unit testing, testing how components behave when working with other components is called integration testing, and testing how the entire application behaves along with the people using it and the hardware is called systems testing. There are many other types of tests that you will come across as you advance through your career as a software developer, but we will start our discussion with unit testing.

A unit of code can be any piece of code with a single purpose, like a class or a function. In React, we may take a unit to be a component. That is, each React component should have a single clearly-defined purpose and its behavior should be clearly understood. Unit testing a React component is a matter of ensuring that the component behaves as expected under all reasonable circumstances.

Jest
Jest is a JavaScript testing platform built by Facebook. In the aircraft testing example from above, there was a lot of scaffolding to hold up the engine, and cameras to set up and many other items just to perform the test. Jest is like scaffolding that is already set up for you. You just need to place your component in position, set up your expectations, and the platform takes care of the rest.

Before we look at testing React components specifically let us look at how we may use Jest to test a simple JavaScript function. We can do this by implementing a function in the React playground application and writing some tests for it.

Write a function leapYear(year) that returns true if the year is a leap year, false otherwise. The rules for leap years are:

only applies to years since 1582, throw an error for anything else
if a year is divisible by 4 then it is a leap year
except years divisible by 100, those are not leap years
except years divisible by 400, those are leap years
Write tests for the various requirements.

Let us think about how such a function may be tested. Pretend that someone gave you a program that they claim accurately calculates the leap year, but you do not have access to the code. What would you have to do to verify that it correctly implements the rules stated above? You will have to run the program several times with inputs that you know the answer to and check if the program gave you the right output. That is basically what testing does, it runs your function several times with inputs and asserts that the outputs are as expected.

In the leap year example, there is a rule that only years from 1582 may be leap years. To test that the function correctly checks this we need to try a year before 1582, say 1568 even though any year before 1582 would do, and see if it throws an error. And we have to test years after 1582 to see if it calculates it correctly. For each of the rules, we should have at least one test that breaks the rule and at least one that passes the rule. The following table contains a few example tests that may be used to test the leap year function:

Test No.	Inputs	Expected Output	Description
1	1568	throw error	Only work for years >= 1582
2	1900	false	divisible by 100, not 400, not a leap year
3	2000	true	divisible by 400, leap year
4	1984	true	divisible by 4, not 100, leap year
5	1983	false	Not divisible by 4, not a leap year
These are just a few examples and there may be more tests that can be performed. Can you think of anything else that should be tested?

Now that we have planned how to test the function let us write the function and some tests.

Initialize a project
While Jest can be used to test any JavaScript program we will use a React application since we are studying React here. To get started with this exercise open your React playground project in your code editor and create a new folder in the src folder named leapyearprogram.

$ mkdir src/leapyearprogram
All of your code and tests will be placed in this directory.

Then create a code file for your function named index.js:

$ touch src/leapyearprogram/index.js
And create a test file where all your test code will go. Jest will automatically look for files with either the name \*.test.js or \*.spec.js and run those files. So let us make a test file named index.test.js for our tests.

$ touch src/leapyearprogram/index.test.js
Implement the function
And now let us write our code. A complete version of the function is provided here but as with all programming tasks, there may be many other ways to solve the problem. Spend a few minutes making sure that you understand this approach, or even better: try implementing this on your own without looking at this solution - but do not spend more than a few minutes on it.

The index.js file:

function leapYear(year) {
  if(year < 1582) {
    throw new Error('Leap year rules do not work before 1582');
  }
  const div400 = year % 400 === 0;
  const div100 = year % 100 === 0;
  const div4 = year % 4 === 0;
  return div400 || (div4 || !div100);
}

// The next line makes the function available to other JavaScript modules
// This is necessary for the test code to be able to run this function
export default leapYear;
Sometimes, when a function is complex, it is possible to just write up a stub of the function, that is, an empty function that does nothing. Then think through the tests that you need and implement them before writing the complete function. By thinking about the tests needed, you are forced to think of the problem in detail and gain a better understanding of the code to be written. Over time you may see advice on the best approach; whether you write tests first or the code first or write them together, ultimately the most important thing is that you do write tests for all your code.

First test
Next, let us add some test code. Edit the index.test.js file and add the following code:

// Use this line to import the function, made possible by
// the export default line in the other file
import leapYear  from './index';

it('should NOT be a leap year if divisible by 100, not 400', () => {
  const input = 1900;
  const expectedOutput = false; 
  expect(leapYear(input)).toBe(expectedOutput);
});
This is just one test case. Let us take it apart before we move on. The it function is invoked by Jest, it takes two parameters, a String describing the test and the test function itself. The description of the test should be short but clear and unambiguous. When you run the test this description helps to identify which tests are passing.

() => {
  const input = 1900;
  const expectedOutput = false; 
  const actualOutput = leapYear(input);
  expect(actualOutput).toBe(expectedOutput);
}
The test function simply invokes the function to be tested with the input for which you know the output, then compares the actual output to the expected output. If they match then the test passed, otherwise the test failed. In Jest, the expect function provides several matchers such as toBe() for you to check your output. Checkout the docs to learn more about Jest matchers.

Run the test
Jest is already configured for your project by Create React App. To run the test simply issue the command:

$ npm test
Failing test

Hmmm! Looks like the test failed. What could possibly be wrong here? Let us take a close look at the output from the test and see if that helps. The test report starts with the name of the test file, that is helpful when you have many tests in many test files in your application. You can quickly identify the file to look at.

The first line is the test description for the failing test. It's a good thing you have a clear unambiguous description for your test. This is useful when you have many tests in the file. Again, you can quickly pinpoint the specific failing test. Also, a good descriptive statement might tell you what to look at in the function. In this case, we know that the "divisible by 100 but not 400" rule is broken, so maybe we have a bug in that bit of the function.

The next part of the report describes the actual test itself. It tells us that we are comparing 2 values for equality: there is a value that we expect to get and a value that we actually got, the received. We expected to get false but we received true.

Next, the few lines surrounding the point of failure in the test is printed out so right there you can see where the problem lies. We are told that the failure occurred on line 8 at column 27. That is very specific, which makes it possible to jump directly to the point of failure and examine the test.

The final part of the report is a general summary, the number of tests ran, how many passed, how many failed and so on.

Notice that as you run the tests it continues to watch for changes. This means that if you modify your code or tests the tests will automatically be executed again.

Take a moment and try to debug the code. Why is it returning true for 1900 when we expect false?

Of course, you may have spotted the error already. We are using an or operator || instead of the and operator &&. The logic should read true if the year is divisible by 400 or year is divisible by 4 AND not divisible by 100. The corrected function looks like this:

function leapYear(year) {
  if(year < 1582) {
    throw new Error('Leap year rules do not work before 1582');
  }
  const div400 = year % 400 === 0;
  const div100 = year % 100 === 0;
  const div4 = year % 4 === 0;
  return div400 || (div4 && !div100);
}

// The next line makes the function available to other JavaScript modules
// This is necessary for the test code to be able to run this function
export default leapYear;
Make that change to the code and save the file. Notice that the test automatically executes and this time it passes.

Passing the test

Add more test cases
Now we can add the other test cases. Edit the index.test.js file and add the following test:

it('should be a leap year if divisible by 4, not 100', () => {
  const input = 1984;
  const expectedOutput = true;
  const actualOutput = leapYear(input);
  expect(actualOutput).toBe(expectedOutput);
});
Save the file and the tests automatically run.

Try adding the other test cases defined above. It may be possible to simplify the way the tests are written by skipping the const declarations. So the test file may look like this:

import leapYear  from './index';

it('should NOT be a leap year if divisible by 100, not 400', () => {
  expect(leapYear(1900)).toBe(false);
});

it('should be a leap year if divisible by 4, not 100', () => {
  expect(leapYear(1984)).toBe(true);
});

it('should NOT be a leap year if not divisible by 4', () => {
  expect(leapYear(1983)).toBe(false);
});

it('should be a leap year if divisible by 400', () => {
  expect(leapYear(2000)).toBe(true);
});

it('should throw an error for years before 1582', () => {
  expect(() => {
    leapYear(1568);
  }).toThrow();
});