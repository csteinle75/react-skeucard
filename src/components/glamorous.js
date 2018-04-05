import glamorous from 'glamorous'

export const CardColor = glamorous.div(
	({cardtype}) => {
		switch (cardtype){
			case 'visa':
				return {
					backgroundColor: 'rgb(24,78,136)',
					color: '#fff'
				}
			case 'discover':
				return {backgroundColor: 'rgb(186,210,220)'}
			case 'master-card':
				return{
					backgroundColor: 'rgb(217,46,43)',
					color: '#fff'
				}
			case 'maestro':
				return {
					backgroundColor: 'rgb(50,132,192)',
					color: '#fff'
				}
			case 'jcb':
				return {
					backgroundColor: 'rgb(15,67,140)',
					color: '#fff'
				}
			case 'unionpay':
				return {backgroundColor: 'rgb(197,197,197)'}
			case 'american-express':
				return {backgroundColor: 'rgb(141, 181, 161)'}
			case 'diners-club':
				return {backgroundColor: 'rgb(162,162,162)'}	
			default:
				return {backgroundColor: '#eee'}
		}
	}
)
export const CardValid = glamorous.div(
	{
		filter: 'drop-shadow(0 0 5px #000)'
	},
	({valid, potential=[true,false,false]}) => {
		if (potential.reduce((a,b) => a === b ? true : false) === false){
			return {filter: 'drop-shadow(0 0 9px #a00)'}
		}
		if (valid === true){
			return {filter: 'drop-shadow(0 0 9px #0a0)'}
		}
	}	
)