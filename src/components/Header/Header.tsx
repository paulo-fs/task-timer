import { Headercontainer } from './stylesHeader';
import { Timer, Scroll } from 'phosphor-react';

import logo  from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

export function Header(){
	return(
		<Headercontainer>
			<img src={logo} alt="" />
			<nav>
				<NavLink to="/" title='Timer'>
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title='Histórico'>
					<Scroll size={24} />
				</NavLink>
			</nav>
		</Headercontainer>
	);
}