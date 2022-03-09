# Clean Architecture

The Clean Architecture, defined by Robert Cecil Martin (a.k.a. Uncle Bob) at 2012, is an architectural pattern to organize the directories in the project, aiming to build at a more robust, flexible and scalable software project. The main idea is to create a software more tolerable to changes facilitating new feature implementations in the future. To understand how it works we can break apart the architecture in a larger set named 'infrastructure' containing the tecnology used by the project, and a smaller inner set named 'domain', or 'core', that has the application's business rules.

<br/>

<div align="center">
  <img height="400" src="https://github.com/gftf2011/clean-node-file-uploader-api-js/blob/main/public/assets/clean-arch-simplified.png" />
</div>

<br/>

To implement the Clean Architecture is very important to know that the classes, functions and variables that exist in the inner set, should never know how the implementation of an external code that exists in the superior scope. To make sure this golden rule, that defines the Clean Architecture, is never broken, techniques such as the Dependency Inversion principle are used to decouple the project structure using contracts, or interfaces.
A traditional representation of the Clean Architecture contains 4 layers, but this is not a rule. Depending on the project, more or less sets can be created.

<br/>

<div align="center">
  <img height="400" src="https://github.com/gftf2011/clean-node-file-uploader-api-js/blob/main/public/assets/claen-arch-complete.png" />
</div>

<br/>

The Clean Architecture brings several benefits with it like:
 - Framework independency
 - Database independency
 - Highly Testable

<br/>

But, it has several counterpoints such:
 - Excessive usage and creation of new classes
 - Initial learning time is higher

<br/>

Normally, managing the code complexity leads to higher learning time, what leads to a higher finantial cost and lower productivity, but after a while the code complexity becomes managable and due to the architecture's nature of highly decoupled components the code maintenance becomes almost constant, what leads to a finantial resources decrease.
