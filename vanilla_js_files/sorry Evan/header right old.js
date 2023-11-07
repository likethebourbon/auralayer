// -----------------------------------
//      LEFT OUTER COLUMN COMPONENTS
// -----------------------------------
// this.UndoZoomContainer = createNewElement ( {type:"div", classes:["UndoZoomContainer", "col"], parent: this.UtilitiesContainer, properties:{id: "undo-redo"} } );
this.UndoZoomContainer = createNewElement({
	type: "div",
	classes: ["UndoZoomContainer", "col"],
	parent: this.HeaderContainer,
	properties: { id: "undo-redo" },
});
this.UndoButtonGroup = createNewElement({
	type: "div",
	classes: ["UndoButtonGroup", "btn-group"],
	parent: this.UndoZoomContainer,
	properties: { role: "group" },
});
this.ZoomButtonGroup = createNewElement({
	type: "div",
	classes: ["ZoomButtonGroup", "btn-group"],
	parent: this.UndoZoomContainer,
	properties: { role: "group" },
});

this.ZoomOutButton = createNewElement({
	type: "button",
	classes: [
		"ZoomOutButton",
		"btn",
		"btn-outline-secondary",
		"rounded-0",
		"rounded-top",
		"border-0",
	],
	parent: this.ZoomButtonGroup,
	properties: { type: "button", innerHTML: `<i class="bi-zoom-out"></i>` },
});
this.ZoomOutButton.addEventListener("click", (e) => {
	this.zoom_handler("out");
});
this.ZoomInButton = createNewElement({
	type: "button",
	classes: [
		"ZoomInButton",
		"btn",
		"btn-outline-secondary",
		"rounded-0",
		"rounded-top",
		"border-0",
	],
	parent: this.ZoomButtonGroup,
	properties: {
		type: "button",
		title: "Zoom in",
		innerHTML: `<i class="bi-zoom-in"></i>`,
	},
});
this.ZoomInButton.addEventListener("click", (e) => {
	this.zoom_handler("in");
});

this.UndoButton = createNewElement({
	type: "button",
	classes: [
		"UndoButton",
		"btn",
		"btn-outline-secondary",
		"rounded-0",
		"rounded-top",
		"border-0",
	],
	parent: this.UndoButtonGroup,
	properties: {
		innerText: "Undo",
		type: "button",
		title: "Undo",
		innerHTML: `<i class="bi-arrow-counterclockwise"></i>`,
	},
});
this.UndoButton.addEventListener("click", (e) => {
	this.undo_handler();
});
this.RedoButton = createNewElement({
	type: "button",
	classes: [
		"RedoButton",
		"btn",
		"btn-outline-secondary",
		"rounded-0",
		"rounded-top",
		"border-0",
	],
	parent: this.UndoButtonGroup,
	properties: {
		innerText: "Redo",
		type: "button",
		title: "Redo",
		innerHTML: `<i class="bi-arrow-clockwise"></i>`,
	},
});
this.RedoButton.addEventListener("click", (e) => {
	this.redo_handler();
});
