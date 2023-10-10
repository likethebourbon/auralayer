export function CreateNewElement(data)
{
	const new_element = document.createElement(data.type);
	data.classes.forEach(each=>new_element.classList.add(each));
	
	for (const key in data.styles)
		{
			if(key === "width" && data.classes.includes("segment"))
				{
					new_element.style.width = "0px";
					new_element.animate(
						[  // keyframes
								{ width: new_element.style.width  },
								{ width: data.styles[key]}
						], 
						{ duration: 500, iterations: 1 } );  
				}

			new_element.style[key] = data.styles[key];		
		}

	for (const key in data.properties)
		{ new_element[key] = data.properties[key]; }		

	data.parent.appendChild(new_element);

	return new_element;
}