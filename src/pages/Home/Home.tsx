import { HandPalm, Play } from 'phosphor-react';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from './stylesHome';
import { createContext, useState } from 'react';
import { NewCycleForm } from './NewCycleForm/NewCycleForm';
import { Countdown } from './Contdown/Countdown';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date
}

interface CyclesContextType {
	activeCycle: Cycle | undefined
	amountSecondsPassed: number
	markCurrentCycleAsFinished: () => void
	setSecondsPassed: (seconds: number) => void
}

type FormData = zod.infer<typeof formValidationSchema>

const formValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo mínimo é de 5 minutos')
		.max(60, 'O ciclo máximo é de até 60 minutos'),
});

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const  createNewCycleForm = useForm<FormData>({
		resolver: zodResolver(formValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		}
	});
	
	const { handleSubmit, watch, reset } = createNewCycleForm;
	const task = watch('task');
	const isSubmitDisabled = !task;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
	
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
		setCycles( state => 
			state.map(cycle => {
				if(cycle.id === activeCycleId){
					return {...cycle, interruptedDate: new Date()};
				}else{
					return cycle;
				}
			}));

		setActiveCycleId(null);
	}

	function markCurrentCycleAsFinished(){
		setCycles( state =>
			state.map((cycle) => {
				if(cycle.id === activeCycleId){
					return {...cycle, finishedDate: new Date()};
				} else {
					return cycle;
				}
			})
		);
	}

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<CyclesContext.Provider value={{ 
					activeCycle,
					amountSecondsPassed,
					markCurrentCycleAsFinished,
					setSecondsPassed,
				}}>
					<FormProvider {...createNewCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<Countdown 
					/>
				</CyclesContext.Provider>

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