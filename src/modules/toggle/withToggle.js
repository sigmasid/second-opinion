import { compose, withHandlers, withState } from 'recompose'
const util = require('util') //print an object

const withToggle = compose(
	withState('toggle', 'setToggle', true),
  	withHandlers({
    handleToggle: props => () => {
    	//console.log('toggle is '+props.toggle);
      	props.setToggle(!props.toggle);
    }
  })
)

export default withToggle