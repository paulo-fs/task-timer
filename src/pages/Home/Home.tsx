import { Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './stylesHome';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const formValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo mínimo é de 5 minutos')
		.max(60, 'O ciclo máximo é de até 60 minutos'),
});

type FormData = zod.infer<typeof formValidationSchema>

export function Home() {
	const { register, handleSubmit, watch, reset } = useForm<FormData>({
		resolver: zodResolver(formValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		}
	});

	const task = watch('task');
	const isSubmitDisabled = !task;
	
	function handleCreateNewCycle(data: FormData){
		console.log(data);
		reset();
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em:</label>
					<TaskInput 
						type="text" 
						placeholder='Dê um nome para o seu projeto' 
						id="task" 
						list='task-suggestions'
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
						{...register('minutesAmount', { valueAsNumber : true })}
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

				<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
					<Play />
					Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}