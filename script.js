function removeListener(){
	var myGrid = document.getElementById('my-grid');
	myGrid.removeEventListener('click', changeColor);
	
	var allCells = document.querySelectorAll('.col');
	for(x=0;x<allCells.length;x++){
		var currentCell = allCells[x];
		currentCell.removeEventListener('mouseenter', addHover);
		currentCell.removeEventListener('mouseleave', removeHover);
}
}

function changeHeading(text){
	var turnDisplay = document.getElementById('turn-display');
	turnDisplay.innerHTML = text;
	return;
}

var turnTracker ={
	
	addToCounter(){
		
		this.overallTurnCounter++;
		if(this.overallTurnCounter%2===0){
			changeHeading("Green's Move");
		}else{
			changeHeading("Red's Move");
		}
		if(this.overallTurnCounter === 42){
			changeHeading("It's a draw!");
		}
		},
	sendCount(){
		return this.overallTurnCounter;
	},
	
	overallTurnCounter: 0
};

function createGrid(){
	
	var rows = 6;
	var cols = 7;
	var myGrid = document.getElementById('my-grid');
	
	for (x = 0; x < rows; x++){
		var newRowDiv = document.createElement('div');
		newRowDiv.className = 'row';
		myGrid.appendChild(newRowDiv);
		
		for (y = 0; y < cols; y++){
			var newColDiv = document.createElement('div');
			newColDiv.className = 'col empty';
			newColDiv.setAttribute('data-row', x);
			newColDiv.setAttribute('data-col', y);
			newRowDiv.appendChild(newColDiv);
		}
	}
	
	var myGrid = document.getElementById('my-grid');
	myGrid.addEventListener('click', changeColor);
	
	var allCells = document.querySelectorAll('.col');
	for(x=0;x<allCells.length;x++){
		var currentCell = allCells[x];
		currentCell.addEventListener('mouseenter', addHover);
		currentCell.addEventListener('mouseleave', removeHover);
		}
		
		changeHeading("Green's Move");
	};
	
function addHover(){
	var overallTurnCounter = turnTracker.sendCount();
		if(overallTurnCounter%2===0){
			this.classList.add('green-hover');
		}else{
			this.classList.add('red-hover');
		}
}

function removeHover(){
	var overallTurnCounter = turnTracker.sendCount();
		if(overallTurnCounter%2===0){
			this.classList.remove('green-hover');
		}else{
			this.classList.remove('red-hover');
		}
}

function changeColor(event){
	
		if(!event.target.classList.contains('col')||!event.target.classList.contains('empty')){
			return;
		}else{
		
		event.target.classList = 'col empty';
		
		var turnCounter = turnTracker.sendCount();
		var colNumber = event.target.getAttribute('data-col');
		var rowNumber = event.target.getAttribute('data-row');
		var colCells = document.querySelectorAll(`.col[data-col='${colNumber}']`);
		
		for(x = colCells.length - 1; x >= 0; x--){
			var currentCell = colCells[x];
			
			if (currentCell.classList.contains('empty') && turnCounter%2!=0){
				currentCell.classList.remove('empty');
				currentCell.classList.add('red');
				break;
			} else if (currentCell.classList.contains('empty') && turnCounter%2===0){
				currentCell.classList.remove('empty');
				currentCell.classList.add('green');
				break;
			} 
		}
		
		turnTracker.addToCounter();
	
		checkRight(currentCell);
		return;
		}
	}	


function checkRight(currentCell){

	
		var colorCounter = 1;
		for(var x=1; x<4; x++){
			
			var turnCounter = turnTracker.sendCount();
			var startingCol = parseInt(currentCell.dataset.col);
			var startingRow = parseInt(currentCell.dataset.row);
			var nextCell = document.querySelector(`[data-col = '${startingCol + x}'][data-row = '${startingRow}']`);
			
			if (!nextCell){
				checkLeft(colorCounter, startingCol, startingRow, turnCounter);
				return;
			}else if(nextCell.classList.contains('empty')){
					checkLeft(colorCounter, startingCol, startingRow, turnCounter);
					return;
			}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
				colorCounter++;
			}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
				colorCounter++;
			}else{
					checkLeft(colorCounter, startingCol, startingRow, turnCounter);
					return;
			};
			
			if(colorCounter>=4){
				
				if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
				return;
			}
			}
			checkLeft(colorCounter, startingCol, startingRow, turnCounter);
			return;
}
	
function checkLeft(colorCounter, startingCol, startingRow, turnCounter){
			for(var x=1; x<4; x++){			
			
				var newColNumber=parseInt(startingCol) - x;
				var nextCell = document.querySelector(`[data-col = '${startingCol - x}'][data-row = '${startingRow}']`);
				
				if (!nextCell){
				colorCounter = 1;
				checkDown(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(nextCell.classList.contains('empty')){
					colorCounter = 1;
					checkDown(colorCounter, startingCol, startingRow, turnCounter);
					return;;
				}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					colorCounter++;
				}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					colorCounter++;
					}else{
					colorCounter = 1;
					checkDown(colorCounter, startingCol, startingRow, turnCounter);
					return;
			};
			
				if(colorCounter>=4){
					if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
					return;
				}
			}
			
			colorCounter = 1;
			checkDown(colorCounter, startingCol, startingRow, turnCounter);
			return;
}

