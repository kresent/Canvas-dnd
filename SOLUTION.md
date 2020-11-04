# Canvas scene challenge

It seems like a nice challenge to work with canvas, after using HTML for so long.

First task is to form up a basic architecture of future entities. I come up with some interfaces and relations on paper and form a folder hierarchy for the project.

I pick InversifyJS for DI, since it helps in the long run greatly.

I decide not to use canvas libraries, since most already implement the logic I need, while others suit very specific needs and inflate the resulting bundle quite a bit.

---

I create a starting entity called SceneController for managing the canvas and working with the future scenes. I suppose there could be quite a lot of different scenarios, but they all should have similar canvas logic for rendering.

The SceneController should work with any scene that implements the IScene interface.

---

First challenge is that canvas height doesn’t resize with css rules, so I needed to implement the logic on the JS side.

Next I start working on the main scenario – the OverlayScene. The scene needs to load images for rendering, so here comes the next challenge. The images are loaded in an async manner, so I need to wrap all loaded images in a Promise. When it is resolved, we can be sure that we have a predictable set of images to work with.

It is also important to move the importing logic away from the scene itself, since the scene does not need to know how it gets the images. In the future this logic can be further customised.

Next challenge is to implement mouse events without cluttering each Scene, while making the drag’n’drop service reasonably reusable. I use callbacks to implement concrete behaviour for the scene, while leaving the mouse events in the DragAndDropService.

I need to have some sort of event storage for undo and persistence logic, so I created an EventStorageService for storing events. Currently the events are stored as strings, but they can be customised with serializable data for future use cases.

---

I review the code and go through a small cleaning and make sure no typescript errors are present.

In the end perform manual tests in Chrome and Safari to make sure everything works as expected before pushing to github.
