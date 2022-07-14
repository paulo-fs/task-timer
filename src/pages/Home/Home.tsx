import { Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './stylesHome';

export function Home() {
	return (
		<HomeContainer>
			<form action="">
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em:</label>
					<TaskInput 
						type="text" 
						placeholder='Dê um nome para o seu projeto' 
						id="task" 
						list='task-suggestions'
					/>
					
					<datalist id='task-suggestions'>
						<option value='opção 1' />
						<option value='opção 2' />
					</datalist>

					<label htmlFor="minutesAmout">durante</label>
					<MinutesAmountInput 
						type="number" 
						id="minutesAmount" 
						placeholder='00' 
						step={5}
						min={5}
						max={60}
					/>
					
					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton type="submit">
					<Play />
					Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}