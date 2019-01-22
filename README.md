# About
Transducers-lib is an educational exercise and minimal transducers library inspired by [transducers-js](https://github.com/cognitect-labs/transducers-js) and [transducers.js](https://github.com/jlongster/transducers.js).

# Transducers?
In a nutshell: transducers are versions of map and filter that can be used on many types of collections. 
Unlike built-in methods, transducers do not create intermediate collections.

In this library, transducers are unary functions returned by other functions that configure their behavior. 
For example, map takes a function such as increment (called a "transform" in the codebase) to be applied directly to a collection and returns a transducer.

Transducers themselves do not operate on data: they expect to be told how to build a new collection from an existing one. 
Transducers take a reducer--a collection-building function--and return a function you can pass to reduce to apply your transformation. 
Like in Clojure, transducers' language of origin, map and filter are smart enough to do this automatically if passed a transform and a collection. Internally they are calling reduce, which knows what to do with a transducer.

You can also compose transducers and call reduce yourself, with a transducer or with an ordinary reducing function (e.g., sum). Transducers-lib works with arrays and vanilla objects out of the box, but for other iterables reduce expects a function already returned by a transducer. This means you must first pass the transducer a collection-builder (e.g., for sets) and call reduce with the result.

# Limitations
Currently transducers-lib provides only map, filter, and reduce. It does not follow the transducer protocol that would allow it to interoperate with other JavaScript transducer implementations. (See [transducers-js](https://github.com/cognitect-labs/transducers-js)).
