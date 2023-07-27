'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure('13f808dd-69b4-4afe-bf44-251b4d0b2f66');
	}, []);

	return null;
};
