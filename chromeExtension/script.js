window.addEventListener("DOMContentLoaded", (event) => {
	const el = document.getElementById('fixit');
	var jobList = new Array();
	
	
	if (el) 
	{
		//document.addEventListener('load', () => {
		el.addEventListener('click', ()  => {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const tab = tabs[0];
				
				
			
				function getElementByXpath() {
					
					let rowCheck = "";
					let rownbr = 0;
					let x = "";
					let y = "";
					let text = "";
					let orig = "/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/table/tbody/tr[lev]/td[14]";
					let origHeader = "/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/table/thead/tr/th[14]";
					
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
							console.log("x is null, checking next value");
							y = orig.replace("lev", zz + 1);
							x = document.evaluate(y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
							
							//if it isn't empty, move on to it.
							if (x != null)
							{
								console.log("next value found, continuing");
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
								console.log("x is null, checking next value");
								y = orig.replace("lev", i + 1);
								x = document.evaluate(y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
								
								//if it isn't empty, move on to it.
								if (x != null)
								{
									console.log("next value found, continuing");
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
			  
						}
					}			
				  
				}	
			  

				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					func: getElementByXpath
					
				});
			});
		});
	
	
	}
	
	
	
	const el2 = document.getElementById('saveList');
	if (el2) {
			el2.addEventListener('click', ()  => {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const tab = tabs[0];
				
				function SaveJobList()
				{
					jobList = [];
					var elements = document.getElementsByClassName('timeentry-item-name'), elLength = elements.length;
					
					for (var i1 = 0 ; i1 < elLength; i1++)
					{
						jobList.push(elements.item(i1).textContent);
						//console.log(elements.item(i1).textContent);						
					}					
				}
			  

				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					func: SaveJobList
					
				});
			});
		});
	
	
	}
	
	
	
	const el62 = document.getElementById('printa');
	if (el62) {
			el62.addEventListener('click', ()  => {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const tab = tabs[0];
				
				
				
				
				
				
				function printado()
				{
					
					function waitFor(delMs)
					{ 
						var TimeStart = Date.now();
						
						while ((Date.now() - TimeStart) <= delMs)
						{
							continue;
						}
						
						
					}
					
					
					
					
					jobList.forEach(function(entry)
					{
						console.log(entry);
						waitFor(500);
					});
					
					
				}
			  

				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					func: printado
					
				});
			});
		});
	
	
	}
	
	
	
	
	const el3 = document.getElementById('populateList');
if (el3) {
    el3.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            async function populate() {
                function clickFirst() 
				{
					return new Promise((resolve,reject) =>
					{
						try 
						{
							var button1 = document.getElementById('timesheet-work-add-btn');
							if (button1) 
							{
								button1.click();
								resolve("clicked");		
							} 
							
							else 
							{
								console.log('Button with ID timesheet-work-add-btn not found.');
								reject('Button with ID timesheet-work-add-btn not found.');		
							}
						}
						
						catch (error) 
						{
							console.log('Error in clickFirst:', error);
							reject('Button with ID timesheet-work-add-btn not found.');		
						}
					});
                }
				
				
				
				function clickSecond()
				{
					
					return new Promise((resolve,reject) =>
					{
						setTimeout(function() 
							{								
								var button2 = document.getElementById('Select Tasks');
								if (button2)
								{
									button2.click();	
									resolve("clicked");								
								}
								else
								{
									console.log('Button Select Tasks not found.');
									reject("button not found");								
								}
							}, 2000);
						
					});
				}
				
				
				
				
				function confirmWindow()
				{ // not needed for now
					try
					{
						
						var addButton = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[3]/ppm-button-st[2]/button', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (addButton)
						{						
							addButton.click();											
						}
						else
						{
							console.log('Could not find add button.');
						}
					
					} 
					catch(error)
					{
						console.log('Error in selectJob: ', error);
					}
					
					
				}
				
				

				
				
				

				function bleble(elemNum)
				{
					
					if (jobList.length == 0)
					{ 
						console.log("joblist empty!");
						
					}
					
					if (jobList[elemNum] == null)
					{
						return;
					}
				
					return new Promise ((resolve) =>
					{ 
						setTimeout(function() 
						{
							console.log("1.62");
							var searchField = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[1]/div[4]/ppm-common-search/div/div/div/div/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
							console.log("1.6");
							if (searchField != null)
							{
								console.log("set text:", jobList[elemNum]);
								//Update text field
								searchField.value = jobList[elemNum];
								
								
								//create new event
								var updateEvent = new Event ('change');		
								searchField.dispatchEvent(updateEvent); 
								
								setTimeout(function() 
								{								
									var isLoaded = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/ppm-split/div[1]/div/ppm-grid-component/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div/div/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
									if (isLoaded)
									{
											
										if (isLoaded.textContent.trim() == jobList[elemNum])
										{
											console.log("first row text: ", isLoaded.textContent);
											
											var selectField = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/ppm-split/div[1]/div/ppm-grid-component/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div/div/div/div[1]/div/div/div/div[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
											if (selectField != null)
											{
												console.log("clicked", new Date().toLocaleTimeString());
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
						}, 1500);
					});					
				}
				
				
				
				
				//var resolveResult1 = await clickFirst();
				
				
				//var resolveResult2 = await clickSecond();				
				
				var doLoopCount = jobList.length;
				do {
					
					
					
					console.log("array index: ",doLoopCount);
					var resolveResult3 = await bleble(jobList.length);
					console.log(resolveResult3);
					jobList[jobList.length].pop();
					
					
					console.log("jobs left: ",jobList.length);
					doLoopCount--;
					if (doLoopCount == jobList.length)
					{						
						doLoopCount = 0;
					}
					
				} while (jobList.length > 0);
				
				
				
				
				//for(var i = 0; i < jobList.length ; i++)
				//{
				//	var resolveResult3 = await bleble(i);
				//	console.log(resolveResult3);
				//}
				confirmWindow();
				
				
				
				
				
				
				
				
				

                //clickFirst();
				
				//clickSecond();
				
				
				//loopJobs();
				
				//for await(const job of jobList){
				//	await setText(job);
					
				//	console.log(job);
					//const elo = await waitFor(500);
					
				//}
                
            }

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: populate
            });
        });
    });
}
	
	

	
	
	
});