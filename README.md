# Auralayer

In development!

## Feature requests

- [x] **confirm before navigating away**
- [ ] draggable cursor
- [ ] timestamps listed (every 30 secs? every minute? configurable?)
- [ ] double-click to edit layer name
- [ ] select segment + Y to jump cursor to beginning of segment
- [x] [move visual for (user) cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) when hovering/moving (playback) cursor
- [ ] snap cursor to beginnings/ends of segments
- [ ] highlight row background instead of dotted border
- [ ] Spacer layer (for showing groups of layers). The problem with just deleting all the info from a layer is that it shows up in the data table and puts a bunch of blanks in there, which is a problem for sorting, I think.
- [ ] Ability to hide layer names (so that in the data table the layer could still be named, but not visually shown on the graph)
- [ ] editable data table
- [ ] more space for layer names
- [ ] pattern overlays white instead of black
- [ ] I think 10 steps is too many and would go back to 5 (0–4)
- [ ] need a back button after submitting what kind of starting point (e.g., after pressing YT, need to be able to go back and select load from file)
- [x] ability to select a blank/missing segment—currently no good way to fill in a gap
- [ ] download button asks whether you want to save data file or image
- [ ] duplicate layer button
- [ ] cmd+a to select all segments within a layer (but probably not deleted segs/presence 0 segs)
- [ ] "merge right/left" when selecting multiple segs should merge all selected segs into the leftmost/rightmost seg
- [ ] after merging segments, the merged segment should be selected
- [ ] underline option for text
- [ ] keyboard shortcuts for text formatting
- [ ] background image of just a lower/upper border or a box
- [ ] text formatting does some weird stuff when multiple boxes are selected
- [ ] confirm dialog before deleting layer
- [ ] shift+click selects all contiguous segments; cmd+click selects multiple segments
- [ ] spinner when loading a file


## Bugs 

- [x] selecting a small segment turns it white so hard to see what's selected vs deleted—need external border instead of internal
- [x] overflow-y is hidden?
- [ ] full width or centered graph on opening
- [ ] data table collapsible expands when the table is open, but only on full width
- [ ] changing from "Gradient" to "slope" doesn't redraw things that were already gradient-ized or slope-ified; in general it's just a bit weird when you mess around with that setting. 
  - [ ] I think when you switch from gradient to slope, the opacity of all segments needs to get reset to 1 
  - [ ] and the opacity info needs to be converted to gradient info.
  - [ ] data table timestamps are wack
  - [ ] 