import React, {Component} from 'react'
import validator from 'card-validator'

//components
import CCForm from './CCForm'

//styles
import '../styles/Card.css'

class Card extends Component{
	state = {
		cardType: '',
		niceType: '',
		cardNumber: {
			value: '',
			valid: false
		},
		expiration: {
			value: '',
			valid: false
		},
		cardholder: '',
		cvv: {
			value: '',
			valid: false
		},
		valid: false
	}
	handleNumber = (e) =>{
		console.log(validator.number(e.target.value))
		this.setState({cardNumber: {value: e.target.value, valid: validator.number(e.target.value).isValid}
		})
		if(validator.number(e.target.value).card !== null){
			this.setState({cardType: validator.number(e.target.value).card.type,
				niceType: validator.number(e.target.value).card.niceType
			})
		} else {
			this.setState({cardType: '', niceType: ''})
		}
		setTimeout(()=>{
			if (this.state.cardNumber.valid === true){
				console.log(this.state.cardNumber)
			}
		},0)
	}
	handleExpiration = (e) =>{
		console.log(e.target.value)
		this.setState({expiration: {value: e.target.value, valid: validator.expirationDate(e.target.value).isValid}
		})
		setTimeout(()=>{
			if (this.state.expiration.valid === true){
				console.log(this.state.expiration)
			}
		},0)
	}
	handleCVV = (e) =>{
		this.setState({cvv: {value: e.target.value, valid: validator.cvv(e.target.value).isValid}
		})
		setTimeout(()=>{
			if (this.state.cvv.valid === true){
				console.log(this.state.cvv)
			}
		},0)
	}
	handleCardholder = (e) =>{
		this.setState({cardholder: e.target.value})
	}
	handleSubmit = () =>{
		if(this.state.cardNumber.valid && this.state.cvv.valid && this.state.expiration.valid){
			this.setState({valid: true})

		} else {this.setState({valid: false})}
	}

	render(){
		return(
			<div>
				<h3>Card</h3>
				<div id="cssCard">
					<div id="cardFront">
						<span id="cardType">
							{this.state.niceType}
						</span>
					</div>
					<div id="cardBack">
						<span>
							{this.state.cvv.value}
						</span>
					</div>
				</div>
				<CCForm 
					cardNum={this.state.cardNumber.value}
					handleNum={this.handleNumber}
					cardExp={this.state.expiration.value}
					handleExp={this.handleExpiration}
					cardCVV={this.state.cvv.value}
					handleCVV={this.handleCVV}
					cardName={this.state.cardholder}
					handleName={this.handleCardholder}
					cardType={this.state.niceType}
					handleSubmit={this.handleSubmit}
					valid={this.state.valid}
				/> {/*End of Form Component*/}
			</div>
		)
	}
}
export default Card