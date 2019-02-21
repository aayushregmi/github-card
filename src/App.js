import React, { Component } from 'react';
import './main.css';
import axios from 'axios';

const Card = (props) => {
	return (
  	<div className="card-container">
  	  <img className="user-image" src={props.avatar_url} />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
  	</div>
  );
}

const CardList = (props) => {
	return (
  	<div>
  	  {props.cards.map(card => <Card key={card.id} {...card} />)}
  	</div>
  );
}

class Form extends React.Component{
	state = {userName: '' };
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`).then(response=>{
    	this.props.onSubmit(response.data);
      this.setState({userName: ''});
    });
  }
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input type="text"
        	value={this.state.userName}
          onChange = {(event)=>this.setState({userName:event.target.value})}
        	placeholder="Github username" required />
        <button type="submit">Add Card</button>
    	</form>
    );
  }
}

class App extends React.Component {
	state = {
  	cards: []
  };

  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  }

	render() {
  	return (
    	<div>
    	  <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards}/>
    	</div>
    );
  }
}

export default App;
