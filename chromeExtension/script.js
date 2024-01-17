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
		                    try 
					{
			                        var button1 = document.getElementById('timesheet-work-add-btn');
			                        if (button1) 
						{
		                            		button1.click();
		                        	} 
						
						else 
						{
			                            console.log('Button with ID timesheet-work-add-btn not found.');
			                        }
                    			}catch (error) 
					{
                        			console.log('Error in clickFirst:', error);
                    			}
               			 }
				
				
				
				function clickSecond()
				{
					try
					{
						var button2 = document.getElementById('Select Tasks');
						if (button2)
						{
							button2.click();							
						}
						else
						{
							console.log('Button Select Tasks not found.');
						}
						
					} catch(error)
					{
						console.log('Error in clickSecond: ', error);
					}
				}
				
				async function selectmafield()
				{
					var selecField = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/ppm-split/div[1]/div/ppm-grid-component/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div/div/div/div[1]/div/div/div/div[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (selectField != null)
					{
						console.log("clicked", new Date().toLocaleTimeString());
						selecField.click();
					}
					
					
				}
				
				
				function checkIfExists(textValue)
				{
					var isLoaded = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[2]/div/ppm-split/div[1]/div/ppm-grid-component/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div/div/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					
					if (isLoaded)
					{
						console.log("fieldT:",isLoaded.textContent);
						console.log("mytext:", textValue);
						
						
						if (isLoaded.textContent.trim() == textValue)
						{
							selectmafield();
							return true;
						}
						else
						{
							console.log("wrong text value");
							return false;
						}
					}
					else
					{
						console.log("f");
						return false;
					}
				}
				
				
				async function waitFor(delMs)
				{ 
					var TimeStart = Date.now();
					
					while ((Date.now() - TimeStart) <= delMs)
					{
						continue;
					}					
				}
				
				
				async function setText(textVal)
				{					
					try
					{	//check if text field exists first
						var searchField = document.evaluate('/html/body/div[3]/div[2]/div[3]/div/div/div/tabs-scrollable/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/div/div[2]/common-view-component/div/div[1]/div[4]/ppm-common-search/div/div/div/div/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (searchField != null)
						{
						
							console.log("set text:", textVal);
							//Update text field
							searchField.value = textVal;
							//waift 0.5sec
							waitFor(500);
							//create new event
							var updateEvent = new Event ('change');		
							//fire up the event
							searchField.dispatchEvent(updateEvent);	
							//wait 0.5 after (let the table update
							waitFor(500);
							
						}							
					
					}catch(error)
					{
						console.log("error in set text:", error);							
					}				
				}
				
				
				
				async function loopJobs()
				{
					console.log("start");
					console.log(jobList.length);
					
					try
					{
						// don't bother doing all jobs, 
						//change i < 2 to jobList.length once finished.
						for (var i = 0; i < 2; i++)	
						{
							
							if (jobList.length == 0)
							{
								console.log("job list empty");
								break;
							}
							
							
							//set text to joblists text
							const setThatText = await setText(jobList[i]);
							//wait 2 sec(again....)
							const waiter      = await waitFor(2000);
							//make sure first entry is my job
							const TextFound   = await checkIfExists(jobList[i]);
							//if it is - select it.
							if(TextFound)
							{
								selectmafield();
							}
							else
							{
								console.log("notfound666");
							}
							
						}
					}
					catch(error)
					
					{
						console.log('Error in loopJobs:', error);
					}
					
					console.log("end.");					
					
				}
				
				
				function selectJob()
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
				
				
				

               			 //clickFirst();
				
				//clickSecond();
				
				
				//loopJobs();
				
				for await(const job of jobList){
					await setText(job);
					
					
					//const elo = await waitFor(500);
					
				}
				
				
				
				
                
            }

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: populate
            });
        });
    });
}
	
	

	
	
	
});
