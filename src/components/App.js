import React from 'react';
import Header from './Header';
import Search from './Search';
import List from './List';
import Footer from './Footer';
import StatusBar from './StatusBar';

class App extends React.Component {
	state = { 
		todoList: [
			{ id: 0, title: 'Выпить кофе', important: false, done: false },
			{ id: 1, title: 'Сделать React приложение', important: false, done: false },
			{ id: 2, title: 'Позавтракать', important: false, done: false },
		],
		term: '',
		status: 'all'
	} 

	

	onImportantClick = (id) => {		
		this.setState((state) => {
			const indx = state.todoList.findIndex((el)=>{return el.id === id });			
			const oldItem = state.todoList[indx];
			const newItem = {...oldItem, important: !oldItem.important}
			const part1 = state.todoList.slice(0, indx);
			const part2 = state.todoList.slice(indx+1);
			const newArry = [...part1, newItem, ...part2]
			return {todoList: newArry}
		})
	}

	onDoneClick = (id) => {
		this.setState((state) => {
			const indx = state.todoList.findIndex((el)=>{return el.id === id });
			
						
			const oldItem = state.todoList[indx];
			const newItem = {...oldItem, done: !oldItem.done, important: false }
			const part1 = state.todoList.slice(0, indx);
			const part2 = state.todoList.slice(indx+1);
			const newArry = [...part1, newItem, ...part2]
			return {todoList: newArry}
		})
	}

	deleteItem = (id) => {
		this.setState((state) => {
			let indx = state.todoList.findIndex((el) => el.id === id)
			console.log(indx);
			const part1 = state.todoList.slice(0, indx);
			const part2 = state.todoList.slice(indx+1);
			const newArry = [...part1, ...part2]
			return {todoList: newArry}
		})

	}

	addItem  = (title) => {
		this.setState((state) => {
			let ID = state.todoList[state.todoList.length -1]['id'] + 1
			let newItem = {id: ID, title: title, important: false, done: false } 
			let newArray = [...state.todoList, newItem]
			return {
				todoList: newArray
			}
		})
	}

	search  = (items, term) => {
		if(term.trim().length === 0) {
			return items
		}
		return items.filter((item) => {
			if(item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1) {
				return true
			}
		})
	}

	chengeTerm  = (term) => {
		this.setState({
			term: term
		})
	}

	chengeStatus  = (status) => {
		this.setState({
			status: status
		})
	}

	filterByStatus  = (items, status) => {
		switch(status) {
			case 'all': return items
			case 'active': return items.filter((item) => item.done === false)
			case 'done': return items.filter((item) => item.done === true)
		}
	}


	render() { 

		const renderList = this.search(this.state.todoList, this.state.term)
		const filtered = this.filterByStatus(renderList, this.state.status)

		return (
			<div>
				<Header />
				<div className="search">
					<Search chengeTerm={this.chengeTerm} term={this.state.term}/>
					<StatusBar chengeStatus={this.chengeStatus} status={this.state.status}/>
				</div>
				
				<List data={filtered} 
						onImportantClick={this.onImportantClick} 
						onDoneClick={this.onDoneClick}
						deleteItem={this.deleteItem}
						/>					
				<Footer addItem={this.addItem}/>
			</div>
		);
	}
}
 
export default App;