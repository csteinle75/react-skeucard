import React, {Component} from 'react'
import validator from 'card-validator'

//components
import CCForm from './CCForm'

//styles
import '../styles/Card.css'

//glamor
import {CardValid, CardColor} from './glamorous'

//other
import logos from './logos'


class Card extends Component{
	state = {
		cardType: '',
		niceType: '',
		cardNumber: {
			value: '',
			valid: false,
			potential: true
		},
		expiration: {
			value: '',
			valid: false,
			potential: true
		},
		cardholder: '',
		cvv: {
			value: '',
			valid: false,
			potential: true
		},
		valid: false
	}


	handleNumber = (e) =>{
		// console.log(validator.number(e.target.value))
		
			this.setState({cardNumber: {value: e.target.value, valid: validator.number(e.target.value).isValid, potential: validator.number(e.target.value).isPotentiallyValid}
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
					this.handleSubmit()
				}
			},0)
		
	}

	handleExpiration = (e) =>{
		// console.log(validator.expirationDate(e.target.value))
		
			this.setState({expiration: {value: e.target.value, valid: validator.expirationDate(e.target.value).isValid, potential: validator.expirationDate(e.target.value).isPotentiallyValid}
			})
			setTimeout(()=>{
				if (this.state.expiration.valid === true){
					this.handleSubmit()
				}
			},0)
		
	}

	handleCVV = (e) =>{
		// console.log(validator.cvv(e.target.value))
		if(e.target.value.match(/^\d*$/g)){
			this.setState({cvv: {value: e.target.value, valid: validator.cvv(e.target.value).isValid, potential: validator.cvv(e.target.value).isPotentiallyValid}
			})
			setTimeout(()=>{
				if (this.state.cvv.valid === true){
					this.handleSubmit()
				}
			},0)
		}
	}

	handleCardholder = (e) =>{
		this.handleSubmit()
		this.setState({cardholder: e.target.value})
	}

	handleSubmit = () =>{
		if(this.state.cardNumber.valid && this.state.cvv.valid && this.state.expiration.valid && this.state.cardholder.length > 1){
			this.setState({valid: true})
			console.log("valid")
		} else {this.setState({valid: false})}
	}

	displayNumber = (cardnum) =>{
		cardnum === '' ? cardnum = 'XXXX XXXX XXXX XXXX' : cardnum
		return cardnum.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
	}
	displayExp = (exp) =>{
		exp === '' ? exp = '00/00' : exp
		return exp.replace(/[^\dA-Z]/g, '').replace(/([\d]{1,2})([\d]{2})/g, '$1/$2')
	}
	displayLogos = (cardtype) =>{
		let newtype = cardtype.replace(/-/g, '')
		newtype === '' ? newtype = 'credit' : newtype
		return logos[newtype]
	}
	displayHolder = (cardholder) =>{
		cardholder === '' ? cardholder = 'JOHN SMITH' : cardholder
		return cardholder.toUpperCase()
	}
	render(){
		return(
			<div>
				<h3>Credit Card Verifier</h3>
				
				<CardValid id="cssCard" valid={this.state.valid} potential={[this.state.cardNumber.potential, this.state.expiration.potential, this.state.cvv.potential]} >
					<CardColor id="cardFront" cardtype={this.state.cardType} >
						<p id="cardDisplayType">
							{this.state.niceType}
						</p>
						<p id="cardDisplayNum">
							{this.displayNumber(this.state.cardNumber.value)}
						</p>
						<p id="cardDisplayHolder">
							{this.displayHolder(this.state.cardholder)}
						</p>
						<p id="cardDisplayExpiration">
							{this.displayExp(this.state.expiration.value)}
						</p>
						<p id="cardDisplayCVV">
							CVV:{this.state.cvv.value}
						</p>
						<img id="cardLogo" src={this.displayLogos(this.state.cardType)} alt="logo"/>
					</CardColor>
					<div id="cardBack">
						
					</div>
				</CardValid>
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