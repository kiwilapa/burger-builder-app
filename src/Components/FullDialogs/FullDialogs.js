import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, AppBar, Toolbar, IconButton, Typography, Stack, ThemeProvider } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { Button } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

//  ------------------- importing from files ------------------
import { cartActions } from '../../Store/reducer/cart'
import { stepperActions } from '../../Store/reducer/stepper'
import { mainColors } from '../../theme/mui-theme'

const FullDialogs = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const openDialog = useSelector(state => state.dialog.open)
    const switchCurr = useSelector(state => state.switchCurr.switchCurr)

    const placeOrderHandler = () => {
        dispatch(cartActions.updateInstantBuy(false))
        dispatch(stepperActions.resetStepper())
        navigate('/buy/delivery-address')
        localStorage.setItem('nextPath', pathname) // to make sure when user navigate backs from delivery address page, then it should navigate back to /cart
        localStorage.removeItem('id') // removing the id of address from address store 
    }

    return (
        <Modal fullscreen = {true} show = {openDialog}>
            <Box 
                sx = {{
                    position : 'fixed',
                    width : '100vw', 
                    height : '100vh', 
                    backgroundColor : '#f9b826'}}>
                <AppBar sx = {{backgroundColor : '#110f12'}}>
                    <Toolbar>
                        <Stack 
                            className = 'w-100' 
                            direction = 'row' 
                            justifyContent = 'space-between' 
                            alignItems = 'center'>
                            <Stack 
                                direction = 'row'
                                alignItems = 'center'
                                spacing = {1}
                                sx = {{color : '#f9b826'}}>
                                {props.title &&
                                    <FontAwesomeIcon 
                                        style = {{fontSize : '1.3rem'}}
                                        icon = {faCartShopping}/>
                                }
                                <Typography 
                                    sx = {{fontFamily :  'Oswald, sans-serif'}}
                                    variant = 'h5'>
                                    {props.title}
                                </Typography>
                            </Stack>
                            {props.totalItems ?
                                <Stack 
                                    direction = 'row' 
                                    spacing = {4}
                                    alignItems = 'center'>
                                    <Typography 
                                        variant = 'h6'
                                        sx = {{fontFamily : 'Comfortaa, cursive', color : '#f9b826'}}>
                                        Total Price ( {props.totalItems} {props.totalItems === 1 ? 'item' : 'items'} )
                                    </Typography>
                                    <Stack direction = 'row' alignItems = 'center'>
                                        {switchCurr ?
                                            <FontAwesomeIcon 
                                                icon = {faIndianRupeeSign}
                                                style = {{
                                                    fontSize : '1.3rem',
                                                    color : '#f9b826'}} /> :
                                            <FontAwesomeIcon 
                                                icon = {faPesoSign}
                                                style = {{
                                                    fontSize : '1.3rem',
                                                    color : '#f9b826'
                                                }} />
                                        }
                                        <Typography 
                                            variant = 'h6' 
                                            sx = {{fontFamily : 'Comfortaa, cursive', color : '#f9b826'}}>
                                            {switchCurr ? props.cartPrice : (props.cartPrice*0.67).toFixed(0)}
                                        </Typography>                                        
                                    </Stack>
                                    <Button 
                                        variant = 'contained'
                                        color = 'yellowish'
                                        sx = {{
                                            color : '#110f12', 
                                            fontSize : '1rem', 
                                            borderRadius : 0, 
                                            fontFamily : 'DM Serif Text, serif'}} 
                                        onClick = {placeOrderHandler}>
                                        Place Order
                                    </Button>
                                </Stack>
                                : null
                            }
                            <motion.div whileHover = {{rotate : 90}} >
                                <IconButton size = 'large' 
                                    className = 'text-light' 
                                    onClick = {() => props.closeDialogHandler(props.isOrderSummary)}
                                    position = 'relative'
                                    sx = {{float : 'right'}}
                                    color = 'yellowish'
                                    aria-label = 'close'>
                                    <CloseRounded style = {{color: '#f9b826'}} />
                                </IconButton>
                            </motion.div>
                        </Stack>
                    </Toolbar>
                </AppBar>
                {props.children}
            </Box>
        </Modal>           
    )
}

export default FullDialogs