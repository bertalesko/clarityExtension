var jobList = new Array();

/*
if (document.readyState !== "loading" || document.readyState !== "interactive") 
{ 
	setInterval(outer2, 2000);	
} 
else 
{
    setInterval(outer2,2000);	
}
*/

setInterval(outer2,2000);	



function outer2()
{		
	
	removeColumns();
	
	var checkPopulateElement = document.querySelector("div.item-actions-bar");
	var checkSaveElement     = document.querySelector("span.timeentry-item-name");
	var ModalFinder          = document.querySelector("body > div.page-wrapper.ppm-overflow-hidden > div.container-fluid > div.ppm-workspace.nav-padding > div > div > div > tabs-scrollable > div > div > div > div > div.tab-pane.active > div > div > div.ppm-timesheet-grid.modal-open > div.modal.common-modal-popup.content-height-small.in > div");
	
	
	if (ModalFinder != null)
	{
		addPopulateButton();
	}

	
	if ((checkSaveElement == null) && (checkPopulateElement == null))
	{
		setTimeout(outer2, 2000); 		
	}
	else	
	{
		
		
		var AddTaskBtn = document.querySelector("#timesheet-work-add-btn");
		var btnVisible = AddTaskBtn.getAttribute("aria-hidden");
		
		if ((checkSaveElement != null) && (checkPopulateElement == null))
		{
			if ((AddTaskBtn != null) && (btnVisible == "false"))
			{
				//console.log("fresh timesheet, save btn not needed");
				return;
			}		
			
			addSaveButton();
			
		}
		
	}	

}


async function populate() 
{	
	if (jobList.length == 0)
	{
		alert(" JobList is empty. \n \rTo create job list go to timesheet you want to copy and use Save Job List ");					
		return;
	}
	console.log("jobs to start with: ", jobList.length);
	
	do 
	{
		var resolveResult3 = await populateFunc((jobList.length - 1));
		
		
		jobList.pop();					
		
		console.log("jobs left: ", jobList.length);
		
		
	} while (jobList.length > 0);
	
	setTimeout(clickAdd, 1500);	
}

function clickAdd()
{
	try
	{					
		var addButton = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[3]/ppm-button-st[2]/button', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (addButton)
		{			
			addButton.click();											
		}
	} 
	catch(error)
	{
		console.log('Error in selectJob: ', error);
	}
}



