import { PasswordResetForm } from '@/components/forms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'TraderGuessr | Password Reset',
	description: 'TraderGuessr password reset page',
};

export default function Page() {
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
      <img
            alt="Traderguessr"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=green&shade=600"
            className="mx-auto h-10 w-auto"
          />
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Reset your password
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<PasswordResetForm />
			</div>
		</div>
	);
}