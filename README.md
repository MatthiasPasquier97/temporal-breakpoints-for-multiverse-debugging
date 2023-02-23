This is the repositiory accompanying the article "Temporal Brakpoints for multiverse debugging".

This code will demo a command line version of our debugger, working with AnimUML as subject language to debug and three different breakpoints languages to use, one based on regular expressions, the other two based on AnimUML automatas, but including or not the capability to express liveness properties through encoding of Büchi automatons.

To run the debugger, run main.js with an index as argument correponding to one of the proposed configurations found in samples/configuration.json. Once the debugger is running, three actions are available:

- "initial" or "i" to initialize the debugger
- "actions" or "a" to list the available actions
- "execute j" or "e j" to execute the chosen action, with j being the index of the action in the list returned by "actions".
