import React, {Component} from 'react'


class CCForm extends Component {	
	
	onSubmit = (e) =>{
		e.preventDefault()
		this.props.handleSubmit()
	}

	render(){
		return(
			<form>
				<input id="cardNumber" onChange={this.props.handleNum} value={this.props.cardNum} name="cardNumber" placeholder="Card Number"/>
				<input id="cardExp" onChange={this.props.handleExp} value={this.props.cardExp} name="expiration" placeholder="MM/YY" />
				<input id="cardName" onChange={this.props.handleName} value={this.props.cardName} name="cardholder" placeholder="Cardholder Name" />
				<input id="cardCVV" onChange={this.props.handleCVV} value={this.props.cardCVV} name="cvv" placeholder="CVV" maxLength="4" />
				<button onClick={this.onSubmit}>Submit</button>
			</form>
		)
	}
}

export default CCForm
