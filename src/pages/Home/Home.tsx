import { useContext } from 'react';
import { NewCycleForm } from './NewCycleForm/NewCycleForm';
import { Countdown } from './Contdown/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { HomeContainer, StartCountDownButton, StopCountDownButton } from './stylesHome';
import { HandPalm, Play } from 'phosphor-react';

type FormData = zod.infer<typeof formValidationSchema>

const formValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo mínimo é de 5 minutos')
		.max(60, 'O ciclo máximo é de até 60 minutos'),
});

export function Home() {
	const { 
		activeCycle,
		createNewCycle,
		interruptCurrentCycle
	} = useContext(CyclesContext);

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

	function handleCreateNewCycle (data: FormData) {
		createNewCycle(data);
		reset();
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormProvider {...createNewCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />

				{ activeCycle ? (
					<StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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