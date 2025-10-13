# Auralayer

In development!

## Feature requests

- [ ] draggable cursor
- [ ] double-click to edit layer name
      Brian: Complete - However, I feel like I added this feature before and something happened on touch devices ...
- [ ] select segment + Y to jump cursor to beginning of segment
- [ ] snap cursor to beginnings/ends of segments
- [ ] Spacer layer (for showing groups of layers). The problem with just deleting all the info from a layer is that it shows up in the data table and puts a bunch of blanks in there, which is a problem for sorting, I think.
      Brian: I added a toggle in each layer settings called "Data Table". If you toggle it off, it won't show in the Data Table
- [ ] Ability to hide layer names (so that in the data table the layer could still be named, but not visually shown on the graph)
      Brian: I added a toggle in each layer settings called "Hide Name" to do this
- [ ] editable data table
      Brian: I made this editable in 2 ways. With up/down arrows that adjust the starting and ending point and by
      clicking on the timestamp and typing in a new timestamp. It's clunky but functional. An interface could be developed
      for inputting timestamps in the future. It's now odd, that the ending timestamps aren't shown because you can change
      them but you'll on see the change on the starting timestamp of the segment to the right of the one you're editing.
      Also, I made the arrow buttons change the current value by 1 second. That can be changed to 1 tenth of second.
      Probably best to test it as is and change if needed.
- [ ] I think 10 steps is too many and would go back to 5 (0–4)
      Brian: I still like 10
- [ ] download button asks whether you want to save data file or image
      Brian: I can't replicate this.
- [ ] duplicate layer button
      Brian: Completed. This was difficult 😞. There is now a button with this functionality in each layer settings fly-out menu
- [ ] cmd+a to select all segments within a layer (but probably not deleted segs/presence 0 segs)
- [ ] "merge right/left" when selecting multiple segs should merge all selected segs into the leftmost/rightmost seg
- [ ] background image of just a lower/upper border or a box
- [ ] shift+click selects all contiguous segments; cmd+click selects multiple segments
- [ ] spinner when loading a file
      Brian: This is already there, right?
- [ ] repaint all layers according to color scheme

## Completed Feature Requests
- [x] **confirm before navigating away**
- [x] timestamps listed (every 30 secs? every minute? configurable?)
- [x] [move visual for (user) cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) when hovering/moving (playback) cursor
- [x] highlight row background instead of dotted border (caused weird problems - back to orange outline)
- [x] more space for layer names (also added ellipsis when too long)
- [x] pattern overlays white instead of black (added duplicate white set)
- [x] need a back button after submitting what kind of starting point (e.g., after pressing YT, need to be able to go back and select load from file)
- [x] ability to select a blank/missing segment—currently no good way to fill in a gap
- [x] after merging segments, the merged segment should be selected
- [x] underline option for text
- [x] keyboard shortcuts for text formatting (ctrl + b, ctrl + i, ctrl&shift + u - not sure what the others should be)
- [x] confirm dialog before deleting layer
- [x] text formatting does some weird stuff when multiple boxes are selected
      

## Bugs
- [ ] full width or centered graph on opening
            Brian: ???
- [ ] changing from "Gradient" to "slope" doesn't redraw things that were already gradient-ized or slope-ified; in general it's just a bit weird when you mess around with that setting.

  - [ ] I think when you switch from gradient to slope, the opacity of all segments needs to get reset to 1
  - [ ] and the opacity info needs to be converted to gradient info.
        Brian: I implemented the gradient vs slope to be difference features not either or. I see how the design layout suggests they should be either or though. I like the idea of them being used simultaneously and they're stored in the data structure as independent variables. Maybe a second set of sliders needs to be added to the UI? With the current setup, at least the UI doesn't get more cluttered, but using it takes more work.
- [ ] data table timestamps are wack
      Brian: What do you want them to be?
- [ ] after adding a number of textures, I can't add textures unless I change the color first
      Brian: I wasn't able to reproduce this.

## Fixed Bugs
- [x] selecting a small segment turns it white so hard to see what's selected vs deleted—need external border instead of internal
- [x] overflow-y is hidden?
- [x] data table collapsible expands when the table is open, but only on full width
- [x] Sometimes when switching windows the analysis disappears and I go back to the start screen
