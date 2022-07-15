import { HandPalm, Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from './stylesHome';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

const formValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo mínimo é de 5 minutos')
		.max(60, 'O ciclo máximo é de até 60 minutos'),
});

type FormData = zod.infer<typeof formValidationSchema>

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const { register, handleSubmit, watch, reset } = useForm<FormData>({
		resolver: zodResolver(formValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		}
	});

	const task = watch('task');
	const isSubmitDisabled = !task;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		let interval: number;

		if(activeCycle){
			interval = setInterval(() => {
				setAmountSecondsPassed(
					differenceInSeconds(new Date(), activeCycle.startDate)
				);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeCycle]);

	useEffect(() => {
		if(activeCycle)
			document.title = `${minutes}:${seconds}`;
	}, [minutes, seconds, activeCycle]);	

	function handleCreateNewCycle(data: FormData){
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(id);
		setAmountSecondsPassed(0);
		
		reset();
	}

	function handleInterruptCycle(){
		setCycles(cycles.map(cycle => {
			if(cycle.id === activeCycleId){
				return {...cycle, interruptedDate: new Date()};
			}else{
				return cycle;
			}
		}));

		setActiveCycleId(null);
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

				<CountdownContainer>
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Separator>:</Separator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountdownContainer>

				{ activeCycle ? (
					<StopCountDownButton type="button" onClick={handleInterruptCycle}>
						<HandPalm size={24} />
						Parar
					</StopCountDownButton>
				) : (
					<StartCountDownButton type="submit" disabled={isSubmitDisabled}>
						<Play size={24} />
						Começar
					</StartCountDownButton>
				) }

			</form>
		</HomeContainer>
	);
}