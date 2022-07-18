
import { FormContainer, MinutesAmountInput, TaskInput } from './stylesNewCycleForm';
import { useContext } from 'react';
import { CyclesContext } from '../../../contexts/CyclesContext';
import { useFormContext } from 'react-hook-form';

export function NewCycleForm(){
	const { activeCycle } = useContext(CyclesContext);
	const { register } = useFormContext();

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em:</label>
			<TaskInput 
				type="text" 
				placeholder='Dê um nome para o seu projeto' 
				id="task" 
				list='task-suggestions'
				disabled={!!activeCycle}
				{...register('task')}
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
				disabled={!!activeCycle}
				{...register('minutesAmount', { valueAsNumber : true })}
			/>
					
			<span>minutos.</span>
		</FormContainer>
	);
}