function populateFunc(elemNum)
{				
	if (jobList.length == 0)
	{   //last line defense against empty joblist.		
		return;					
	}
	
	if (jobList[elemNum] == null)
	{ //make sure element isnt't null ("undefined")
		return;
	}

	return new Promise ((resolve) =>
	{ 
		
		var searchField = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[1]/div[4]/ppm-common-search/div/div/div/div/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (searchField != null)
		{
			//Update text field
			searchField.value = jobList[elemNum];							
			
			//create new event
			var updateEvent = new Event ('change');	
			
			//call newly created event !						
			searchField.dispatchEvent(updateEvent); 
			
			//2 sec delay to let job table refresh
			setTimeout(function() 
			{								
				var isLoaded = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/ppm-split/div[1]/div/ppm-grid-component/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div/div/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (isLoaded)
				{	
					//check if first table entry equals our job name
					if (isLoaded.textContent.trim() == jobList[elemNum])
					{
						
						var selectField = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/ppm-split/div[1]/div/ppm-grid-component/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div/div/div/div[1]/div/div/div/div[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (selectField != null)
						{	
							//select our job !							
							selectField.click();											
							resolve('resolved');
						}										
					}
					else
					{
						console.log("wrong text value");										
					}
				}
			}, 2000);
		}
	});					
}



function addSaveButton()
{
	//div around buttons
	var buttonDiv = '/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/table/thead/tr/th[1]/div[1]';
	var ul = document.evaluate(buttonDiv , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	//saveJobs button
	
	
	var buttonSaveJobs = document.getElementById("bartbart");				
	if ((ul != null) && (buttonSaveJobs == null))
	{ 
		
		//div found, button not found - creating button
		
		var li = document.createElement("div");
		li.setAttribute("id", "element4"); // added line
		li.setAttribute("class", "add-work-menu");
		var newElem = document.createElement("span");
		newElem.setAttribute("class", "html-button btn-work m-r-xs");	
		
		var newButton = document.createElement("button");	
		newButton.setAttribute("class", "btn btn-ppm btn-ppm-primary btn-ppm-md btn-bg-light");		
		newButton.setAttribute("id", "bartbart");					
		
		
		var newDiv = document.createElement("div");
		newDiv.setAttribute("class", "flex-container flex-row full-h center-v center-h");
		
		var newSpan = document.createElement("span");
		newSpan.setAttribute("class", "label-container full-h center-v");
		newSpan.innerText = "Save Jobs";
		
		
		newDiv.appendChild(newSpan);	
		newButton.appendChild(newDiv);
		newElem.appendChild(newButton);		
		
		li.appendChild(newElem);
		ul.appendChild(li);					
		
		var butt = document.getElementById("bartbart");
		if (butt != null)
		{			
			butt.addEventListener('click', ()  => 
			{							
				jobList = [];
				var elements = document.getElementsByClassName('timeentry-item-name'), elLength = elements.length;
										
				for (var i1 = 0 ; i1 < elLength; i1++)
				{
					jobList.push(elements.item(i1).textContent);	
				}	
			});					
		}								
	}
	else
	{
		return;
	}
}


function addPopulateButton()
{		
	var buttonLocation = '/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/div[3]/ppm-multiple-selection-action-bar/div'
	var ul = document.evaluate(buttonLocation, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	//Populate button
	var PopulateButton = document.getElementById("populateButton");	
	if ((ul != null) && (PopulateButton == null))
	{ 
		//div found, button not found - create new button
		
		var li = document.createElement("ppm-button-st");
		li.setAttribute("id", "populateButton"); // added line					
		li.setAttribute("class", "selection-button hydrated");
		li.setAttribute("label", "Populate");
		li.setAttribute("name", "populateButton");
		li.setAttribute("button-size", "sm");
		li.setAttribute("st-id", "multiple-selection-action-bar-select-button");
		li.setAttribute("button-type", "link");
		
		var li2 =  document.createElement("button");
		li2.setAttribute("class", "btn btn-ppm btn-ppm-link btn-ppm-sm btn-ppm-square btn-bg-light");
		li2.setAttribute("data-caid", "PopulateButton-button");
		li2.setAttribute("aria-label", "Populate");
		
		var li3 = document.createElement("div");
		li3.setAttribute("class", "flex-container flex-row full-h center-v center-h");

		var li4 = document.createElement("span");
		li4.setAttribute("class", "label-container full-h center-v");

		/* append new elements to each other and make it visible on website */
		li3.appendChild(li4);
		li2.appendChild(li3);
		li.appendChild(li2);					
		ul.appendChild(li);
			
		/* if button created successfully - attach onClick event */
		var butt = document.getElementById("populateButton");
		if (butt != null)
		{
			butt.addEventListener('click', ()  => 
			{	
				populate();				
			});					
		}							
	}
	else
	{
		// button and div found
		return;
	}
}


function removeColumns() 
{	
	let rowCheck = "";
	let rownbr = 0;
	let x = "";
	let y = "";
	let text = "";
	let orig = "/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/table/tbody/tr[lev]/td[14]";
	let origHeader = "/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/table/thead/tr/th[14]";
	let removed = false;
	
	
	
	//Remove headers
	for (let z = 1; z < 13; z++) {
		let xx = document.evaluate(origHeader, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
		if (xx == null)
		{
			continue; // leave loop, not function
		}
		else
		{
			xx.remove();							
		}						
	}
	
	//check how many jobs there are
	for (let zz = 1; zz < 100; zz++) {
		
		y = orig.replace("lev", zz);
		let x = document.evaluate(y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
		// there's 1 empty row between tables, if current table is empty, check next
		if (x == null) 
		{
			y = orig.replace("lev", zz + 1);
			x = document.evaluate(y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			
			//if it isn't empty, move on to it.
			if (x != null)
			{
				zz++;
				rownbr = zz;
				
			}	
			// if next level after empty table is also empty - move on.
			else
			{
				continue; 
			}
		}
		rownbr = zz;			
	}
				
	
	//row loop
	for (let i = 2; i <= rownbr; i++) {
		//column loop
		for (let j = 1; j < 13; j++) {
			
			//update row number in xpath
			y = orig.replace("lev", i);								  
			
			//make sure element exists
			let x = document.evaluate(y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			
			// there's 1 empty row between tables, if current table is empty, check next
			if (x == null)
			{
				//console.log("x is null, checking next value");
				y = orig.replace("lev", i + 1);
				x = document.evaluate(y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				
				//if it isn't empty, move on to it.
				if (x != null)
				{
					//console.log("next value found, continuing");
					j = 1;
					i++;
				}	
				// if next level after empty table is also empty - move on.
				else
				{
					break;
				}								
			}

			x.remove();		
			if (!removed)
			{
				removed = !removed;
			}
		}
	}	

	if (removed) 
	{
		//if removed any column, fire up onResize event to re-align columns.
		var resizeEvent = new Event ('resize');								
		document.dispatchEvent(resizeEvent); 
	}
}







