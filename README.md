# Auralayer

In development!

## Feature requests

- [x] **confirm before navigating away**
- [ ] draggable cursor
- [x] timestamps listed (every 30 secs? every minute? configurable?)
- [ ] double-click to edit layer name
- [ ] select segment + Y to jump cursor to beginning of segment
- [x] [move visual for (user) cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) when hovering/moving (playback) cursor
- [ ] snap cursor to beginnings/ends of segments
- [x] highlight row background instead of dotted border (caused weird problems - back to orange outline)
- [ ] Spacer layer (for showing groups of layers)
- [ ] editable data table
- [x] more space for layer names (also added ellipsis when too long)
- [x] pattern overlays white instead of black (added duplicate white set)
- [ ] I think 10 steps is too many and would go back to 5 (0–4)
- [x] need a back button after submitting what kind of starting point (e.g., after pressing YT, need to be able to go back and select load from file)
- [x] ability to select a blank/missing segment—currently no good way to fill in a gap
- [ ] download button asks whether you want to save data file or image
- [ ] duplicate layer button
- [ ] cmd+a to select all segments within a layer (but probably not deleted segs/presence 0 segs)
- [ ] "merge right/left" when selecting multiple segs should merge all selected segs into the leftmost/rightmost seg
- [x] after merging segments, the merged segment should be selected
- [ ] underline option for text
- [ ] keyboard shortcuts for text formatting
- [ ] background image of just a lower/upper border or a box
- [ ] text formatting does some weird stuff when multiple boxes are selected
- [x] confirm dialog before deleting layer
- [ ] shift+click selects all contiguous segments; cmd+click selects multiple segments


## Bugs 

- [x] selecting a small segment turns it white so hard to see what's selected vs deleted—need external border instead of internal
- [x] overflow-y is hidden?
- [ ] full width or centered graph on opening
- [ ] data table collapsible expands when the table is open
- [ ] changing from "Gradient" to "slope" doesn't redraw things that were already gradient-ized or slope-ified; in general it's just a bit weird when you mess around with that setting. 
  - [ ] I think when you switch from gradient to slope, the opacity of all segments needs to get reset to 1 
  - [ ] and the opacity info needs to be converted to gradient info.
