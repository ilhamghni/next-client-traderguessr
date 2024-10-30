'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { NavLink } from '@/components/common';

export default function Navbar() {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

	const isSelected = (path: string) => (pathname === path ? true : false);

	const authLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/dashboard')}
				isMobile={isMobile}
				href='/dashboard'
			>
				Dashboard
			</NavLink>
			<NavLink isMobile={isMobile} onClick={handleLogout}>
				Logout
			</NavLink>
		</>
	);

	const guestLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/auth/login')}
				isMobile={isMobile}
				href='/auth/login'
			>
				Login
			</NavLink>
			<NavLink
				isSelected={isSelected('/auth/register')}
				isMobile={isMobile}
				href='/auth/register'
			>
				Register
			</NavLink>
		</>
	);

	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					{/* Panel below the header */}
					<Disclosure.Panel className='absolute left-0 right-0 mt-16 bg-gray-800 shadow-lg z-10'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{isAuthenticated
								? authLinks(true)
								: guestLinks(true)}
						</div>
					</Disclosure.Panel>

					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							{/* Mobile menu button */}
							<div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>

							{/* Centered logo */}
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-center'>
								<NavLink href='/' isBanner>
									TraderGuessr
								</NavLink>
							</div>

							{/* Links to the far right */}
							<div className='absolute right-0 items-center pr-2 hidden sm:block'>
								{isAuthenticated
									? authLinks(false)
									: guestLinks(false)}
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}
