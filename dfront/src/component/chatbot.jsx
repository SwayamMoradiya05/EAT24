import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './chatbot.css'
// Creating our own theme


// Set some properties of the bot
const config = {
	botAvatar: "https://th.bing.com/th?id=OIP.f3DM2upCo-p_NPRwBAwbKQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
	botAvatar: "https://icons.iconarchive.com/icons/iconarchive/robot-avatar/128/Orange-1-Robot-Avatar-icon.png",
	floating: true,
};

function Chatbot(props) {
	const theme = {
		background:`${props.color}`,
		headerBgColor: 'orange',
		headerFontSize: '20px',
		botBubbleColor: 'orange',
		headerFontColor: 'white',
		botFontColor: 'white',
		userBubbleColor: '#FF5733',
		userFontColor: 'orange',
	};
	return (

		<div className="chatbot" style={{paddingTop:"10%"}}>
			<ThemeProvider theme={theme}>
				<ChatBot

					// This appears as the header
					// text for the chat bot
					headerTitle="Food-Order Bot"
					steps= {[
						{
						  id: '1',
						  message: 'Hey !!',
						  trigger: '2',
						},
						{
							id: '2',
							message: 'Select your query',
							trigger: '3',
						},
						{
						  id: '3',
						  options: [
							{ value: 1, label: 'Order Cancel', trigger: '4' },
							{ value: 2, label: 'Deleivery Late', trigger: '5' },
							{ value: 3, label: 'Inappropiate Quantity', trigger: '6' },
							{ value: 4, label: 'Bad Food Quality', trigger: '7' }
						  ],
						},
						{
						  id: '4',
						  message: 'Sorry !! You cannot cancel a order once payment complete',
						  trigger: '8',
						},
						{
						  id: '5',
						  message: 'In case of late deleivery we will compansate by reducing deleivery charges and refunding it',
						  trigger:'8'
						},
						{
							id: '6',
							message: 'In case of inappropiate quantity we will see to the matter and talk to the respected hotel and will compensate you',
							trigger:'8'
						},
						{
							id: '7',
							message: 'In case of bad food quality we will refund 100% of charge',
							trigger:'8'
						},
						{
							id: '8',
							message: 'Any further query??',
							trigger:'9'
						},
						{
							id: '9',
							options:[
								{value:1 ,label:'yes',trigger:3},
								{value:2 ,label:'no',trigger:10}
							]
						},
						{
							id: '10',
							message: 'Hope all queries solved ',
							trigger:'11'
						},
						{
							id: '11',
							message: 'Have a nice day!!😃',
							end:true
						},
					  ]}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
}

export default Chatbot;
