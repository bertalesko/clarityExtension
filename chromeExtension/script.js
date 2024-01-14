window.addEventListener("DOMContentLoaded", (event) => {
	const el = document.getElementById('fixit');
	if (el) {
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
});