// function checkUp(colorCounter, startingCol, startingRow, turnCounter){
	
			// for(var y=1; y<4; y++){			
			
				// var newRowNumber=parseInt(startingRow) - x;
				// var nextCell = document.querySelector(`[data-col = '${startingCol}'][data-row = '${startingRow - y}']`);
				
				// if (!nextCell){
				// checkDown(colorCounter, startingCol, startingRow, turnCounter);
				// return;
				// }else if(nextCell.classList.contains('empty')){
					// checkDown(colorCounter, startingCol, startingRow, turnCounter);
				// return;
				// }else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					// colorCounter++;
				// }else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					// colorCounter++;
					// }else{
					// checkDown(colorCounter, startingCol, startingRow, turnCounter);
					// return;
			// };
			
				// if(colorCounter>=4){
					// console.log('Game over!');
					// return;
				// }
			// }
			// checkDown(colorCounter, startingCol, startingRow, turnCounter);
			// return;
// }

function checkDown(colorCounter, startingCol, startingRow, turnCounter){
	
			for(var y=1; y<4; y++){			
			
				var newRowNumber=parseInt(startingRow) + y;
				var nextCell = document.querySelector(`[data-col = '${startingCol}'][data-row = '${newRowNumber}']`);
				
				if (!nextCell){
				colorCounter = 1;
				checkDiagonalDownRight(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(nextCell.classList.contains('empty')){
				colorCounter = 1;
				checkDiagonalDownRight(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					colorCounter++;
				}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					colorCounter++;
					}else{
					colorCounter = 1;
					checkDiagonalDownRight(colorCounter, startingCol, startingRow, turnCounter);
					return;
			};
			
				if(colorCounter>=4){
					if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
					return;
				}
			}
			colorCounter = 1;
			checkDiagonalDownRight(colorCounter, startingCol, startingRow, turnCounter);
			return;
}

function checkDiagonalDownRight(colorCounter, startingCol, startingRow, turnCounter){
	
			for(var z=1; z<4; z++){			
			
				var nextCell = document.querySelector(`[data-col = '${startingCol + z}'][data-row = '${startingRow + z}']`);
				
				if (!nextCell){
				checkDiagonalUpLeft(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(nextCell.classList.contains('empty')){
					checkDiagonalUpLeft(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					colorCounter++;
				}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					colorCounter++;
					}else{
						checkDiagonalUpLeft(colorCounter, startingCol, startingRow, turnCounter);
						return;
					}
				if(colorCounter>=4){
					if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
					return;
				}
			}
			checkDiagonalUpLeft(colorCounter, startingCol, startingRow, turnCounter);
			return;
}

function checkDiagonalUpLeft(colorCounter, startingCol, startingRow, turnCounter){

			for(var z=1; z<4; z++){			
			
				var nextCell = document.querySelector(`[data-col = '${startingCol - z}'][data-row = '${startingRow - z}']`);
				
				if (!nextCell){
				colorCounter = 1;
				checkDiagonalDownLeft(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(nextCell.classList.contains('empty')){
					colorCounter = 1;
					checkDiagonalDownLeft(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					colorCounter++;
				}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					colorCounter++;
					}else{
						colorCounter = 1;
						checkDiagonalDownLeft(colorCounter, startingCol, startingRow, turnCounter);
						return;
					}
				if(colorCounter>=4){
					if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
					return;
				}
			}
					colorCounter = 1;
					checkDiagonalDownLeft(colorCounter, startingCol, startingRow, turnCounter);
					return;
}

function checkDiagonalDownLeft(colorCounter, startingCol, startingRow, turnCounter){
	

			for(var z=1; z<4; z++){			
			
				var nextCell = document.querySelector(`[data-col = '${startingCol - z}'][data-row = '${startingRow + z}']`);
				
				if (!nextCell){
				checkDiagonalUpRight(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(nextCell.classList.contains('empty')){
					checkDiagonalUpRight(colorCounter, startingCol, startingRow, turnCounter);
				return;
				}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					colorCounter++;
				}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					colorCounter++;
					}else{
						checkDiagonalUpRight(colorCounter, startingCol, startingRow, turnCounter)
						return;
					}
				if(colorCounter>=4){
					if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
					return;
				}
			}
			checkDiagonalUpRight(colorCounter, startingCol, startingRow, turnCounter)
			return;
}

function checkDiagonalUpRight(colorCounter, startingCol, startingRow, turnCounter){
	
			for(var z=1; z<4; z++){			
			
				var nextCell = document.querySelector(`[data-col = '${startingCol + z}'][data-row = '${startingRow - z}']`);
				
				if (!nextCell){
				console.log('No win');
				return;
				}else if(nextCell.classList.contains('empty')){
					console.log('No win');
				return;
				}else if(turnCounter%2!=0&&nextCell.classList.contains('green')){
					colorCounter++;
				}else if (turnCounter%2===0&&nextCell.classList.contains('red')){
					colorCounter++;
					}else{
						break;
					}
				if(colorCounter>=4){
					if(turnCounter%2!=0){
				changeHeading("Green Wins!");
				removeListener();
				}else{
				changeHeading("Red Wins!");
				removeListener();
				}
					return;
				}
			}			
}