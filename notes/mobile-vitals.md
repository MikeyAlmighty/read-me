# Four Metrics Every Mobile Developer Should Care About
 * Cold starts
 * Warm starts
 * Slow frames
 * Frozen frames. 

## App Start
When a user taps on your app icon, it should start fast. 
**Cold start**: App launched for the first time, after a reboot or update.
**Warm start**: App launched at least once and is partially in memory.

## Slow and Frozen Frames
Unresponsive UI, animation hitches, or just jank annoy users and degrade the user experience.
Two measurements to track this unwanted experience are **slow** and **frozen frames**.
A phone or tablet typically renders with `60 frames per second (fps)`.

The frame rate can also be higher, especially as `120 fps` displays are becoming more popular.
With `60 fps`, every frame has `16.67 ms` **to render**.
If your app needs more than 16.67 ms for a frame, it is a **slow frame**.

**Frozen frames** are UI frames that take longer than `700 ms`.

An app that is running smoothly should not experience either.
