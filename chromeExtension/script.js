document.addEventListener('firstClick', function()
{
	var button1 = document.getElementById('timesheet-work-add-btn');
	console.log("ELO");
	button1.click();
	
});

document.addEventListener('secondClick', function()
{
	var button2 = document.getElementById('Select Tasks');
	//console.log(butAdd.textContent);
	button2.click();
	
});

document.addEventListener('thirdClick', function()
{
	
	var button3 = document.getElementsByName('tasks-9458-timesheetTasks-common-search');
	button3.value = textValue;
	
});



				
				function clickSecond()
				{
					var button2 = document.getElementById('Select Tasks');
					//console.log(butAdd.textContent);
					button2.click();
					
				}
				
				function setThird(textValue)
				{
					var button3 = document.getElementsByName('tasks-9458-timesheetTasks-common-search');
					button3.value = textValue;
					
				}




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
								
					
					//row lopp
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
	
	
	
	const el3 = document.getElementById('populateList');
if (el3) {
    el3.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            function populate() {
                function BclickFirst() {
                    try {
                        var button1 = document.getElementById('timesheet-work-add-btn');
                        if (button1) {
                            button1.click();
                        } else {
                            console.error('Button with ID timesheet-work-add-btn not found.');
                        }
                    } catch (error) {
                        console.error('Error in BclickFirst:', error);
                    }
                }

                BclickFirst();

                var evt1 = document.createEvent('Event');
                evt1.initEvent('firstClick', true, false);
                document.dispatchEvent(evt1);
            }

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: populate
            });
        });
    });
}
	
	

	
	
	
});
