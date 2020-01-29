# Thompson Group F
A simple client side webapp to calculate the group operation on the tree-pair representation of Thompson Group F (Vagabond Groups, Chameleon Groups). Said group will henceforth be referred to as just 'F'. 

The page is now hosted at github pages [here](https://thunderamental.github.io/ThompsonGroup/).

This was done (by me, KW Theng) as part of a vacation research scholarship project at the University of Melbourne under the supervision of Dr. Lawrence Reeves. Disclaimer: I am in no way a web developer, and must apologize for any glaring issues in my code here. Do shoot me an email at ktheng@student.unimelb.edu.au if you feel strongly enough on anything I've mauled up.

## Overview
The elements of F (and to an extent its related groups F_Tau, T, V, to name some), possess a nice visual representation in terms of pairs of balanced full binary trees. This small app provides a simple calculator based off the infinite generating set for F. It also is able to reduce tree-pair elements to a simple form. Currently, input is in terms of the infinite generating set.

Most code is fully front-end in JS, due to the simplicity of the required work and the ease of setup of such a product. I don't recommend JS for anything more complicated. The code in its current form is very rudimentary and I intend to return and clean it all up and optimize it. I will log my experiences if I do end up doing so.

## Some group theory
F is an infinite group but possesses a finite (two elements!) generating set:

![presentation](https://wikimedia.org/api/rest_v1/media/math/render/svg/3aa741bdc915a1f7baea62d1f970a171b87b476a) -- from wikipedia.

The infinite presentation can be derived from the finite one:

![presentation2](https://wikimedia.org/api/rest_v1/media/math/render/svg/0bb0364d591aceef7c04107d94a773e98f21c119) -- also from wikipedia.

There is an (as of writing) open conjecture that F is not amenable. 

Also, note that if one views F in the 'homeomorphisms of the unit interval' form, the group operation is composition, but is 'reversed' in terms of the tree-pair form. That is, let a(x), b(x) be elements of F that have tree-pair representations. The group produce a(x)*b(x) corresponds to the composition b(a(x)). I think I'm not clear here; I'll rewrite this to clarify it later.

One can read more about this group online. A recommended resource is Jose Burillo's "Introduction to Thompson's Group F", which has been very helpful for my study into it.

## Checklist.
- [x] Complete simple 2-element operation.
- [x] Move away from manual tree input to terms of generator.
- [x] Implement visual representation. Test out
    - [x] ~~Treant.js~~ ugly
    - [x] ~~Vega.js~~ too narrow
    - [x] d3.js
- [x] Tidy up CSS and add UI buttons.
- [x] Fix input and string-to-element parser.
- [x] Add ability to reduce tree pair elements.
- [x] Add ability to obtain normal form from tree pair.
- [x] Tidy up UI text and add header links to github, email, etc.
- [x] Update README and add documentation for future use. (? tentatively done)
- [x] Host on persistent domain. (currently Github Pages)
- [ ] Upload the infographic about some group theory to the github. (stay tuned..)